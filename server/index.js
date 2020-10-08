require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const{ SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

const lobbyUsers = [];

const authCtrl = require('./controllers/authController');
const gameCtrl = require('./controllers/gameController');


const app = express();

app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxage: 1000 * 60 * 60 * 24 * 15, // 15 days
        },
    })
);

massive ({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
})
    .then((db) => {
        app.set("db", db);
        console.log("-----DATABASE CONNECTED-----");
        //Starts db connection, and starts listening on endpoints, and if it were hit, it would throw an error because it wasn't connected yet.
        //Also, app.listen returns the port. We need to use port again -
        //const socketio = require('socket.io');
        // const io = socketio(SERVER_PORT);
        const io = require('socket.io')(
            app.listen(SERVER_PORT, () => console.log(`-----PORT ${SERVER_PORT} ONLINE-----`)));
        app.set("io", io)
        //When a new connection to the socket (to the server) do what's in this arrow function.
        //Socket id is generated each time a user connects - it's associated with the connection, not with the user.
        //Can move this to controller file to separate code.
        io.on("connection", (socket) => {
            //Socket is individual connection, io is global - all the sockets.
            console.log(socket.id)
            //Anytime new user connects, they will go to lobby room ('lobby' is the endpoint.)
            
            socket.emit('request-username')
            io.in('lobby').emit('welcome', {welcome: 'New user joined!', newUser: socket.id})
            // console.log(io.sockets.adapter.rooms['lobby'].sockets) //not working for Trillium
            //connection and disconnect are default endpoints. We receive the disconnect message when someone disconnects.
            socket.on('disconnect', () => {
                console.log("Disconnected.")
                // lobbyUsers.splice(`${socket.i}`)
            });
            //socket.on - in the arrow function it will take in a body - the body from the front end. Like a put or post from the front end.
            socket.on('player-turn', (body) => {
                console.log("player-turn", (body))
                socket.to(body.room).emit('receive-game-state', body)
            });
            socket.on('message', (body) => {
                socket.emit(body);
            });
            socket.on('chatter', (body) => {
                io.in('lobby').emit('message', body)
            });
            socket.on('user-info', (body) => {
                console.log('this is user-info body', body, "it ends here")
                // lobbyUsers.map((user, ind)=>{
                //     if(body.username === user.username){ lobbyUsers.splice(ind, 1)}
                // });
                lobbyUsers.push({...body, socketId: socket.id});
                io.in('lobby').emit("user-list", lobbyUsers);

            });
            socket.on('join-lobby', (body) => {
                const testIndexOf = lobbyUsers.indexOf((user) => user.user_id === body.user_id)
                console.log(testIndexOf);
                console.log(body, lobbyUsers)
                if(testIndexOf === -1){
                    socket.join('lobby')
                    console.log("how much wood could a wood chuck")
                    lobbyUsers.push({...body, socketId: socket.id});
                    io.in('lobby').emit("user-list", lobbyUsers);
                }
            })
            socket.on('remove-user', (body) =>{
                console.log('remove-user',body)
                const index = lobbyUsers.findIndex((user)=> body === user.username)
                lobbyUsers.splice(index, 1);
                io.in('lobby').emit("user-list", lobbyUsers);
                socket.leave('lobby')
            });
            socket.on('challenge-player', (body) => {
                const roomName = `${body.challenger}-${body.opponent}`  
                console.log(lobbyUsers)
                console.log('body', body)
                const opponentSocket = lobbyUsers.find(user => user.user_id === body.opponent);
                console.log("opponentSocket", opponentSocket)
                if(opponentSocket){
                    console.log('~~~~ hit')
                    io.sockets.connected[opponentSocket.socketId].join(roomName)
                    socket.join(roomName)
                    let newObj = {
                        ...body,
                        roomName,
                        players: [
                            lobbyUsers.find(user => user.user_id === body.challenger),
                            lobbyUsers.find(user => user.user_id === body.opponent)
                        ]
                    }
                    console.log(newObj)
                    io.in(roomName).emit('start-game', newObj)
                }
            })
            socket.on('gameOver', (body) => {
                 const broom = body
                console.log('gameOver', broom)
                io.in(`${broom}`).emit('modal')
            })
        })
    })
    .catch((err) => console.log(`Database error: ${err}`));


//endpoints

//auth endpoints
app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);
app.post('/auth/logout', authCtrl.logout);
app.get('/auth/user', authCtrl.getUser);

// game endpoints
app.get('/api/leaders', gameCtrl.getLeaders);





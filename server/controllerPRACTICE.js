module.exports = {
    getCards

}


Endpoints for authentication:
app.post('/auth/login', authCtr.login),
app.post('/auth/register', authCtrl.register),
app.post('/auth/logout', authCtrl.logout),
app.get('/auth/user', authCtrl.getUser)

Endpoints for games
app.get('/api/cards', cardCtr.getCards),
app.get('/api/cards/:id', cardCtrl.getCard),

Endpoints for scores
app.get('/api/score', scoreCtrl.getScore),

const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const { username, password, email } = req.body;
        console.log('username, password, email', username, password, email);
        const db = req.app.get('db');
        let foundUser = await db.user.get_user([username]);
        if (foundUser[0]) {
            res.status(409).send("user already exists");
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await db.user.add_user([username, hash, email]);

            req.session.user = newUser[0];
            res.status(201).send(newUser[0]);
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get("db");
        let foundUser = await db.user.get_user(username);
        foundUser = foundUser[0];
        if (foundUser){
            const compareHash = foundUser.password;
            const authenticated = bcrypt.compareSync(password, compareHash);
            if (authenticated) {
                delete foundUser.password;
                req.session.user = foundUser;
                res.status(202).send(foundUser);
            } else {
                res.status(401).send("Username or password incorrect");
            }
        } else {
            res.status(401).send("Username or password incorrect");
        }
  },
  logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
  },
  getUser: (req, res) => {
      if (req.session.user) {
        //   console.log("req.session.user", req.session.user)
          res.status(200).send(req.session.user);
      } else {
          res.sendStatus(404);
      }
  },
};
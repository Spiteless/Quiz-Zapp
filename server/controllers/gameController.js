module.exports = {
 getLeaders: (req, res) => {
     const db = req.app.get("db");
     db.game.get_leaders().then((leaders) => {console.log(leaders); res.status(200).send(leaders)});
 }
}
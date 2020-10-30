module.exports = {
  getLeaders: (req, res) => {
    const db = req.app.get("db");
    db.game.get_leaders().then((leaders) => res.status(200).send(leaders));
  },
  playerScore: (req, res) => {
    const db = req.app.get("db");
    const { playerId, questions, correct, score } = req.body;
    db.game.update_scores(playerId, score, questions, correct).then(() => {
      res.sendStatus(200);
    });
  },
};

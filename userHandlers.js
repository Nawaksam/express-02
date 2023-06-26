const database = require("./database")

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  database
    .query("select * from users where id = ?", [id])
    .then(([user]) => {
      console.log(user)
      user.length ? res.json(user) : res.sendStatus(400)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}

module.exports = {
  getUsers,
  getUserById,
}

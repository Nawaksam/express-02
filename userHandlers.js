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

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body

  database
    .query(
      "INSERT INTO `users` (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Error saving the user")
    })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { firstname, lastname, email, city, language } = req.body

  database
    .query(
      "UPDATE `users` SET `firstname` = ? , `lastname` = ?, `email` = ?, `city` = ?, `language` = ? WHERE `id` = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(200)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
}

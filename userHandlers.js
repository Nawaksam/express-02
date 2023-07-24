const database = require("./database")

const getUsers = (req, res) => {
  const initialSql = "select * from users where 1=1"
  const and = []

  if (req.query.language) {
    and.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    })
  }

  if (req.query.city) {
    and.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    })
  }

  database
    .query(
      and.reduce(
        (sql, { column, operator }) => `${sql} and ${column} ${operator} ?`,
        initialSql
      ),
      and.map(({ value }) => value)
    )
    .then(([movies]) => {
      res.json(movies)
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
      user.length ? res.json(user) : res.sendStatus(404)
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

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10)

  database
    .query("DELETE FROM `users` WHERE `id` = ?", [id])
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
  deleteUser,
}

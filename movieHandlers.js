const database = require("./database")

const getMovies = (req, res) => {
  const initialSql = "select * from movies where 1=1"
  const and = []

  if (req.query.color) {
    and.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    })
  }

  if (req.query.max_duration) {
    and.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
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

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id)

  database
    .query("select * from movies where id = ?", [id])
    .then(([movie]) => {
      movie.length ? res.json(movie) : res.sendStatus(404)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
}

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body

  database
    .query(
      "INSERT INTO `movies` (title,director,year, color, duration) VALUES (?,?,?,?,?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/movies/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Error saving the movie")
    })
}

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { title, director, year, color, duration } = req.body

  database
    .query(
      "UPDATE `movies` SET `title` = ?, `director` = ?, `year` = ? , `color` = ?, `duration` = ? WHERE `id` = ?",
      [title, director, year, color, duration, id]
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

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id, 10)

  database
    .query("DELETE FROM `movies` WHERE `id` = ?", [id])
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
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
}

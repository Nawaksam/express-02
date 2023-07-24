const database = require("./database")

const getMovies = (req, res) => {
  database
    .query("select * from movies")
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
      movie.length ? res.json(movie) : res.sendStatus(400)
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
module.exports = {
  getMovies,
  getMovieById,
  postMovie,
}

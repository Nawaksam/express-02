const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body
  const errors = []
  const errorsMessage = "There are one or more errors:"

  if (title.length > 255) {
    errors.push({ field: "title", message: "is longer than 255 characters" })
  }
  if (!title) {
    errors.push({ field: "title", message: "is missing" })
  }
  if (!director) {
    errors.push({ field: "director", message: "is missing" })
  }
  if (!year) {
    errors.push({ field: "year", message: "is missing" })
  }
  if (!color) {
    errors.push({ field: "color", message: "is missing" })
  }
  if (!duration) {
    errors.push({ field: "duration", message: "is missing" })
  }

  errors.length
    ? res
        .status(422)
        .send(
          errors.reduce(
            (err, { field, message }) => `${err} the ${field} ${message}.`,
            errorsMessage
          )
        )
    : next()
}

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body
  const errors = []
  const errorsMessage = "There are one or more errors:"

  if (!firstname) {
    errors.push({ field: "firstname", message: "is missing" })
  }
  if (!lastname) {
    errors.push({ field: "lastname", message: "is missing" })
  }
  if (!email) {
    errors.push({ field: "email", message: "is missing" })
  }
  if (!city) {
    errors.push({ field: "city", message: "is missing" })
  }
  if (!language) {
    errors.push({ field: "language", message: "is missing" })
  }

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/
  if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "doesn't match the expression name@provider.tld",
    })
  }

  errors.length
    ? res
        .status(422)
        .send(
          errors.reduce(
            (err, { field, message }) => `${err} the ${field} ${message}.`,
            errorsMessage
          )
        )
    : next()
}

module.exports = {
  validateMovie,
  validateUser,
}

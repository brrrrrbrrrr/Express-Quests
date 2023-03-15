const validateMovie = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { title, director, year, color, duration } = req.body;
  const errors = [];
  if (title == null || typeof director !== 'string') {
    errors.push({ field: 'title', message: 'This field is required' });
  }

  if (director == null || typeof director !== 'string' || /\d/.test(director)) {
    errors.push({ field: 'director', message: 'Please enter a valid name' });
  }

  if (year == null || isNaN(year) || year.length != 4) {
    errors.push({ field: 'year', message: 'Please enter an valid year' });
  }

  if (color == null || isNaN(color) || (color !== '0' && color !== '1')) {
    errors.push({ field: 'color', message: 'The color must be at 0 or 1' });
  }

  if (duration == null || isNaN(duration)) {
    errors.push({
      field: 'duration',
      message: 'The duration must be a number',
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};
// -------------------------------------------------------------
const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const errors = [];
  if (
    firstname == null ||
    typeof firstname !== 'string' ||
    firstname.length > 20 ||
    /\d/.test(firstname)
  ) {
    errors.push({
      field: 'firstname',
      message: 'Please enter a valid firstname',
    });
  }
  if (
    lastname == null ||
    typeof firstname !== 'string' ||
    lastname.length > 20 ||
    /\d/.test(lastname)
  ) {
    errors.push({ field: 'lastname', message: 'This field is required' });
  }
  if (email == null || !/\S+@\S+\.\S+/.test(email)) {
    errors.push({
      field: 'email',
      message: 'This field is required or Please enter a valid email address',
    });
  }
  if (
    city == null ||
    typeof city !== 'string' ||
    city.length > 20 ||
    /\d/.test(city)
  ) {
    errors.push({
      field: 'city',
      message: 'This field is required, or enter a valid city',
    });
  }
  if (
    language == null ||
    typeof language !== 'string' ||
    language.length > 20 ||
    /\d/.test(language)
  ) {
    errors.push({
      field: 'language',
      message: 'This field is required, or enter a valid language',
    });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};

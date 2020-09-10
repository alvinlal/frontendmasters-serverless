const movies = require("../data/movies.json");

exports.handler = async () => {
  return {
    statusCode: 200,
    movies: JSON.stringify(movies),
  };
};

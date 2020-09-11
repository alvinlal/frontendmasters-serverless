require("dotenv").config();
const { URL } = require("url");
const { query } = require("./utils/hasura");
const fetch = require("node-fetch");

exports.handler = async () => {
  const { movies } = await query({
    query: `
    query  {
      movies {
        id
        poster
        tagline
        title
      }
    }
    
    `,
  });
  const api = new URL("https://www.omdbapi.com/");

  api.searchParams.set("apiKey", process.env.OMDB_KEY);

  const promises = movies.map((movie) => {
    api.searchParams.set("i", movie.id);

    return fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const scores = data.Ratings;

        return {
          ...movie,
          scores,
        };
      });
  });

  const movieWithScores = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(movieWithScores),
  };
};

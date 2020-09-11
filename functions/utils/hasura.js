const fetch = require("node-fetch");
const { URL } = require("url");

exports.query = async ({ query, variables = {} }) => {
  const result = await fetch(process.env.HASURA_GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return result.data;
};

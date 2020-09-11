const { query } = require("./utils/hasura");

exports.handler = async (event) => {
  const { id, title, tagline, poster } = JSON.parse(event.body);

  const result = await query({
    query: `
      mutation insertMovie($id:String!,$poster:String!,$title:String!,$tagline:String!) {
        insert_movies_one(object: {id:$id,poster:$poster,tagline:$tagline,title:$title}){
          id
          title
          tagline
          poster
        }
      }
      `,
    variables: { id, title, tagline, poster },
  });
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

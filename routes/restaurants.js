const express = require('express');
const router = express.Router();
const db = require('../db')

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Restaurant {
    id: Int!
    name: String!
    visits: Int!
  }

  type Query {
    restaurants: [Restaurant]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  restaurants: () => {
    return db.any('SELECT * FROM restaurants')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
};

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


/* GET restos listing. */
// router.get('/', (req, res, next) => {
//   db.any('SELECT * FROM restaurants')
//     .then((data) => {
//       res.send(data);
//     })
//     .catch(err => {
//       next(err);
//     }) 
// });

module.exports = router;

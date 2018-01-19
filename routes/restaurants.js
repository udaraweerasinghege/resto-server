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

const root = {
  restaurants: async () => {
    try {
      return await db.any('SELECT * FROM restaurants');
    } 
    catch(e) {
      throw(e);
    }
  }
};

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = router;

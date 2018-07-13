const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');

const db = require('../db')
const schema = require('../schema');

const router = express.Router();

const resolvers = {
  Query: {
    restaurants: async () => {
      try {
        res = await db.any('SELECT * FROM restaurants r LEFT JOIN comments c on r.id = c.restaurant_id');
        return res;
      } 
      catch(e) {
        throw(e);
      }
    },
  },
  Mutation: {
    createRestaurant: async (_, { restoName, mainImage }) => {    
      try {
        res = await db.query('INSERT INTO restaurants(name, logo) VALUES ($1, $2)', [restoName, mainImage]);
        res = await db.any('SELECT * FROM restaurants r LEFT JOIN comments c on r.id = c.restaurant_id ORDER BY ID DESC LIMIT 1')
        return res[0];
      } 
      catch(e) {
        throw(e);
      }
    },
  },
};

const typeDefs = [...schema.queries, ...schema.types, ...schema.mutations];
const graphqlSchema = makeExecutableSchema({
  typeDefs, 
  resolvers
});

module.exports = graphqlSchema;

const express = require('express');
const {makeExecutableSchema} = require('graphql-tools');

const db = require('../db')
const schema = require('../schema');

const router = express.Router();

const resolvers = {
    Query: {
        restaurants: async () => {
            try {
                res = await db.any('SELECT * FROM restaurants');
                return res;
            }
            catch (e) {
                throw(e);
            }
        },
        restaurantSlug: async (_, {slug}) => {
            try {
                res = await db.any('SELECT * FROM restaurants WHERE slug = ($1)', [slug]);
                return res;
            }
            catch (e) {
                throw(e);
            }
        },
        restaurantID: async (_, {id}) => {
            try {
                res = await db.any('SELECT * FROM restaurants WHERE id = ($1)', [id]);
                return res;
            }
            catch (e) {
                throw(e);
            }
        },
    },
    Mutation: {
        createRestaurant: async (_, {restoName, mainImage, likes, dislikes, notes, visits}) => {
            try {
                res = await db.query('INSERT INTO restaurants(name, logo, likes, dislikes, notes, visits) VALUES ($1, $2, $3, $4, $5, $6)', [restoName, mainImage, likes, dislikes, notes, visits]);
                res = await db.any('SELECT * FROM restaurants ORDER BY ID DESC LIMIT 1')
                return res[0];
            }
            catch (e) {
                throw(e);
            }
        },
        updateRestaurant: async (_, { restoID, visits, name, likes, dislikes, notes, logo }) => { 
            try {
                res = await db.tx(t => {
                    return t.none(`UPDATE restaurants
                    SET visits=($2),
                        name=($3),
                        likes=($4),
                        dislikes=($5),
                        notes=($6),
                        logo=($7)
                    WHERE id = ($1)`, [restoID, visits, name, likes, dislikes, notes, logo])
                });
                res =  await db.one('SELECT * FROM restaurants WHERE restaurants.id = ($1)', [restoID]);
                return res;
            }
            catch (e) {
                throw(e);
            }        
        }
    }
};

const typeDefs = [...schema.queries, ...schema.types, ...schema.mutations];
const graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = graphqlSchema;

const restaurant = `
  extend type Query {
    restaurant(slug: String!): [Restaurant]
  }
`;

module.exports = restaurant;

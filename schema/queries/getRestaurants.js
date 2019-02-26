const getRestaurants = `
  type Query {
    restaurants: [Restaurant]
    restaurantSlug(slug: String!): [Restaurant]
    restaurantID(id: Int!): [Restaurant]
  }
`;

module.exports = getRestaurants;

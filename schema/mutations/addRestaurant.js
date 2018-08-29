const createRestaurant = `
  type Mutation {
    createRestaurant(restoName: String!, mainImage: String): Restaurant
  }
`;

module.exports = createRestaurant;

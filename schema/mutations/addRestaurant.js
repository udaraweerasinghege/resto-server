const createRestaurant = `
  type Mutation {
    createRestaurant(restoName: String!, mainImage: String, likes: String, dislikes: String, notes: String, visits: Int): Restaurant
  }
`;

module.exports = createRestaurant;

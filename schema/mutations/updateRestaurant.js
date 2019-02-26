const updateRestaurant = `
  extend type Mutation {
    updateRestaurant(restoID: Int!, mainImage: String, visits: Int!, name: String!, likes: String, dislikes: String, notes: String, logo: String): Restaurant
  }
`;

module.exports = updateRestaurant;
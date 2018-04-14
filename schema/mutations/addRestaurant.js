const createRestaurant = `
  type Mutation {
    createRestaurant(restoName: String): [Restaurant]
  }
`;

module.exports = createRestaurant;

const Comment = require('./comment');

const Restaurant = `
  type Restaurant {
    id: Int!
    visits: Int!
    name: String!    
    likes: String
    dislikes: String
  }
`;

module.exports = Restaurant;
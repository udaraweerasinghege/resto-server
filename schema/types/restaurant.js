const Restaurant = `
  type Restaurant {
    id: Int!
    visits: Int!
    name: String!    
    likes: String
    dislikes: String
    notes: String
    logo: String
    slug: String!
  }
`;

module.exports = Restaurant;

import { ApolloServer, gql } from "apollo-server";

const schema = gql(`
  type Query {
    
  }

  type Mutation {

  }

  type Intersection {
    id: ID!
    name: String!
    roads: [Road!]!
    traffic: Int!
  }
  
  interface Road {
    id: ID!
    name: String!
    isOneway: Boolean!
  }

  type Highway implements Road {
    id: ID!
    name: String!
    isOneway: Boolean!
    code: String!
  }

  type UrbanRoad implements Road {
    id: ID!
    name: String!
    isOneway: Boolean!
    locations: [String]
  }
`);

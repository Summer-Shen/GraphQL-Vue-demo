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
    code: String
  }

  type UrbanRoad implements Road {
    id: ID!
    name: String!
    isOneway: Boolean!
    locations: [String]
  }
`);

var datasource = {};

datasource.roads = [
  {
    type: 1,
    id: "u1",
    name: "邯郸路",
    isOneway: false,
    locations: ["复旦大学", "五角场"],
  },
  {
    type: 1,
    id: "u2",
    name: "国权路",
    isOneway: true,
    locations: ["复旦大学", "地铁国权路站"],
  },
  {
    type: 0,
    id: "h1",
    name: "中环路",
    isOneway: false,
  },
  {
    type: 0,
    id: "h2",
    name: "翔殷路隧道——五洲大道",
    isOneway: false,
  },
  {
    type: 0,
    id: "h3",
    name: "外环高速",
    isOneway: false,
    code: "S20",
  },
];

datasource.intersections = [
  {
    id: "1",
    name: "邯郸路国权路",
    roads: ["u1", "u2"],
    traffic: 1000,
  },
  {
    id: "2",
    name: "中环翔殷立交",
    roads: ["h1", "h2"],
    traffic: 2000,
  },
  {
    id: "3",
    name: "高东立交",
    roads: ["h2", "h3"],
    traffic: 3000,
  },
];

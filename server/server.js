const { ApolloServer, gql } = require("apollo-server");

const schema = gql(`
  type Query {
    getIntersections: [Intersection]
    getRoad(roadId: String!): Road
  }

  type Mutation {
    setTraffic(intersectionId: String!, trafficInput: Int!): String
  }

  type Intersection {
    id: ID!
    name: String!
    roads: [ID!]!
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

var resolvers = {
  Query: {
    getIntersections: (parent, args, context) => {
      let ret = [];
      context.datasource.intersections.forEach((intersection) => {
        let retRoads = [];
        intersection.roads.forEach((roadId) => {
          retRoads.push(context.datasource.roads.find((r) => r.id === roadId));
        });
        ret.push({
          id: intersection.id,
          name: intersection.name,
          roads: retRoads,
          traffic: intersection.traffic,
        });
      });
      return ret;
    },
    getRoad: (parent, args, context) => {
      return context.datasource.roads.find((r) => r.id === args.roadId);
    },
  },
  Mutation: {
    setTraffic: (parent, args, context) => {
      let intersection = context.datasource.roads.find(
        (i) => i.id === args.intersectionId
      );
      intersection.traffic = args.trafficInput;
      return "OK";
    },
  },
  Road: {
    __resolveType: (obj, context, info) => {
      switch (obj.type) {
        case 0:
          return "Highway";
        case 1:
          return "UrbanRoad";
        default:
          return null; // GraphQLError is thrown
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: {
    datasource,
  },
});

server.listen(4000).then(({ url }) => {
  console.log("GraphQL server running at localhost:4000");
});

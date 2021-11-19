const axios = require('axios');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    details: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    cores: { type: CoresType }
  })
});

const CoresType = new GraphQLObjectType({
  name: 'Cores',
  fields: () => ({
    core: { type: GraphQLString },
    flight: { type: GraphQLInt },
    landing_type: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/launches')
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/launches/${args.id}`)
          .then(res => res.data);
      }
    },
    cores: {
      type: new GraphQLList(CoresType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/cores')
          .then(res => res.data);
      }
    },
    rocket: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
const graphql = require('graphql');
const Reservation = require('../db/reservation.js');

const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString, 
  GraphQLInt, 
  GraphQLList,
  GraphQLNonNull
} = graphql;

const ReservationType = new GraphQLObjectType({
  name: 'Reservation',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    hotelName: { type: GraphQLString },
    arrivalDate: { type: GraphQLString },
    departureDate: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    everyReservation: {
      type: new GraphQLList(ReservationType),
      resolve() {
        return Reservation.find({});
      }
    },
    reservation: {
      type: ReservationType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Reservation.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addReservation: {
      type: ReservationType,
      args: {
        id: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        hotelName: { type: new GraphQLNonNull(GraphQLString) },
        arrivalDate: { type: new GraphQLNonNull(GraphQLString) },
        departureDate: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const reservation = new Reservation(args);
        return reservation.save();
      }
    },
    deleteReservation: {
      type: ReservationType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Reservation.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
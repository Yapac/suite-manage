import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Guest from "../models/Guest.js";
import Task from "../models/Task.js";
import Staff from "../models/Staff.js";
import Payment from "../models/Payment.js";

const resolvers = {
  Query: {
    rooms: () => Room.find(),
    bookings: () => Booking.find(),
    guests: () => Guest.find(),
    tasks: () => Task.find(),
    staff: () => Staff.find(),
    payments: () => Payment.find(),
  },
  Mutation: {
    addRoom: (_, { input }) => Room.create(input),
    addBooking: (_, { input }) => Booking.create(input),
    addGuest: (_, { input }) => Guest.create(input),
    addTask: (_, { input }) => Task.create(input),
    addStaff: (_, { input }) => Staff.create(input),
    addPayment: (_, { input }) => Payment.create(input),
  },
};

export default resolvers;

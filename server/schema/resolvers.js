const Room = require("../models/Room");
const Booking = require("../models/Booking");
const Guest = require("../models/Guest");
const Task = require("../models/Task");
const Staff = require("../models/Staff");
const Payment = require("../models/Payment");

module.exports = {
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

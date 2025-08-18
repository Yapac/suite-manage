import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type Room {
    id: ID!
    number: String!
    type: String!
    pricePerNight: Float!
    status: String!
    description: String
  }

  type Booking {
    id: ID!
    roomId: ID!
    guestId: ID!
    checkIn: Date!
    checkOut: Date!
    totalPrice: Float
    status: String!
    createdAt: Date!
  }

  type Guest {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    address: String
    idDocument: String
    createdAt: Date!
  }

  type Task {
    id: ID!
    title: String
    assignedTo: ID
    roomId: ID
    status: String!
    createdAt: Date!
  }

  type Staff {
    id: ID!
    firstName: String
    lastName: String
    role: String!
    email: String
    phone: String
    hireDate: Date!
  }

  type Payment {
    id: ID!
    bookingId: ID!
    amount: Float
    method: String!
    paidAt: Date!
  }

  type Query {
    rooms: [Room]
    bookings: [Booking]
    guests: [Guest]
    tasks: [Task]
    staff: [Staff]
    payments: [Payment]
  }

  input RoomInput {
    number: String!
    type: String!
    pricePerNight: Float!
    status: String
    description: String
  }

  input BookingInput {
    roomId: ID!
    guestId: ID!
    checkIn: Date!
    checkOut: Date!
    totalPrice: Float
    status: String
  }

  input GuestInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    address: String
    idDocument: String
  }

  input TaskInput {
    title: String
    assignedTo: ID
    roomId: ID
    status: String
  }

  input StaffInput {
    firstName: String
    lastName: String
    role: String!
    email: String
    phone: String
  }

  input PaymentInput {
    bookingId: ID!
    amount: Float
    method: String!
  }

  type Mutation {
    addRoom(input: RoomInput!): Room
    addBooking(input: BookingInput!): Booking
    addGuest(input: GuestInput!): Guest
    addTask(input: TaskInput!): Task
    addStaff(input: StaffInput!): Staff
    addPayment(input: PaymentInput!): Payment
  }
`;

export default typeDefs;
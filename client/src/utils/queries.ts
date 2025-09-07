import gql from "graphql-tag";

// 1.BOOkING
export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking($input: BookingFormDTO!) {
    createBooking(input: $input) {
      id
    }
  }
`;
export const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBooking($input: BookingInputDTO!) {
    deleteBooking(input: $input) {
      id
    }
  }
`;
export const LIST_BOOKINGS_ALLDATA_QUERY = gql`
  query DashboardBookingsAllData {
    bookings {
      id
      roomId {
        id
        number
        type
      }
      guestId {
        name
        id
      }
      checkIn
      checkOut
      totalPrice
      paymentType
      status
    }
  }
`;
export const DASHBOARD_BOOKINGS_QUERY = gql`
  query DashboardBookings {
    bookings {
      id
      totalPrice
      checkIn
      roomId {
        id
        number
      }
    }
  }
`;
export const UPDATE_BOOKING_MUTATION = gql`
  mutation UpdateBooking($input: BookingFormDTO!) {
    updateBooking(input: $input) {
      id
      totalPrice
      roomId {
        id
        number
        type
      }
      checkIn
      checkOut
      guestId {
        id
        name
        documentId
        documentType
      }
    }
  }
`;

// 2. GUEST
export const CREATE_GUEST_MUTATION = gql`
  mutation CreateGuest($input: GuestFormDTO!) {
    createGuest(input: $input) {
      id
    }
  }
`;

export const LIST_GUESTS_QUERY = gql`
  query ListGuests {
    guests {
      id
      name
      documentType
      documentId
      phone
      email
    }
  }
`;

// 3. ROOM

export const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($input: RoomFormDTO!) {
    createRoom(input: $input) {
      id
    }
  }
`;
export const LIST_ROOMS_QUERY = gql`
  query ListRooms {
    rooms {
      id
      number
      type
      pricePerNight
      status
      description
    }
  }
`;
export const UPDATE_ROOM_MUTATION = gql`
  mutation UpdateRoom($input: RoomFormDTO!) {
    updateRoom(input: $input) {
      id
      number
      type
      pricePerNight
      status
      description
    }
  }
`;
export const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoom($input: RoomInputDTO!) {
    deleteRoom(input: $input) {
      id
    }
  }
`;

// 4. STAFF
export const UPDATE_STAFF_MUTATION = gql`
  mutation UpdateStaff($input: UpdateStaffInput!) {
    updateStaff(input: $input) {
      id
      name
      email
      phone
      role
      avatarUrl
    }
  }
`;
export const LIST_STAFFS_QUERY = gql`
  query ListStaffs {
    staffs {
      id
      name
      role
      email
      phone
      hireDate
      avatarUrl
    }
  }
`;

// 5. TASK
export const DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY = gql`
  query DashboardCalendarUpcomingTasks(
    $limit: Int
    $offset: Int
    $sortBy: String
    $order: String
  ) {
    tasks(limit: $limit, offset: $offset, sortBy: $sortBy, order: $order) {
      id
      title
      status
      roomId {
        id
        number
      }
      createdAt
      assignedTo {
        id
        name
        avatarUrl
      }
    }
  }
`;
export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: TaskFormDTO!) {
    createTask(input: $input) {
      id
    }
  }
`;
export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: TaskFormDTO!) {
    updateTask(input: $input) {
      id
      title
      status
      roomId {
        id
        number
        type
      }
      createdAt
      assignedTo {
        id
        name
        avatarUrl
      }
      description
    }
  }
`;
export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($input: TaskFormDTO!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

// OTHERS
export const DAHBOARD_TOTAL_COUNTS_QUERY = gql`
  query DashboardTotalCounts {
    rooms {
      id
    }
    bookings {
      id
    }
    staffs {
      id
    }
  }
`;

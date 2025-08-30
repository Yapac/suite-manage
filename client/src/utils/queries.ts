import gql from "graphql-tag";

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
      roomId
      createdAt
      assignedTo {
        id
        name
      }
    }
  }
`;

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

export const DASHBOARD_BOOKINGS_ALLDATA_QUERY = gql`
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

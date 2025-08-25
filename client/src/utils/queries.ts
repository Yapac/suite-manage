import gql from "graphql-tag";

export const DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY = gql`
  query DashboardCalendarUpcomingTasks {
    tasks {
      id
      title
      assignedTo
      status
      roomId
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

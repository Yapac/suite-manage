import gql from "graphql-tag";

export const DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY = gql`
  query DashboardCalendarUpcomingTasks(
    $filter: TaskFilter!
    $sorting: [TaskSort!]
    $paging: OffsetPaging!
  ) {
    tasks(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        color
        startDate
        endDate
      }
    }
  }
`;

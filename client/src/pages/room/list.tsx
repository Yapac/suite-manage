import { LIST_ROOMS_QUERY } from "@/utils/queries";
import { SearchOutlined } from "@ant-design/icons";
import { CreateButton, FilterDropdown, List, useTable } from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Table } from "antd";

export const RoomsList = () => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "rooms",
    pagination: {
      pageSize: 8,
    },
    meta: {
      gqlQuery: LIST_ROOMS_QUERY,
    },
  });
  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: "rooms",
                action: "create",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table {...tableProps} pagination={tableProps.pagination}>
        <Table.Column
          dataIndex="number"
          title="Room number"
          render={(value: string) => <span>Room {value}</span>}
          defaultFilteredValue={getDefaultFilter("number", filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Room" />
            </FilterDropdown>
          )}
        />
      </Table>
    </List>
  );
};

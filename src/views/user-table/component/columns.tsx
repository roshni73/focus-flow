import { RiDeleteBin5Line, RiEditLine, RiMoreLine } from "react-icons/ri";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { STATUS_COLORS, USER_STATUS } from "../constant/constant";
import { getCookie } from "../../../utils/cookies";

export type User = {
  key: string;
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  joinedDate: string;
};

interface GetColumnsParams {
  onEdit: (record: User) => void;
  onDelete: (record: User) => void;
}

export const getColumns = ({ onEdit, onDelete }: GetColumnsParams) => {
  const userRole = getCookie("auth_role");
  const getMenuItems = (record: User): MenuProps["items"] => [
    {
      key: "edit",
      icon: <RiEditLine />,
      label: "Edit",
      onClick: () => onEdit(record),
    },
    {
      key: "delete",
      icon: <RiDeleteBin5Line />,
      label: "Delete",
      danger: true,
      onClick: () => onDelete(record),
    },
  ];

  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === USER_STATUS.ACTIVE
              ? STATUS_COLORS.active
              : STATUS_COLORS.inactive
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },
    ...(userRole !== "user"
      ? [
          {
            title: "Actions",
            key: "actions",
            render: (_: any, record: User) => (
              <Dropdown
                menu={{ items: getMenuItems(record) }}
                trigger={["click"]}
                placement='bottomRight'
              >
                <Button
                  type='text'
                  icon={<RiMoreLine size={20} />}
                />
              </Dropdown>
            ),
          },
        ]
      : []),
  ];
};

import React from "react";
import { Table, Button } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import PaginationWrapper from "./pagination-wrapper";
import { getCookie } from "../../../utils/cookies";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface CustomTableProps<T extends { key: React.Key }> {
  data: T[];
  columns: TableColumnsType<T>;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  showActions?: boolean;
  rowSelectionEnabled?: boolean;

  page?: number;
  size?: number;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
}

const CustomTable = <T extends { key: React.Key }>({
  data,
  columns,
  onEdit,
  onDelete,
  showActions = true,
  rowSelectionEnabled = true,
  page = 1,
  size = 10,
  total = 0,
  onPageChange,
  showSizeChanger = false,
}: CustomTableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<T> | undefined = rowSelectionEnabled
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    : undefined;

  const userRole = (getCookie("auth_role") || "")
    .toString()
    .trim()
    .toLowerCase();

  const isUser = userRole === "user";

  const finalColumns: TableColumnsType<T> = showActions
    ? [
        ...columns,
        {
          title: "Actions",
          key: "actions",
          render: (_, record) => (
            <div className='flex gap-2'>
              {onEdit && (
                <Button
                  type='link'
                  disabled={isUser}
                  onClick={() => onEdit(record)}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  type='link'
                  danger
                  disabled={isUser}
                  onClick={() => onDelete(record)}
                >
                  Delete
                </Button>
              )}
            </div>
          ),
        },
      ]
    : columns;

  return (
    <div className='flex flex-col gap-4'>
      <Table<T>
        rowSelection={rowSelection}
        columns={finalColumns}
        dataSource={data}
        pagination={false}
      />

      {total > 0 && (
        <div className='flex justify-end'>
          <PaginationWrapper
            page={page}
            size={size}
            total={total}
            onChange={onPageChange || (() => {})}
            showSizeChanger={showSizeChanger}
          />
        </div>
      )}
    </div>
  );
};

export default CustomTable;

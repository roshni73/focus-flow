import React from "react";
import { Pagination } from "antd";

interface PaginationWrapperProps {
  page: number | string;
  size: number | string;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
}

const PaginationWrapper: React.FC<PaginationWrapperProps> = ({
  page,
  size,
  total,
  onChange,
  showSizeChanger = false,
}) => {
  return (
    <Pagination
      hideOnSinglePage
      current={Number(page)}
      pageSize={Number(size)}
      total={total}
      onChange={onChange}
      showSizeChanger={showSizeChanger}
    />
  );
};

export default PaginationWrapper;

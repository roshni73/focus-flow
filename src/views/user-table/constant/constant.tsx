export const USER_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
} as const;

export const USER_ROLE = {
  ADMIN: "Admin",
  USER: "User",
  MANAGER: "Manager",
} as const;

export const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
};

export const TABLE_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_SIZE: 10,
};

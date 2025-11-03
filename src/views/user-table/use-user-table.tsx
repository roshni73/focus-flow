import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { User } from "./component/columns";
import { TABLE_CONFIG } from "./constant/constant";
import { mockData } from "./constant/data";

interface UseUserTableParams {
  initialPage?: number;
  initialSize?: number;
  initialSearch?: string;
}

export const useUserTable = (params?: UseUserTableParams) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL search params or use defaults
  const getPageFromParams = () => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const pageNum = parseInt(pageParam, 10);
      return !isNaN(pageNum) && pageNum > 0
        ? pageNum
        : TABLE_CONFIG.DEFAULT_PAGE;
    }
    return params?.initialPage ?? TABLE_CONFIG.DEFAULT_PAGE;
  };

  const getSizeFromParams = () => {
    const sizeParam = searchParams.get("size");
    if (sizeParam) {
      const sizeNum = parseInt(sizeParam, 10);
      return !isNaN(sizeNum) && sizeNum > 0
        ? sizeNum
        : TABLE_CONFIG.DEFAULT_SIZE;
    }
    return params?.initialSize ?? TABLE_CONFIG.DEFAULT_SIZE;
  };

  const getSearchFromParams = () => {
    return searchParams.get("search") || params?.initialSearch || "";
  };

  const [page, setPage] = useState(getPageFromParams);
  const [size, setSize] = useState(getSizeFromParams);
  const [search, setSearch] = useState(getSearchFromParams);
  const isUpdatingFromUserAction = useRef(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Manage users data state
  const [usersData, setUsersData] = useState<User[]>(mockData);

  useEffect(() => {
    // Skip if we're updating from a user action
    if (isUpdatingFromUserAction.current) {
      isUpdatingFromUserAction.current = false;
      return;
    }

    const urlPage = getPageFromParams();
    const urlSize = getSizeFromParams();
    const urlSearch = getSearchFromParams();

    // Only update state if URL params differ from current state
    if (urlPage !== page) {
      setPage(urlPage);
    }
    if (urlSize !== size) {
      setSize(urlSize);
    }
    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [searchParams.toString()]);

  // Update URL search params when state changes (user actions)
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (page !== TABLE_CONFIG.DEFAULT_PAGE) {
      newSearchParams.set("page", page.toString());
    }

    if (size !== TABLE_CONFIG.DEFAULT_SIZE) {
      newSearchParams.set("size", size.toString());
    }

    if (search.trim()) {
      newSearchParams.set("search", search);
    }

    // Check if params actually changed before updating URL
    const currentParamsString = searchParams.toString();
    const newParamsString = newSearchParams.toString();

    // Only update if params have actually changed to avoid unnecessary updates
    if (currentParamsString !== newParamsString) {
      isUpdatingFromUserAction.current = true;
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [page, size, search, searchParams, setSearchParams]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!search.trim()) {
      return usersData;
    }

    const searchLower = search.toLowerCase();
    return usersData.filter(
      (user) =>
        user.id.toLowerCase().includes(searchLower) ||
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        user.status.toLowerCase().includes(searchLower) ||
        user.joinedDate.toLowerCase().includes(searchLower)
    );
  }, [search, usersData]);

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (record: User) => {
    setSelectedUser(record);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (record: User) => {
    setSelectedUser(record);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  // CRUD operations
  const handleAddUser = (userData: Omit<User, "key">) => {
    const newUser: User = {
      ...userData,
      key: Date.now().toString(), // Generate unique key
    };
    setUsersData([...usersData, newUser]);
    closeAddModal();
  };

  const handleEditUser = (userData: Omit<User, "key">) => {
    if (!selectedUser) return;

    setUsersData(
      usersData.map((user) =>
        user.key === selectedUser.key
          ? { ...userData, key: selectedUser.key }
          : user
      )
    );
    closeEditModal();
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsersData(usersData.filter((user) => user.key !== selectedUser.key));
    closeDeleteModal();
  };

  const handleEdit = (record: User) => {
    openEditModal(record);
  };

  const handleDelete = (record: User) => {
    openDeleteModal(record);
  };

  const handlePageChange = (newPage: number, newSize: number) => {
    setPage(newPage);
    setSize(newSize);
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(TABLE_CONFIG.DEFAULT_PAGE);
  };

  return {
    data: paginatedData,
    page,
    size,
    total: filteredData.length,
    search,
    handleEdit,
    handleDelete,
    handlePageChange,
    handleSearch,
    // Modal states
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedUser,
    // Modal handlers
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    // CRUD operations
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  };
};

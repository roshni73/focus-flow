import {
  RiArrowDownSLine,
  RiFileLine,
  RiFilePdf2Line,
  RiSearch2Line,
  RiUserAddLine,
} from "react-icons/ri";
import AppInput from "../../shared/components/input/app-input";
import AppPrimaryButton from "../../shared/components/button/app-primary-button";
import AppSecondaryButton from "../../shared/components/button/app-secondary-button";
import CustomTable from "../../shared/components/table/custom-table";
import { useUserTable } from "./use-user-table";
import { getColumns } from "./component/columns";
import { Divider, Dropdown, type MenuProps } from "antd";
import AddUserModal from "./component/add-user-modal";
import EditUserModal from "./component/edit-user-modal";
import DeleteUserModal from "./component/delete-user-modal";
import { getCookie } from "../../utils/cookies";

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <RiFileLine size={20} />,
    label: <p>Export in Docs</p>,
  },
  {
    key: "2",
    icon: <RiFilePdf2Line size={20} />,
    label: <p>Export in PDF</p>,
  },
];

const UserTable = () => {
  const {
    data,
    page,
    size,
    total,
    search,
    handleEdit,
    handleDelete,
    handlePageChange,
    handleSearch,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedUser,
    openAddModal,
    closeAddModal,
    closeEditModal,
    closeDeleteModal,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  } = useUserTable();

  const columns = getColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const userRole = getCookie("auth_role");

  return (
    <>
      <div className='py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-4'>
        <p className='font-bold text-xl sm:text-2xl'>Manage Clients</p>
        <Divider />
        <div className='mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
          <div className='w-full sm:w-auto sm:flex-1 sm:max-w-md'>
            <AppInput
              prefix={<RiSearch2Line className='text-gray-400' />}
              name='search'
              placeholder='Search...'
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-2 w-full sm:w-auto'>
            <AppPrimaryButton
              className='rounded-2xl! flex-1 sm:flex-initial!'
              icon={<RiUserAddLine size={15} />}
              onClick={openAddModal}
              disabled={userRole === "user"}
            >
              Add User
            </AppPrimaryButton>
            <Dropdown
              menu={{ items }}
              disabled={userRole === "user"}
            >
              <AppSecondaryButton
                icon={<RiArrowDownSLine size={15} />}
                disabled={userRole === "user"}
                className='flex-1 sm:flex-initial!'
              >
                Export
              </AppSecondaryButton>
            </Dropdown>
          </div>
        </div>
        <div className='mt-4 sm:mt-6 md:mt-8 overflow-x-auto'>
          <CustomTable
            data={data}
            columns={columns}
            showActions={false}
            rowSelectionEnabled={true}
            page={page}
            size={size}
            total={total}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        open={isAddModalOpen}
        onCancel={closeAddModal}
        onOk={handleAddUser}
      />
      <EditUserModal
        open={isEditModalOpen}
        user={selectedUser}
        onCancel={closeEditModal}
        onOk={handleEditUser}
      />
      <DeleteUserModal
        open={isDeleteModalOpen}
        user={selectedUser}
        onCancel={closeDeleteModal}
        onOk={handleDeleteUser}
      />
    </>
  );
};

export default UserTable;

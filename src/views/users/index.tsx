import { useEffect, useState } from 'react';
import { Eye, Trash2, Search, Edit, User, Mail, MapPin, Phone, Globe, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/card';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/table';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface EditUserForm {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export function UsersTable() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [viewUserId, setViewUserId] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditUserForm>({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    },
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    fetchUsers(false); // Don't show toast on initial load
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const fetchUsers = async (showToast = true) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      if (showToast) {
        toast.success('Users loaded successfully');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    toast.success('User deleted successfully');
    setDeleteUserId(null);
  };

  const handleView = (user: User) => {
    setViewUserId(user.id);
  };

  const handleEdit = (user: User) => {
    if (currentUser?.role !== 'admin') {
      toast.error('Only admins can edit users');
      return;
    }
    setEditUserId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: { ...user.company },
      address: { ...user.address }
    });
  };

  const handleSaveEdit = async () => {
    if (!editUserId) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUsers(users.map(user =>
        user.id === editUserId
          ? {
              ...user,
              ...editForm,
              company: { ...editForm.company },
              address: {
                ...editForm.address,
                geo: user.address.geo // Preserve geo coordinates
              }
            }
          : user
      ));

      setFilteredUsers(filteredUsers.map(user =>
        user.id === editUserId
          ? {
              ...user,
              ...editForm,
              company: { ...editForm.company },
              address: {
                ...editForm.address,
                geo: user.address.geo // Preserve geo coordinates
              }
            }
          : user
      ));

      toast.success('User updated successfully');
      setEditUserId(null);
    } catch (error) {
      toast.error('Failed to update user');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompanyChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value
      }
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getVisiblePages = () => {
    const totalVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(totalVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);

    if (endPage - startPage + 1 < totalVisiblePages) {
      startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Users Management</h1>
          <p className="text-gray-500">Manage and view all users in the system</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => fetchUsers(true)} // Show toast on refresh
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshIcon />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search by name, email, company, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/70"
            />
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500" />
            <p className="text-gray-500 mt-4">Loading users...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="text-gray-600 font-semibold">User</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Phone</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Company</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Location</TableHead>
                    <TableHead className="text-gray-600 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="text-white" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={16} />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-700">{user.company.name}</p>
                          <p className="text-sm text-gray-500">{user.company.catchPhrase}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={14} />
                          <span>{user.address.city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(user)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                            title="View user details"
                          >
                            <Eye size={16} />
                          </Button>
                          {currentUser?.role === 'admin' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(user)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                                title="Edit user"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteUserId(user.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                title="Delete user"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredUsers.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <User size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of{' '}
                  {filteredUsers.length} users
                </p>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-gray-600"
                  >
                    Previous
                  </Button>
                  {getVisiblePages().map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? '' : 'text-gray-600'}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-gray-600"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Delete User</h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteUserId(null)}
                className="text-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteUserId)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewUserId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewUserId(null)}
                className="text-gray-600"
              >
                Close
              </Button>
            </div>

            {(() => {
              const user = users.find(u => u.id === viewUserId);
              if (!user) return null;

              return (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700">{user.name}</h4>
                      <p className="text-gray-500">ID: {user.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-700">Contact Information</h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={16} />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={16} />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Globe size={16} />
                          <span>{user.website}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-700">Company</h5>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-700">{user.company.name}</p>
                        <p className="text-sm text-gray-600">{user.company.catchPhrase}</p>
                        <p className="text-sm text-gray-500">{user.company.bs}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-700">Address</h5>
                      <div className="space-y-1 text-gray-600">
                        <p>{user.address.street}</p>
                        <p>{user.address.suite}</p>
                        <p>{user.address.city}, {user.address.zipcode}</p>
                        <p className="text-sm text-gray-500">
                          Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUserId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Edit User</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditUserId(null)}
                className="text-gray-600"
              >
                <X size={16} />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <Input
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Website</label>
                  <Input
                    value={editForm.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="Enter website URL"
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-700 mb-4">Company Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Company Name</label>
                    <Input
                      value={editForm.company.name}
                      onChange={(e) => handleCompanyChange('name', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Catch Phrase</label>
                    <Input
                      value={editForm.company.catchPhrase}
                      onChange={(e) => handleCompanyChange('catchPhrase', e.target.value)}
                      placeholder="Enter catch phrase"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-600">Business</label>
                    <Input
                      value={editForm.company.bs}
                      onChange={(e) => handleCompanyChange('bs', e.target.value)}
                      placeholder="Enter business description"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-700 mb-4">Address Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Street</label>
                    <Input
                      value={editForm.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      placeholder="Enter street"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Suite/Apt</label>
                    <Input
                      value={editForm.address.suite}
                      onChange={(e) => handleAddressChange('suite', e.target.value)}
                      placeholder="Enter suite or apartment"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">City</label>
                    <Input
                      value={editForm.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Zip Code</label>
                    <Input
                      value={editForm.address.zipcode}
                      onChange={(e) => handleAddressChange('zipcode', e.target.value)}
                      placeholder="Enter zip code"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setEditUserId(null)}
                  className="text-gray-600"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

export default UsersTable;
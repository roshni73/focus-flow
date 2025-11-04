import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';

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

interface UserEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export function UserEditModal({ user, isOpen, onClose, onSave }: UserEditModalProps) {
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

  useEffect(() => {
    if (user && isOpen) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: { ...user.company },
        address: { ...user.address }
      });
    }
  }, [user, isOpen]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser: User = {
        ...user,
        ...editForm,
        company: { ...editForm.company },
        address: {
          ...editForm.address,
          geo: user.address.geo
        }
      };

      onSave(updatedUser);
      toast.success('User updated successfully');
      onClose();
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

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Edit User</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
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
              onClick={onClose}
              className="text-gray-600"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
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
  );
}
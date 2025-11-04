import { useState } from 'react';

import { toast } from 'sonner';
import { Camera, Save, X } from 'lucide-react';
import { Badge } from '../../components/badge';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/card';
import { Button } from '../../components/button';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Textarea } from '../../components/textarea';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  company: string;
  position: string;
}

export function ProfilePage() {
  const { user } = useAuth();
  const isViewer = user?.role === 'viewer';

  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate about building great products and leading amazing teams.',
    company: 'Acme Inc.',
    position: user?.role === 'admin' ? 'Administrator' : 'Viewer',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isViewer) {
      toast.error('Viewers cannot edit their profile');
      return;
    }

    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Passionate about building great products and leading amazing teams.',
      company: 'Acme Inc.',
      position: user?.role === 'admin' ? 'Administrator' : 'Viewer',
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-700">Profile Settings</h1>
        <p className="text-gray-500">Manage your account information and preferences</p>
      </div>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            {!isViewer && (
              <button
                className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                onClick={() => toast.info('Upload profile picture feature coming soon!')}
              >
                <Camera size={20} />
              </button>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-gray-700">{user?.name}</h2>
              <Badge
                variant={user?.role === 'admin' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {user?.role}
              </Badge>
            </div>
            <p className="text-gray-500 mb-4">{formData.email}</p>
            <p className="text-gray-500">{formData.bio}</p>
          </div>

          {!isViewer && !isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </Card>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-600">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing || isViewer}
                className="bg-white/70 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing || isViewer}
                className="bg-white/70 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-600">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing || isViewer}
                className="bg-white/70 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-600">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={!isEditing || isViewer}
                className="bg-white/70 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-600">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                disabled={!isEditing || isViewer}
                className="bg-white/70 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-gray-600">Position</Label>
              <Input
                id="position"
                value={formData.position}
                disabled
                className="bg-gray-100 text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-600">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing || isViewer}
              rows={4}
              className="bg-white/70 text-gray-700 resize-none"
            />
          </div>

          {isEditing && !isViewer && (
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save size={18} />
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2 text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                <X size={18} />
                Cancel
              </Button>
            </div>
          )}

          {isViewer && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-700">
                👁️ You have viewer access. Contact an administrator to edit your profile.
              </p>
            </div>
          )}
        </form>
      </Card>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200/50">
            <div>
              <p className="text-gray-700 font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email updates about your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked
                disabled={isViewer}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200/50">
            <div>
              <p className="text-gray-700 font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={isViewer}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-gray-700 font-medium">Delete Account</p>
              <p className="text-sm text-gray-500">Permanently delete your account and data</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              disabled={isViewer}
              onClick={() => toast.error('Account deletion feature is disabled in demo')}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
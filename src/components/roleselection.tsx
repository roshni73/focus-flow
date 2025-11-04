import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from './card';
import { Button } from './button';
import { Shield, Eye, Check, User } from 'lucide-react';

export function RoleSelection() {
  const { user, setUserRole } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'viewer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = async (role: 'admin' | 'viewer') => {
    setIsLoading(true);

    try {
      setUserRole(role);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error setting role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm border border-gray-200/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Choose Your Role</h1>
          <p className="text-gray-500">Welcome {user?.name}! Select how you want to use the application</p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Admin Role Option */}
          <button
            onClick={() => setSelectedRole('admin')}
            disabled={isLoading}
            className={`w-full p-6 border-2 rounded-xl text-left transition-all ${
              selectedRole === 'admin'
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                selectedRole === 'admin' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Shield className={selectedRole === 'admin' ? 'text-blue-600' : 'text-gray-400'} size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-700">Administrator</h3>
                  {selectedRole === 'admin' && (
                    <Check className="text-blue-600" size={20} />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Full access to all features, user management, and system settings
                </p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>• Manage users and permissions</li>
                  <li>• Access all analytics and reports</li>
                  <li>• Configure system settings</li>
                  <li>• Delete and edit user data</li>
                </ul>
              </div>
            </div>
          </button>

          {/* Viewer Role Option */}
          <button
            onClick={() => setSelectedRole('viewer')}
            disabled={isLoading}
            className={`w-full p-6 border-2 rounded-xl text-left transition-all ${
              selectedRole === 'viewer'
                ? 'border-green-500 bg-green-50 shadow-sm'
                : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                selectedRole === 'viewer' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Eye className={selectedRole === 'viewer' ? 'text-green-600' : 'text-gray-400'} size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-700">Viewer</h3>
                  {selectedRole === 'viewer' && (
                    <Check className="text-green-600" size={20} />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Read-only access to view data, reports, and analytics
                </p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>• View user data and analytics</li>
                  <li>• Access reports and charts</li>
                  <li>• Read-only profile access</li>
                  <li>• Cannot modify data</li>
                </ul>
              </div>
            </div>
          </button>
        </div>

        <Button
          onClick={() => selectedRole && handleRoleSelect(selectedRole)}
          disabled={!selectedRole || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Setting up your account...
            </div>
          ) : (
            `Continue as ${selectedRole === 'admin' ? 'Administrator' : 'Viewer'}`
          )}
        </Button>

        <p className="text-center text-xs text-gray-500 mt-4">
          You can change this later in your profile settings
        </p>
      </Card>
    </div>
  );
}

export default RoleSelection;
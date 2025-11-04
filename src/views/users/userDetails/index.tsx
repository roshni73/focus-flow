import { User, Mail, Phone, Globe } from 'lucide-react';
import { Button } from '../../../components/button';


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

interface UserViewModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserViewModal({ user, isOpen, onClose }: UserViewModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-gray-600"
          >
            Close
          </Button>
        </div>

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
      </div>
    </div>
  );
}
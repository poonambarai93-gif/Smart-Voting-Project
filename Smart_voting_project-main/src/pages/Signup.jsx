import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const SignUp = () => {
  const { setRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    voterID: '',
    village: '',
    constituency
: '',
    district: '',
    adminId: '',
  });
  const [userRole, setUserRole] = useState('voter');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = userRole === 'voter'
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            voterID: formData.voterID,
            villageName: formData.village, // Changed to match backend expectation
            constituency
: formData.constituency
,
            district: formData.district,
            role: userRole
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            adminId: formData.adminId,
            role: userRole
          };

      const endpoint = userRole === 'voter'
        ? 'http://localhost:5000/api/user/register'
        : 'http://localhost:5000/api/admin/register';

      const response = await axios.post(endpoint, payload);
      
      if (response.data) {
        setRole(userRole);
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Sign Up</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sign Up As:</label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={userRole === 'admin'}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Admin</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="voter"
                  checked={userRole === 'voter'}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Voter</span>
              </label>
            </div>
          </div>

          {userRole === 'voter' ? (
            <>
              <div>
                <label htmlFor="voterID" className="block text-sm font-medium text-gray-700">
                  voterID 
                </label>
                <input
                  id="voterID"
                  name="voterID"
                  type="text"
                  required
                  value={formData.voterID}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="village" className="block text-sm font-medium text-gray-700">
                  village
                </label>
                <input
                  id="village"
                  name="village"
                  type="text"
                  required
                  value={formData.village}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="constituency" className="block text-sm font-medium text-gray-700">
                  constituency
                </label>
                <input
                  id="constituency"
                  name="constituency"
                  type="text"
                  required
                  value={formData.constituency
}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                  district
                </label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">
                Admin ID
              </label>
              <input
                id="adminId"
                name="adminId"
                type="text"
                required
                value={formData.adminId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
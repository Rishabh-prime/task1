import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    name: '',
    rollno: '',
  });

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let user;
    if (role === 'admin') {
      user = {
        name: credentials.username,
        role: 'admin',
      };
    } else {
      user = {
        name: credentials.name,
        rollno: credentials.rollno,
        role: 'student',
      };
    }

    dispatch(login(user));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-indigo-100 mt-2">Please select your role to continue</p>
        </div>

        {!showForm ? (
          <div className="p-8 space-y-6">
            <button
              onClick={() => handleRoleSelect('admin')}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md"
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleRoleSelect('student')}
              className="w-full bg-white border text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-md"
            >
              Login as Student
            </button>
          </div>
        ) : (
          <div className="p-8">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {role === 'admin' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-3 border rounded-lg"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={credentials.name}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Roll No</label>
                    <input
                      type="text"
                      name="rollno"
                      value={credentials.rollno}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-3 border rounded-lg"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

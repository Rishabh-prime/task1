import { useDispatch } from 'react-redux';
import { addStudent } from '../../redux/slices/studentSlice';
import { useState } from 'react';
import { FiUser, FiHash, FiBook, FiGrid, FiPercent, FiPlus } from 'react-icons/fi';

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    class: '',
    section: '',
    attendance: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.roll.trim()) newErrors.roll = 'Roll number is required';
    if (!formData.class.trim()) newErrors.class = 'Class is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    if (!formData.attendance) {
      newErrors.attendance = 'Attendance is required';
    } else if (isNaN(formData.attendance) || formData.attendance < 0 || formData.attendance > 100) {
      newErrors.attendance = 'Must be between 0-100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      dispatch(addStudent({ 
        ...formData, 
        id: Date.now(),
        attendance: parseFloat(formData.attendance)
      }));
      setFormData({ name: '', roll: '', class: '', section: '', attendance: '' });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FiPlus className="text-blue-600" />
        Add New Student
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FiUser className="text-gray-500" /> Name
          </label>
          <input 
            id="name"
            name="name" 
            placeholder="John Doe" 
            value={formData.name} 
            onChange={handleChange} 
            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        {/* Roll No Field */}
        <div>
          <label htmlFor="roll" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FiHash className="text-gray-500" /> Roll No
          </label>
          <input 
            id="roll"
            name="roll" 
            placeholder="101" 
            value={formData.roll} 
            onChange={handleChange} 
            className={`w-full p-3 border ${errors.roll ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
          />
          {errors.roll && <p className="mt-1 text-sm text-red-600">{errors.roll}</p>}
        </div>
        
        {/* Class Field */}
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FiBook className="text-gray-500" /> Class
          </label>
          <select
            id="class"
            name="class" 
            value={formData.class} 
            onChange={handleChange} 
            className={`w-full p-3 border ${errors.class ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">Select Class</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
        </div>
        
        {/* Section Field */}
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FiGrid className="text-gray-500" /> Section
          </label>
          <select
            id="section"
            name="section" 
            value={formData.section} 
            onChange={handleChange} 
            className={`w-full p-3 border ${errors.section ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section}</p>}
        </div>
        
        {/* Attendance Field */}
        <div>
          <label htmlFor="attendance" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FiPercent className="text-gray-500" /> Attendance %
          </label>
          <input 
            id="attendance"
            name="attendance" 
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="85.5" 
            value={formData.attendance} 
            onChange={handleChange} 
            className={`w-full p-3 border ${errors.attendance ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
          />
          {errors.attendance && <p className="mt-1 text-sm text-red-600">{errors.attendance}</p>}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`flex items-center gap-2 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </>
          ) : (
            <>
              <FiPlus />
              Add Student
            </>
          )}
        </button>
      </div>
    </form>
  );
}
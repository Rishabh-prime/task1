import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

export default function StudentTable() {
  const students = useSelector((state) => state.student.students);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [minAttendance, setMinAttendance] = useState('');
  const [maxAttendance, setMaxAttendance] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.roll_number && student.roll_number.toString().includes(searchTerm));

    const matchesClass = selectedClass ? student.class === selectedClass : true;
    const matchesSection = selectedSection ? student.section === selectedSection : true;

    const attendance = parseFloat(student.attendance || 0);
    const min = minAttendance ? parseFloat(minAttendance) : 0;
    const max = maxAttendance ? parseFloat(maxAttendance) : 100;

    const matchesAttendance = attendance >= min && attendance <= max;

    return matchesSearch && matchesClass && matchesSection && matchesAttendance;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Roll No', key: 'roll_number' },
    { label: 'Class', key: 'class' },
    { label: 'Section', key: 'section' },
    { label: 'Attendance', key: 'attendance' },
    { label: 'Maths', key: 'marks.maths' },
    { label: 'Science', key: 'marks.science' },
    { label: 'English', key: 'marks.english' },
  ];

  const uniqueClasses = [...new Set(students.map(student => student.class))].sort();
  const uniqueSections = [...new Set(students.map(student => student.section))].sort();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Records</h2>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Name or Roll No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select 
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Sections</option>
              {uniqueSections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Attendance</label>
            <input
              type="number"
              placeholder="0%"
              min="0"
              max="100"
              value={minAttendance}
              onChange={(e) => setMinAttendance(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendance</label>
            <input
              type="number"
              placeholder="100%"
              min="0"
              max="100"
              value={maxAttendance}
              onChange={(e) => setMaxAttendance(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredStudents.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
          </div>

          <CSVLink 
            data={filteredStudents} 
            headers={csvHeaders} 
            filename="students.csv"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Export to CSV
          </CSVLink>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance (%)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Maths</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Science</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">English</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleStudents.length > 0 ? (
              visibleStudents.map((student, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.roll_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.class}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.section}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.attendance >= 75 ? 'bg-green-100 text-green-800' : 
                      student.attendance >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.marks?.maths ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.marks?.science ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.marks?.english ?? '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
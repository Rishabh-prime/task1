import { useSelector, useDispatch } from 'react-redux';
import { deleteStudent } from '../../redux/slices/studentSlice';
import { useState } from 'react';

export default function StudentTable() {
  const students = useSelector((state) => state.student.students);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const filtered = students;
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Class</th>
            <th>Section</th>
            <th>Attendance</th>
            {user?.role === 'admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {paginated.map((student) => (
            <tr key={student.id} className="text-center border-t">
              <td>{student.name}</td>
              <td>{student.roll}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.attendance}%</td>
              {user?.role === 'admin' && (
                <td>
                  <button
                    onClick={() => dispatch(deleteStudent(student.id))}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={page * PER_PAGE >= filtered.length} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

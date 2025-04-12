import { useSelector } from 'react-redux';
import StudentTable from '../components/Table/StudentTable';
import AddStudentForm from '../components/Table/AddStudentForm';

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
      {user?.role === 'admin' && <AddStudentForm />}
      <StudentTable />
    </div>
  );
}
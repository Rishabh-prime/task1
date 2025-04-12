import { useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip, Cell, BarChart, XAxis, YAxis, CartesianGrid, Bar, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

export default function Charts() {
  const students = useSelector((state) => state.student.students);

  const attendanceData = students.map((s) => ({ name: s.name, attendance: parseInt(s.attendance) }));
  const classData = Object.values(
    students.reduce((acc, curr) => {
      acc[curr.class] = acc[curr.class] || { name: `Class ${curr.class}`, value: 0 };
      acc[curr.class].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      <div>
        <h3 className="text-lg font-semibold mb-2">Attendance Bar Chart</h3>
        <BarChart width={400} height={300} data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="attendance" fill="#8884d8" />
        </BarChart>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Students by Class (Pie Chart)</h3>
        <PieChart width={400} height={300}>
          <Pie data={classData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
            {classData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

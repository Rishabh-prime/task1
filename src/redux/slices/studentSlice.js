import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/student.json';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: data.students, // ✅ get the array directly
  },
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        student => student.id !== action.payload
      );
    },
  },
});

export const { addStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from '../feature/patientsSlice';
export default configureStore({
  reducer: {
    patients: patientsReducer,
  }
})
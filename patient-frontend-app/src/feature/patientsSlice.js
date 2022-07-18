import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const url = "http://localhost:3001/patients/";

const initialState = {
  patients: [],
  status: 'idle',
  error: null,
}

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
    const apiUrl =  `${url}fetchPatients?`;
    const response = await axios.get(apiUrl);
    console.log(response);
    return response.data;
});

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPatients.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched patients to the array
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

//export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default patientsSlice.reducer

export const selectAllPatients = (state) => state.patients.patients

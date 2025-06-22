import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import { Job } from '../types/job';


type InitialStateType = {
    jobs:Job[]
}

const initialState: InitialStateType = {
    jobs:[]
};
const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action?.payload;
        },
        addJob:(state,action)=>{
            state.jobs = [action.payload,...state.jobs]
        }
    },
});

export const {
setJobs,
addJob
} = jobSlice?.actions;

export const getJobs = (state: RootState) => state?.job?.jobs;
export const getPendingJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item)=>item.status === "pending");
};
export const getAssignedJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item)=>item.status === "assigned");
};
export const getInProgressJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item)=>item.status === "in-progress");
};
export const getCompletedJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item)=>item.status === "completed");
};
export const getCancelledJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item)=>item.status === "cancelled");
};

export default jobSlice.reducer;

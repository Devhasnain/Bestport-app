import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

import { Job } from '../types/job';


type InitialStateType = {
    jobs: Job[],
    employee: {
        assigned: any[],
        in_progress: Job[],
        completed: Job[]

    }
}

type setEmpJobType = {
    payload: {
        key: "assigned" | "in_progress" | "completed",
        value: any
    }
}

const initialState: InitialStateType = {
    jobs: [],
    employee: {
        assigned: [],
        in_progress: [],
        completed: []
    }
};
const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action?.payload;
        },
        addJob: (state, action) => {
            state.jobs = [action.payload, ...state.jobs]
        },
        setEmployeeJobs: (state, action: setEmpJobType) => {
            state.employee[action.payload.key] = action.payload.value
        },
        addEmployeeJobs: (state, action: setEmpJobType) => {
            state.employee[action.payload.key] = [action.payload.value, ...state.employee[action.payload.key]]
        },
        empMarkJobComplete:(state,action)=>{
            const job = state.employee.in_progress.find((item)=>item._id === action.payload);
            state.employee.in_progress = state.employee.in_progress.filter((item)=>item._id !== action.payload);
            if(job){
            state.employee.completed = [job,...state.employee.completed]
            }

        },
        removeJobTicket: (state, action) => {
            state.employee.assigned = state.employee.assigned?.filter((item) => item?._id !== action.payload)
        }
    },
});

export const {
    setJobs,
    addJob,
    setEmployeeJobs,
    removeJobTicket,
    addEmployeeJobs,
    empMarkJobComplete
} = jobSlice?.actions;

export const getJobs = (state: RootState) => state?.job?.jobs;
export const getPendingJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item) => item?.status === "pending") ?? [];
};
export const getInProgressJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item) => item?.status === "in-progress") ?? [];
};
export const getEmployeeInProgressJobs = (state: RootState) => {
    return state?.job?.employee.in_progress
};
export const getEmployeeCompletedJobs = (state: RootState) => {
    return state?.job?.employee.completed
};
export const getCompletedJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item) => item?.status === "completed") ?? [];
};
export const getCancelledJobs = (state: RootState) => {
    return state?.job?.jobs?.filter((item) => item?.status === "cancelled") ?? [];
};
export const getJobTickets = (state: RootState) => {
    return state?.job?.employee?.assigned ?? [];
};

export default jobSlice.reducer;

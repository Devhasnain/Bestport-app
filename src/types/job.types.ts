export type Job = {
    _id: string;
    service_type: string;
    title: string;
    description: string;
    preferred_date: string;
    urgency: 'Low' | 'Medium' | 'High';
    city: string;
    post_code: string;
    address: string;
    instructions?: string;
    customer: {
        _id: string;
        name: string;
        profile_img?: { path?: string };
    };
    assigned_to: {
        _id: string;
        name: string;
        profile_img?: { path?: string };
    } | null;
    status: JobStatus;
    review: {
        _id: string;
        rating: number;
        comment?: string;
        employee: {
            _id: string;
            name: string;
            profile_img?: string;
        };
    } | null;
    createdAt: string;
    assigned_candidates: any
};

export type JobStatus = "all"| "pending" | "in-progress" | "completed" | "cancelled" | null;
export type JobMeta = {
    canCompleteJob: boolean,
    canEmployeeInteract: boolean,
    canReviewJob: boolean
}

export type JobsListParams = {
    page?: number,
    limit?: number,
    status?:JobStatus
}
export type JobTicketListParams={
    id:string,
    page?:number,
    limit?:number
}

export type CreateJobPayload = {
    service_type: string,
    title: string,
    description: string,
    preferred_date: string,
    urgency: string,
    city: string,
    post_code: string,
    address: string,
    instructions: string,
    contact_no: string
}

export type ReviewJobPayload = {
    data:any,
    jobId: string, employeeId: string
}
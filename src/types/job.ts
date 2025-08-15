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
        profile_img?: {path?:string};
    };
    assigned_to: {
        _id: string;
        name: string;
        profile_img?: {path?:string};
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
    assigned_candidates:any
};

export type JobStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

import { User } from "./user";


export type IHelpRequest = {
    _id: string;
    ticketId: string;
    user: User,
    subject: string;
    message: string;
    phone: string;
    status: 'pending' | 'in-progress' | 'resolved',
    createdAt: Date
}

export interface HelpRequestsListPayload {
    page?: number;
    limit?: number
}
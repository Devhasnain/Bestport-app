
export type UserRole = "admin" | "employee" | "customer";
export interface ProfileImage {
    path: string;
    mimetype: string;
    filename: string;
}

export interface UserDevice {
    fcm_token?: string | null;
    device_id?: string;
    app_version?: string;
    os_version?: string;
    device_type?: string;
    brand?: string;
    device_name?: string;
    ip_address?: string;
}

export interface User {
    _id: string;

    name: string;
    email: string;

    role: UserRole;
    image?: string;
    apple_sub?: string | null;
    date_of_birth?: string;

    position?: string;
    about?: string;

    is_active?: boolean;
    is_locked?: boolean;

    phone?: string;
    address?: string;

    profile_img?: ProfileImage;

    rating: number;
    reviews: string[]; // ObjectId as string

    device?: UserDevice;

    is_deleted: boolean;

    is_available: boolean;
    is_online: boolean;

    last_heartbeat?: string | null;

    createdAt: string;
    updatedAt: string;
}

export interface SignUpPayload {
    name: string,
    email: string,
    password: string,
}

export interface LoginPayload {
    email: string;
    password: string
}
export interface LoginResponse {
    data: { token: string }
}

export interface OnlineEmployee {
    email: string,
    is_available: boolean,
    is_online: boolean
    last_heartbeat: Date
    name: string,
    position: string,
    profile_img:
    { path: string, mimetype: string, filename: string }
    rating: number
    _id: string
}

export interface UserProfileResponse {
    data: {
        jobs: any[],
        reviews: any[]
        user: User
    }
}

export interface UpdateProfilePayload {
    name: string;
    phone: string;
    about: string
}

export interface AppleLoginPayload {
    identityToken: string
}

export interface GoogleLoginPayload {
    name: string,
    email: string,
    profile_img: string
}

export interface VerifyOtpPayload { otp: string, email: string }
export interface SetPasswordPayload {
    token: string, password: string
}
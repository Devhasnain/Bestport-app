export type User = {
    name: string;
    email: string;
    _id: string;
    createdAt: Date;
    role: "employee" | "customer",
    rating: 0
}
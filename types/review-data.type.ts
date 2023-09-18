import { ObjectId } from "mongoose";

export type ReviewData = {
    rating: number;
    description?: string;
    name?: string;
    userId: string;
    companyId: string;
}
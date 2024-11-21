import { Food } from "./foodModel";
import { UserModel } from "./userModel";

export type EstablishmentStatus = "PENDING" | "APPROVED" | "REJECTED";
export type LocationType = "Point";

export type Location = {
    _id: string;
    type: LocationType;
    coordinates: number[]
}

export type Rating = {
    _id: string;
    user_id: UserModel;
    establishment_id: string;
    rating: number;
    comment: string;
}

export type Documents = {
    _id: string;
    name: string;
    image: string;
}

export type EstablishmentModel = {
    _id: string;
    name: string;
    location: Location;
    menu_items: Food[];
    contact_number: string;
    email: string;
    barangay: string;
    quisines: string[];
    operating_hours: string;
    ratings: Rating[];
    owner: string;
    status: EstablishmentStatus;
    documents: Documents[];
    image: string;
    createdAt: string;
    updatedAt: string;
}
import { Food } from "./foodModel";

export type EstablishmentStatus = "PENDING" | "APPROVED" | "REJECTED";
export type LocationType = "Point";

export type Location = {
    _id: string;
    type: LocationType;
    coordinates: number[]
}

export type Rating = {
    _id: string;
    user_id: string;
    establishment_id: string;
    rating: number;
    comment: string;
}

export type EstablishmentModel = {
    _id: string;
    status: EstablishmentStatus;
    name: string;
    location: Location;
    images: string[];
    contact_number: string;
    email: string;
    barangay: string;
    quisines: string[];
    operating_hours: string[];
    ratings: Rating[];
    owner: string;
    menu_items: Food[];
    createdAt: string;
    updatedAt: string;
}
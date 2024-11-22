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

export const emptyEstablishmentForm: EstablishmentForm = {
    jsonData: {
    name: "",
    location: {
        type: "Point",
        coordinates: [],
    },
    menu_items: [],
    contact_number: "",
    email: "",
    barangay: "",
    quisines: [],
    operating_hours: "",
    ratings: [],
    owner: "",
    image: "",
    },
    documentImage: undefined,
    establishmentImage: undefined,
    documentName: "",
}

export type EstablishmentForm = {
    jsonData: {
        name: string,
        owner: string,
        location: {
            type: string,
            coordinates: number[],
        },
        image: string,
        menu_items: [],
        contact_number: string,
        email: string,
        barangay: string,
        quisines: string[],
        operating_hours: string,
        ratings: [],
    },
    documentImage?: File,
    documentName: string,
    establishmentImage?: File,
}

// {
//     "name": "A really long named establishment",
//     "owner": "673ad90bd629d643fecde947",
//     "location": {
//         "type": "Point",
//         "coordinates": [
//             123.8854,
//             10.3157
//         ] // [longitude, latitude]
//     },
//     "images": [],
//     "menu_items": [],
//     "contact_number": "+63 912 345 6789",
//     "email": "sample@restaurant.com",
//     "barangay": "673586467cb954a38fddf597", // MongoDB ObjectId
//     "quisines": [
//         "Filipino",
//         "Asian"
//     ],
//     "operating_hours": "Monday-Sunday: 10:00 AM - 10:00 PM",
//     "ratings": []
// }
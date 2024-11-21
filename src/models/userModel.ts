export type UserType = "ADMIN" | "OWNER" | "USER";
export type EmailType = "GOOGLE" | "EMAIL" | "APPLE";

export type UserModel = {
    _id: string;
    name: string;
    type: UserType;
    avatar: string;
    email_type: EmailType;
    owned_establishment: string | null;
    email: string;
    password: string;
    favorite_establishments: string[];
    trial: boolean;
    premium: boolean;
    trial_exp_date: string | null;
    premium_exp_date: string | null;
    activation_code: string | null;
    activation_code_exp_date: string | null;
    activated: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type UserPayload = {
    exp: number;
    iat: number;
    sub: string;
    user: UserModel;
}
export type Food = {
    _id: string;
    name: string;
    tags: string[];
    image: string | File;
    description: string;
    price: number;
}
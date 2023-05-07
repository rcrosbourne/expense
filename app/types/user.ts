import {StaticImageData} from "next/image";

export type User = {
    name: string;
    email: string,
    role?: string,
    image: string|StaticImageData
}
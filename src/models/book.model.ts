import { RowDataPacket } from "mysql2";
import Author from "./author.model";
import Category from "./category.model";

export default interface Book extends RowDataPacket {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    imageThumbnail?: string;
    rate?: number;
    views?: number;
    realView?: number;
    liked?: number;
    disabled?: boolean;
    hiddenAds?: boolean;
    status?: string;
    author?: Author;
    categories: Category[];
    createdAt?: Date;
    updatedAt?: Date;
}

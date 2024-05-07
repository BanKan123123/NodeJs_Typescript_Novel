import { RowDataPacket } from "mysql2";
import Book from "./book.model";

export default interface Chapter extends RowDataPacket {
    id?: number;
    title?: string;
    slug?: string;
    data?: string;
    book?: Book;
    chapterIndex?: number;
    audioUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
    hiddenAds?: boolean;
    summary?: string;
}
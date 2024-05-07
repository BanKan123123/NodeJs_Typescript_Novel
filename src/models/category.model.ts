import { RowDataPacket } from "mysql2";

export default interface Category extends RowDataPacket {
    id?: number,
    name?: string,
    slug?: string
    createdAt?: Date;
    updatedAt?: Date;
}
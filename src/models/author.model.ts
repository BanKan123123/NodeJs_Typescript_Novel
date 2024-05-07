import { RowDataPacket } from "mysql2";

export default interface Author extends RowDataPacket {
    id?: number,
    name?: string,
    slug?: string
    createdAt?: Date;
    updatedAt?: Date;
}

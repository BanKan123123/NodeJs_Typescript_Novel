import RowMapper from "../../mapper/Row.interface";

export default interface IAbstract<T> {
    query(query: string, rows: RowMapper<T>): Promise<T[]>;

    queryOne(query: string, rows: RowMapper<T>, id: number): Promise<T[]>;

    insert(query: string, params: Object): Number;

    update(query: string, params: Object): Promise<number>;
}
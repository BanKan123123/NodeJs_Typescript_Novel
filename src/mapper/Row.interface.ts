
export default interface RowMapper<T> {
    mapRow(rows: T[]): Promise<T[]>;
}
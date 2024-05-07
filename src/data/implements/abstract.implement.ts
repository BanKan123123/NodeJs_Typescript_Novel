import RowMapper from "../../mapper/Row.interface";
import IAbstract from "../interface/abstract.interface";
import connection from '../../config/database/server.connection';
import { OkPacket, RowDataPacket } from "mysql2";

export default class AbstractRepository<T extends RowDataPacket> implements IAbstract<T> {
    queryOne(query: string, rows: RowMapper<T>, id: number): Promise<T[]> {
        return new Promise((resolve, reject) => {
            connection.query<T[]>(query, [id], (err, res) => {
                if (err) reject(err);
                else {
                    let response: Promise<T[]> = rows.mapRow(res);
                    resolve(response);
                };
            })
        })
    }

    query(query: string, rows: RowMapper<T>): Promise<T[]> {

        return new Promise((resolve, reject) => {
            connection.query<T[]>(query, (err, res) => {
                if (err) reject(err);
                else {
                    let response: Promise<T[]> = rows.mapRow(res);
                    resolve(response);
                }
            })
        })
    }
    insert(query: string, params: T[]): Number {
        connection.query<OkPacket>(query, [...params], (err, res) => {
            if (err) return null;
            else return res.insertId;
        })
        return 0;
    }


    update(query: string, params: Object): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

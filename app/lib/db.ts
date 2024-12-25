import { createPool } from 'mysql2'
import {QueryResult} from 'mysql2/promise'

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,      
    maxIdle: 5,               
    idleTimeout: 60000,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 20
})

pool.getConnection((err, conn) => {
    if (err) {
        console.error('Database connection error:', {
            code: err.code,
            message: err.message,
            timestamp: new Date().toISOString()
        });
        return;
    }
    
    try {
        console.log('Connected to db...!');
    } finally {
        if (conn) { 
            conn.release();
        }
    }
});

const executeQuery = async (query:string, arrParams:any):Promise<QueryResult> => {  
    let connection;
    try {

        connection = await pool.promise().getConnection();

        const [results] = await connection.query(query, arrParams);
        return results;

    } catch (err) {
        console.error('Database error:', err);
        throw err;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export default executeQuery
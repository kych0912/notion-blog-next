import { QueryResult } from "mysql2/promise";
import executeQuery from "../db";

interface Post {
    id:string,
    description:string,
    author:string,
    date:Date,
    image:string,
    title:string,
    avatar:string
}

export async function uploadPost(data:Post){
    const id = data.id;
    const description = data.description;
    const author = data.author;
    const date = data.date.toISOString().slice(0, 10);
    const image = data.image;
    const title = data.title;
    const avatar = data.avatar;


    const query = `INSERT INTO Post(id, description, author, date, image, title,avatar) VALUES('${id}', '${description}', '${author}', '${date}', '${image}', '${title}','${avatar}')`;

    try {
        const data = await executeQuery(query, []);
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getPostById(id:string):Promise<QueryResult>{
    const query = `SELECT * FROM Post WHERE id='${id}'`;

    try {
        const data = await executeQuery(query, []);
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getLatestPosts(){
    const query = `SELECT * FROM Post ORDER BY date DESC`;

    try {
        const data = await executeQuery(query, []);
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getUserPosts(id:string){
    const query = `SELECT * FROM Post WHERE author='${id}' ORDER BY date DESC`;

    try {
        const data = await executeQuery(query, []);
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getPostDetail(id:string,user:string){
    const query = `SELECT * FROM Post WHERE id='${id}' AND author='${user}'`;

    try {
        const data = await executeQuery(query, []);
        return data;
    } catch (err) {
        throw err;
    }
}

export async function deletePost(id:string){
    const query = `DELETE FROM Post WHERE id='${id}'`;

    try {
        const data = await executeQuery(query, []);
        return data;
    } catch (err) {
        throw err;
    }
}
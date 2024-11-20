import { QueryResult } from "mysql2/promise";
import executeQuery from "../db";

interface Post {
    id:string,
    author:string,
    date:Date,
    image:string,
    title:string,
    avatar:string
}

export async function uploadPost(Post:Post){
    const id = Post.id;
    const author = Post.author;
    const date = Post.date.toISOString().slice(0, 10);
    const image = Post.image;
    const title = Post.title;
    const avatar = Post.avatar;


    const query = `INSERT INTO Post(id, author, date, image, title,avatar) VALUES('${id}', '${author}', '${date}', '${image}', '${title}','${avatar}')`;

    const data = await executeQuery(query, []);
    return data;
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

export async function getLatestPosts(page:number){
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
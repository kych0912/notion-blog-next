import executeQuery from "../db";

interface Post {
    id:string,
    description:string,
    author:string,
    date:Date
}

export async function uploadPost(data:Post){
    const id = data.id;
    const description = data.description;
    const author = data.author;
    const date = data.date.toISOString().slice(0, 10);


    const query = `INSERT INTO Post(id, description, author, date) VALUES('${id}', '${description}', '${author}', '${date}')`;

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
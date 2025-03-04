import { supabase } from "../db";

interface Post {
    id: string,
    author: string,
    date: Date,
    image: string,
    title: string,
    avatar: string,
    description: string
}

export async function uploadPost(Post: Post) {
    const postData = {
        id: Post.id,
        author: Post.author,
        date: Post.date.toISOString().slice(0, 10),
        image: Post.image,
        title: Post.title,
        avatar: Post.avatar,
        description: Post.description
    };

    const { data, error } = await supabase.from('post').insert(postData);
    
    if (error) throw error;
    return data;
}

export async function getPostById(id: string) {
    const { data, error } = await supabase.from('post').select('*').eq('id', id).single();
    
    if (error) throw error;
    return data;
}

export async function getLatestPosts(page: number) {
    const offset = (page - 1) * 10;
    
    const { data, error } = await supabase.from('post')
        .select('*')
        .order('date', { ascending: false })
        .range(offset, offset + 9);
    
    if (error) throw error;
    return data;
}

export async function getUserPosts(name: string) {
    const { data, error } = await supabase.from('post')
        .select('*')
        .eq('author', name)
        .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
}

export async function getPostDetail(id: string, user: string) {
    const { data, error } = await supabase.from('post')
        .select('*')
        .eq('id', id)
        .eq('author', user)
        .single();
    
    if (error) throw error;
    return data;
}

export async function deletePost(id: string) {
    const { data, error } = await supabase.from('post')
        .delete()
        .eq('id', id);
    
    if (error) throw error;
    return data;
}
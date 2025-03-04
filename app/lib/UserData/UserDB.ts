import { supabase } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

export async function findUserByName(name: string) {
    try {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('name', name)
            .single();

        if (error) throw error;
        return data || null;
    } catch (err) {
        console.log(err);
        throw err;
    }
}       

export async function comparePassword(password: string, hash: string) {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

export async function generateToken(id: string) {
    const token = jwt.sign({ id: id }, 'SECRET_KEY', { expiresIn: '3d' });
    return token;
}   

export async function createUser(id: string, name: string, password: string, avatar: string, email: string) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from('user')
            .insert([
                { id, name, password: hashedPassword, avatar, email }
            ])
            .select();

        if (error) throw error;
        return data;
    } catch (err: any) {
        throw err;
    }
}

export async function getUserInfoAndPostByName(name: string) {
    try {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('name', name);

        if (error) throw error;
        return data;
    } catch (err: any) {
        throw err;
    }
}

export async function getUserInfoById(id: string) {
    try {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('id', id);

        if (error) throw error;
        return data;
    } catch (err: any) {
        throw err;
    }
}
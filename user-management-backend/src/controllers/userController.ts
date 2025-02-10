// src/controllers/userController.ts
import { Request, Response } from 'express';
import supabase from '../config/SupabaseClient';
import axios from 'axios';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, error } = await supabase.from("clients").select("*");
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// Fetch a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from("clients").select("*").eq("id", id).single();
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body; 

        const { data: existingUser, error: existingUserError } = await supabase
            .from("clients")
            .select("*")
            .eq("email", email)
            .single();

        if (existingUserError && existingUserError.code !== 'PGRST116') {
            res.status(500).json({ error: existingUserError.message });
            return;
        }

        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        //  profile picture
        const profilePicResponse = await axios.get("https://randomuser.me/api/");
        const profilePic = profilePicResponse.data.results[0].picture.large;

        // Insert user into Supabase
        const { data, error } = await supabase.from("clients").insert([{ name, email, password }]).select("*");

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        if (!data || data.length === 0) {
            res.status(500).json({ error: "User creation failed" });
            return;
        }

        res.status(201).json({ ...data[0], profilePic });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


// Update user details
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const { data, error } = await supabase.from("clients").update({ name, email }).eq("id", id);

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from("clients").delete().eq("id", id);

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

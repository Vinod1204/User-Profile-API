import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import supabase from "../config/SupabaseClient";



export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const token = req.headers.authorization?.split(" ")[1];
      console.log("Received Token:", token);

      if (!token) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
      }
  
      const { data, error } = await supabase.auth.getUser(token);
      console.log("Supabase Auth Response:", { data, error });
  
      if (error || !data.user) {
        res.status(401).json({ error: "Unauthorized: Invalid token", details: error?.message });
        return;
      }
  
      (req as any).user = data.user;
      next();
    } catch (error) {
      console.error("Authentication Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};


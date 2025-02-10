import { Request } from "express";

declare module "express" {
    export interface Request {
        user?: any; // You can specify a proper type instead of 'any' if needed
    }
}

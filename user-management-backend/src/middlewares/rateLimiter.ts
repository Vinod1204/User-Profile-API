import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
    points: 1, // 1 requests
    duration: 30, // Per 30 seconds
});

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown"; // Fallback to remote address

    try {
        await rateLimiter.consume(ip); // Consume a point
        next();
    } catch {
        res.status(429).json({ error: "Too many requests. Please wait." });
    }
};


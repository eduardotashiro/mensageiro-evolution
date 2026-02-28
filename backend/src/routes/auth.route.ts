import { register, login } from "../controllers/auth.controller.js";

export const authRoutes = [
    {
        method: "POST",
        path: "/api/auth/register",
        handler: register
    },
    {
        method: "POST",
        path: "/api/auth/login",
        handler: login
    },
]


// import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

// const router = Router();



// router.post("/login", login)

// router.post("/register", register)





// export default router;

const routes = [
    {
        method: "POST",
        path: "/api/auth/register",
        handler: register
    },
    {
        method: "POST",
        path: "/api/auth/login",
        handler: login
    }
]
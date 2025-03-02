import { clerkClient, EmailAddress } from "@clerk/express";

export const requireAuth = async (req, res, next) =>{
    if (!req.auth.userId){
        return res.status(401).json({message: 'sign in required'})
    }
    next()
}


export const requireAdmin = async (req, res, next) =>{
    try {
        const curUser = await clerkClient.users.getUser(req.auth.userId)
        const isAdmin = curUser.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL
        if (!isAdmin){
            return res.status(403).json({message: 'admin privileges required'})
        }

    } catch (error) {
        res.status(500).json({message: 'internal server error'})
    }
}
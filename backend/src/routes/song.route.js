import { Router } from "express";

const router = Router()

router.get('/', (req, res)=>{
    res.send('get song route')
})

export default router
import { Router } from "express";

const router = Router()

router.get('/', (req, res)=>{
    res.send('get stats page')
})

export default router
import { Router } from "express";

const router = Router()

router.get('/', (req, res)=>{
    res.send('get album route')
})

export default router
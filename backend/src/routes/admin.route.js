import { Router } from "express";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controllers/admin.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router.get('/check', requireAuth, requireAdmin, checkAdmin)

router.post('/songs', requireAuth, requireAdmin ,createSong)
router.post('/songs/:id', requireAuth, requireAdmin, deleteSong)

router.post('/albums', requireAuth, requireAdmin ,createAlbum)
router.post('/songs/:id', requireAuth, requireAdmin ,deleteAlbum)


export default router
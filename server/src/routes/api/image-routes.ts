import { Router } from 'express';
import axios from 'axios';
import type { Request, Response } from 'express';

const router = Router();

// get image data by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/characters/${req.params.id}/pictures`);
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch anime title' });
    }
});

export { router as imageData };
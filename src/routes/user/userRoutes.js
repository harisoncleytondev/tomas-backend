import express from 'express';
import { createUser } from '../../controllers/userController.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    if (req.body == null) {
        res.status(400).json( {message: "Não foi encontrado informações para criar o usuario."} );
        return;
    }

    try {
        const response = await createUser(req.body);
        res.status(response.status).json(response.message);
    } catch (error) {
        res.status(500);
    }
})

export default router;
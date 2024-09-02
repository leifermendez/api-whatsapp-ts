import { Router } from "express";
const router = Router();

router.post('/', (req, res) => {
    const { phone, message } = req.body;
    // Aquí deberías implementar la lógica para enviar el mensaje usando la API de WhatsApp
    res.send(`Mensaje enviado a ${phone}: ${message}`);
});

export { router };

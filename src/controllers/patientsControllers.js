import patientsService from "../services/patientsService.js";

async function create(req, res) {
    const {name, email, password, phone} = req.body;
    
    try {
        await patientsService.create({name, email, password, phone});

        return res.sendStatus(201);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }


}

export default {
    create,
}
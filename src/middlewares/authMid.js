import patientsRepository from "../repositories/patientsRepository.js";

async function patientAuthValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    


    try {
        if (!token) throw new Error("Não autorizado")
        const { rows: [patientSession] } = await patientsRepository.findSessionByToken(token)
       
        if (!patientSession) throw new Error("Não autorizado")

        const { rows: [patient] } = await patientsRepository.findById(patientSession.patient_id)
        if (!patientSession) throw new Error("Usuário não encontrado")

        

        res.locals.patient = patient
        next()

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default {
    patientAuthValidation
}




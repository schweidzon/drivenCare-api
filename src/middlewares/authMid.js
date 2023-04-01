import doctorsRepository from "../repositories/doctorsRepository.js";
import patientsRepository from "../repositories/patientsRepository.js";

async function authValidation(req, res, next) {
    const { authorization, type } = req.headers;
    

    const token = authorization?.replace("Bearer ", "");
    try {
        if (!token) throw new Error("Não autorizado")
        if (type === 'patient') {
            const { rows: [patientSession] } = await patientsRepository.findSessionByToken(token)

            if (!patientSession) throw new Error("Não autorizado")

            const { rows: [patient] } = await patientsRepository.findById(patientSession.patient_id)
            if (!patient) throw new Error("Usuário não encontrado")



            res.locals.patient = patient
            next()

        } else {
            const { rows: [doctorSession] } = await doctorsRepository.findSessionByToken(token)
        

            if (!doctorSession) throw new Error("Não autorizado")
    
            const { rows: [doctor] } = await doctorsRepository.findById(doctorSession.doctor_id)
            
            if (!doctor) throw new Error("Usuário não encontrado")
    
    
    
            res.locals.doctor = doctor
            next()

        }

       

       





    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default {
    authValidation
}




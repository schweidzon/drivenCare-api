import doctorsRepository from "../repositories/doctorsRepository.js";
import patientsRepository from "../repositories/patientsRepository.js";
import jwt from 'jsonwebtoken'

async function authValidation(req, res, next) {
    const { authorization, type } = req.headers;
     
    const parts = authorization.split(" ")
    
   
    try {
        const [schema, token] = parts // descontruindo o array parts que tem "Bearer token"

        if(schema !== "Bearer") throw new Error("Não autorizado")

        if(parts.length !== 2) throw new Error("Não autorizado")

        if(!authorization) throw new Error("Não autorizado")

        if (!token) throw new Error("Não autorizado")

        if (type === 'patient') {

            jwt.verify(token, process.env.SECRET, async (error, decoded) => {
                try {

                    if(error) throw new Error("Não autorizado")
                 

                    const {rows: [patient]} = await patientsRepository.findById(decoded.id)

                    if(!patient) throw new Error("Não autorizado")

                    res.locals.patient = patient
                    next()

                    
                } catch (error) {
                    return res.status(500).send(error.message);
                }
            })
           

        } else {
             jwt.verify(token, process.env.SECRET, async (error, decoded) => {
                try {
                    
                    if(error) throw new Error("Não autorizado")
                 

                    const {rows: [doctor]} = await doctorsRepository.findById(decoded.id)

                    if(!doctor) throw new Error("Não autorizado")

                    res.locals.doctor = doctor
                    next()

                    
                } catch (error) {
                    return res.status(500).send(error.message);
                }
            })

        }

       

       





    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default {
    authValidation
}




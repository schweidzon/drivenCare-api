import doctorsRepository from "../repositories/doctorsRepository.js"
import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'

async function create({name, email, password, location, specialty, crm}) {

    const {rowCount} = await doctorsRepository.findByEmail(email)
    if(rowCount) throw new Error("Médico já cadastrado") 

    const hashPassword = await bcrypt.hash(password, 10)

    await doctorsRepository.create({name, email, password: hashPassword, location, specialty, crm})

}

async function signIn({email, password}) {
    const {rows: [doctor]} = await doctorsRepository.findByEmail(email)
    if(!doctor) throw new Error("Incorrect email or password")

    const checkPassword = await bcrypt.compare(password, doctor.password)
    if(!checkPassword) throw new Error("Incorrect email or password")

    const token = uuidV4();
    await doctorsRepository.createSession({token, doctorId: doctor.id})
    return token


}

export default {
    create,
    signIn
}
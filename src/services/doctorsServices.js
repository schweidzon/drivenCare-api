import doctorsRepository from "../repositories/doctorsRepository.js"
import bcrypt from 'bcrypt'

async function create({name, email, password, location, specialty}) {

    const {rowsCount} = await doctorsRepository.findByEmail(email)
    if(rowsCount) return "Médico já cadastrado"

    const hashPassword = await bcrypt.hash(password, 10)

    await doctorsRepository.create({name, email, password: hashPassword, location, specialty})

}

export default {
    create
}
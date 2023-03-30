import bcrypt from 'bcrypt';
import patientsRepository from '../repositories/patientsRepository.js';

async function create({ name, email, password, phone }) {




    const { rowCount } = await patientsRepository.findByEmail(email)

    if (rowCount) throw new Error("Usuário já cadastrado")

    const hashPassword = await bcrypt.hash(password, 10)


    await patientsRepository.create({ name, email, password: hashPassword, phone })


}

export default {
    create,
}
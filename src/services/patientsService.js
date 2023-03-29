import bcrypt from 'bcrypt';
import patientsRepository from '../repositories/patientsRepository.js';

async function create({ name, email, password, phone }) {




    const { rowsCount } = await patientsRepository.findByEmail(email)
    
    if (rowsCount) return "Usuário já cadastrado"

    const hashPassword =  await bcrypt.hash(password, 10)

  
    await patientsRepository.create({ name, email, password: hashPassword, phone })


}

export default {
    create,
}
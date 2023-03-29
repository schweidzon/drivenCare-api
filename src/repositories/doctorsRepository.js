import connectionDb from "../config/database.js";


async function findByEmail(email) {
    return connectionDb.query(`
        SELECT * FROM doctors WHERE email = $1
    `, [email]);

}

async function create({name, email, password, location, specialty}) {
    return connectionDb.query(`
    INSERT INTO doctors (name, email, password, location, specialty)
    VALUES ($1, $2, $3,$4, $5)
    
    `,[name, email, password, location, specialty]);
}

export default {
    findByEmail,
    create
}
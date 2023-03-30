
async function checkReqBody(req, res, next) {
    const { doctorName } = req.body
    const {doctorSpecialty} = req.body
    const {doctorLocation} = req.body
    console.log(doctorName)
     try {
        
        if(!doctorName && !doctorSpecialty && !doctorLocation) throw new Error("Você precisa mandar alguma informação para procurar um médico")
        
        next()
    } catch (error) {
         return res.status(500).send(error.message)
    }
}

export default {
    checkReqBody
}
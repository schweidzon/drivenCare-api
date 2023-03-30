import joi from 'joi'

export const doctorsSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    location: joi.string().required(),
    specialty: joi.string().required(),
    crm: joi.string().required()
})
import {Router} from 'express'
import doctorsControllers from '../controllers/doctorsControllers.js'
import authMid from '../middlewares/authMid.js'
import { validateSchema } from '../middlewares/validateSchemaMid.js'
import { doctorsSchema } from '../schemas/doctoresSchema.js'

const doctorsRoutes = Router()

doctorsRoutes.post("/signup", validateSchema(doctorsSchema),doctorsControllers.create)
doctorsRoutes.post("/signin", doctorsControllers.signIn)
doctorsRoutes.get("/appointments", authMid.authValidation, doctorsControllers.checkAppointment)



export default doctorsRoutes
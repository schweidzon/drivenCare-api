import {Router} from 'express'
import doctorsControllers from '../controllers/doctorsControllers.js'
import authMid from '../middlewares/authMid.js'
import { validateSchema } from '../middlewares/validateSchemaMid.js'
import { doctorsSchema } from '../schemas/doctoresSchema.js'

const doctorsRoutes = Router()

doctorsRoutes.post("/signup", validateSchema(doctorsSchema),doctorsControllers.create)
doctorsRoutes.post("/signin", doctorsControllers.signIn)
doctorsRoutes.get("/appointments", authMid.authValidation, doctorsControllers.checkAppointment)
doctorsRoutes.put("/appointments/confirm=:id", authMid.authValidation, doctorsControllers.confirmAppointment)
doctorsRoutes.put("/appointments/cancel=:id", authMid.authValidation, doctorsControllers.cancelAppointment)
doctorsRoutes.put("/appointments/finish=:id", authMid.authValidation, doctorsControllers.finishAppointment)



export default doctorsRoutes
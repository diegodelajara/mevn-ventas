import routerx from "express-promise-router"
import personaController from "../controllers/PersonaController"
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifyUser, personaController.add)
router.get('/query', auth.verifyUser, personaController.query)
router.get('/list', auth.verifyUser, personaController.list)
router.get('/listClientes', auth.verifyUser, personaController.listClientes)
router.get('/listProveedores', auth.verifyUser, personaController.listProveedores)
router.put('/update', auth.verifyUser, personaController.update)
router.delete('/remove', auth.verifyUser, personaController.remove)
router.put('/activate', auth.verifyUser, personaController.activate)
router.put('/desactivate', auth.verifySuperadministrator, personaController.desactivate)

export default router
import routerx from "express-promise-router"
import ingresoController from "../controllers/IngresoController"
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifySuperadministrator, ingresoController.add)
router.get('/query', auth.verifySuperadministrator, ingresoController.query)
router.get('/list', auth.verifySuperadministrator, ingresoController.list)
router.put('/activate', auth.verifySuperadministrator, ingresoController.activate)
router.put('/desactivate', auth.verifySuperadministrator, ingresoController.desactivate)

export default router
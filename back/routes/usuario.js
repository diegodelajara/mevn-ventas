import routerx from "express-promise-router"
import usuarioController from "../controllers/UsuarioController"
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifySuperadministrator, usuarioController.add)
router.get('/query', auth.verifySuperadministrator, usuarioController.query)
router.get('/list', auth.verifySuperadministrator, usuarioController.list)
router.put('/update', auth.verifySuperadministrator, usuarioController.update)
router.delete('/remove', auth.verifySuperadministrator, usuarioController.remove)
router.put('/activate', auth.verifySuperadministrator, usuarioController.activate)
router.put('/desactivate', auth.verifySuperadministrator, usuarioController.desactivate)
router.post('/login', usuarioController.login)

export default router
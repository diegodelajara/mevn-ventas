import routerx from "express-promise-router"
import categoriaController from "../controllers/CategoriaController"
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifySuperadministrator, categoriaController.add)
router.get('/query', auth.verifySuperadministrator, categoriaController.query)
router.get('/list', auth.verifySuperadministrator, categoriaController.list)
router.put('/update', auth.verifySuperadministrator, categoriaController.update)
router.delete('/remove', auth.verifySuperadministrator, categoriaController.remove)
router.put('/activate', auth.verifySuperadministrator, categoriaController.activate)
router.put('/desactivate', auth.verifySuperadministrator, categoriaController.desactivate)

export default router
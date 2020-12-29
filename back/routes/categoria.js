import routerx from "express-promise-router"
import categoriaController from "../controllers/CategoriaController"
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', categoriaController.add)
router.get('/query', categoriaController.query)
router.get('/list', auth.verifySuperadministrator, categoriaController.list)
router.put('/update', categoriaController.update)
router.delete('/remove', categoriaController.remove)
router.put('/activate', categoriaController.activate)
router.put('/desactivate', categoriaController.desactivate)

export default router
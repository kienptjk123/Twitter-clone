import { Router } from 'express'
import { serveImageController, serverVideoStreamController } from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-stream/:name', serverVideoStreamController)

export default staticRouter

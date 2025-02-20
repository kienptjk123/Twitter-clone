import { config } from 'dotenv'
import express from 'express'
import databaseService from '~/services/database.services'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import staticRouter from './routes/static.routes'
import usersRouter from './routes/users.routes'
import { initFolder } from './utils/file'
config()

const app = express()
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
const port = process.env.PORT || 4000
// const options = argv(process.argv.slice(2))
// console.log(options.development)
//Tạo folder upload
initFolder()

databaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`aaaaa ${port}`)
})

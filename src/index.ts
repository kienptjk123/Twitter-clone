import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'

const app = express()
const port = 4000
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

//Tạo folder upload
initFolder()

databaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`aaaaa ${port}`)
})

import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUpLoadSingleImage } from '~/utils/file'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUpLoadSingleImage(req)
    const newName = getNameFromFullname(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
    const info = await sharp(file.filepath).jpeg().toFile(newPath)
    return `http://localhost:3000/uploads/${newName}.jpg`
  }
}

const mediasService = new MediasService()
export default mediasService

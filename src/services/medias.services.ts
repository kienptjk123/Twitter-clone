import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import fs from 'fs'
import { getNameFromFullname, handleUpLoadImage, handleUpLoadVideo } from '~/utils/file'
import { isProduction } from '~/constants/config'
import { config } from 'dotenv'
import { MediaType } from '~/constants/enum'
import { Media } from '~/models/Other'
config()
class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUpLoadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        sharp.cache(false)
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async uploadVideo(req: Request) {
    const files = await handleUpLoadVideo(req)
    const { newFilename } = files[0]
    return {
      url: isProduction
        ? `${process.env.HOST}/static/video/${newFilename}`
        : `http://localhost:${process.env.PORT}/static/video/${newFilename}`,
      type: MediaType.Video
    }
  }

  // async uploadVideoHLS(req: Request) {
  //   const files = await handleUploadVideo(req)
  //   const result: Media[] = await Promise.all(
  //     files.map(async (file) => {
  //       const newName = getNameFromFullname(file.newFilename)
  //       queue.enqueue(file.filepath)
  //       return {
  //         url: isProduction
  //           ? `${envConfig.host}/static/video-hls/${newName}/master.m3u8`
  //           : `http://localhost:${envConfig.port}/static/video-hls/${newName}/master.m3u8`,
  //         type: MediaType.HLS
  //       }
  //     })
  //   )
  //   return result
  // }
}

const mediasService = new MediasService()
export default mediasService

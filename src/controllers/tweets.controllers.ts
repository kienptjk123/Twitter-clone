import { config } from 'dotenv'
import { Request, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { TweetRequestBody } from '~/models/Request/Tweet.request'
import { TokenPayload } from '~/models/Request/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)
  return res.json({
    message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESSFULLY,
    result
  })
}

export const getTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  console.log(result)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views
  }
  return res.json({
    message: 'Get Tweet Successfully',
    tweet
  })
}

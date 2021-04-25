import {Request, Response} from 'express'

interface RequestHandler{
  (req: Request, res: Response): Request 
}

export {Request, Response}
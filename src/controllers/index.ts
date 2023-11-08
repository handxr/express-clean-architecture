import { Request, Response } from 'express';

export class IndexController {
  public getIndex(req: Request, res: Response): void {
    res.send('¡Hola mundo!');
  }
}
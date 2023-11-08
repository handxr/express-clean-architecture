import { Request, Response } from "express";

export class IndexController {
  public getIndex(request: Request, response: Response): void {
    response.send("¡Hola mundo!");
  }

  public async getPosts(request: Request, response: Response): Promise<void> {
    try {
      const posts = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      ).then((response) => response.json());
      response.send(posts);
    } catch (error) {
      console.log(error);
    }
  }
}

import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export interface Request extends ExpressRequest {
  // Aquí puedes extender la interfaz Request con tus propias propiedades y métodos
}

export interface Response extends ExpressResponse {
  // Aquí puedes extender la interfaz Response con tus propias propiedades y métodos
}
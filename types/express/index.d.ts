declare namespace Express {
  // tslint:disable-next-line:no-empty-interface
  interface User { role: string, email: string, userId: string }

  export interface Request {
    user?: User | undefined;
  }
}

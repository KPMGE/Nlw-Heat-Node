import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayloadInterface {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "token.invalid" });
  }

  // the structure of the toke is: Bearer 39123. So, we need to split it
  // cuz we just need the token itself, witout the 'Bearer'

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayloadInterface;
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ error: "token.expired" });
  }
}

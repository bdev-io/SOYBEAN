import type { SpaceContext } from '../context.type';

declare global {
  namespace Express {
    interface Request {
      // NOTE: Request 에 주입되는 context
      spaceContext?: SpaceContext;
    }
  }
}

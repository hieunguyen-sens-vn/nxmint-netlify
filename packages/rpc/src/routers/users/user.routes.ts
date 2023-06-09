import { router, protectedRouter } from '../../config/router';
import { paginationSchema } from '../../config/schemas';
import { logout } from './user.services';
import {
  connectIGSchema,
  connectWalletSchema,
  createUserActivitySchema,
  setKYCSchema,
  closeSessionSchema,
  closeAllSessionSchema,
  logoutSchema,
} from '_@rpc/routers/users/user.schemas';
import {
  connectInstagram,
  connectWeb3Wallet,
  createUserActivity,
  getUserActivities,
  setKYCInfo,
  twitterObtainOauthAccessToken,
} from './user.services';

import { requestToken } from '_@rpc/services/twitter';
import { closeSession, closeAllSession } from '_@rpc/routers/users/user.services';

export const userRouters = router({
  connectInstagram: protectedRouter
    .input(connectIGSchema)
    .mutation(({ input, ctx }) => connectInstagram(input, ctx.auth.userId)),

  setKYC: protectedRouter
    .input(setKYCSchema)
    .mutation(({ input, ctx }) => setKYCInfo(input, ctx.auth.userId)),

  connectWallet: protectedRouter
    .input(connectWalletSchema)
    .mutation(({ input, ctx }) => connectWeb3Wallet(input, ctx.auth.userId)),
  createUserActivity: protectedRouter
    .input(createUserActivitySchema)
    .mutation(({ input, ctx }) => createUserActivity(input, ctx.auth.userId, ctx.requestClient)),
  getUserActivities: protectedRouter
    .input(paginationSchema)
    .query(({ input, ctx }) => getUserActivities(input, ctx.auth.userId)),

  twitterRequestToken: protectedRouter.mutation(() => requestToken()),

  twitterObtainOauthAccessToken: protectedRouter.mutation(async ({ ctx }) => {
    const query = ctx.req.query as Record<string, string>;

    return twitterObtainOauthAccessToken(
      query['oauth_verifier'],
      query['oauth_token'],
      ctx.auth.userId,
    );
  }),

  closeSession: protectedRouter
    .input(closeSessionSchema)
    .mutation(({ input }) => closeSession(input)),
  closeSessionAll: protectedRouter
    .input(closeAllSessionSchema)
    .mutation(({ input }) => closeAllSession(input)),

  logout: protectedRouter.input(logoutSchema).mutation(({ input }) => logout(input)),
});

export type UserRouter = typeof userRouters;

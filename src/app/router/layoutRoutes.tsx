import { reatomRoute } from '@reatom/core';

import { router } from '.';
import { Layout } from '../layouts';
import { isAuthenticated, userAtom } from '../user.model';

export const rootRoute = reatomRoute(
  {
    layout: true,
    render: (self) => <>{self.outlet()}</>
  },
  'routes.root'
);

export const authenticatedRoute = rootRoute.reatomRoute(
  {
    params: () => {
      if (router.login.match() || router.loginConfirm.match()) return null;

      if (!isAuthenticated()) {
        router.login.go(undefined, true);
        return null;
      }
      return { user: userAtom() };
    },
    layout: true,
    render: (self) => <Layout>{self.outlet()}</Layout>
  },
  'protectedRoute'
);

import { reatomRoute } from '@reatom/core';

import { router } from '.';
import { isAuthenticated } from '../user.model';

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
      return {};
    },

    layout: true,
    render: (self) => <>{self.outlet()}</>
  },
  'protectedRoute'
);

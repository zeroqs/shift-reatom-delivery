import { Login } from '@/pages';

import { rootRoute } from './internal';

export const loginRoute = rootRoute.reatomRoute({
  path: 'login',
  render: () => <Login />
});

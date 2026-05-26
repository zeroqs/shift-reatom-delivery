import { homeRoute, loginConfirmRoute, loginRoute } from './featureRoutes';
import { rootRoute } from './internal';

export const router = {
  root: rootRoute,
  login: loginRoute,
  loginConfirm: loginConfirmRoute,
  home: homeRoute
};

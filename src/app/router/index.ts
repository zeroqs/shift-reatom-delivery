import {
  applicationSentRoute,
  deliveryFormStepsRoute,
  historyOrderRoute,
  historyRoute,
  homeRoute,
  loginConfirmRoute,
  loginRoute,
  profileRoute
} from './featureRoutes';
import { rootRoute } from './internal';

export const router = {
  root: rootRoute,
  login: loginRoute,
  loginConfirm: loginConfirmRoute,
  home: homeRoute,
  profile: profileRoute,
  deliveryFormStep: deliveryFormStepsRoute,
  applicationSent: applicationSentRoute,
  history: historyRoute,
  historyOrder: historyOrderRoute
};

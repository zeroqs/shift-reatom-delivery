import { lazy } from 'react';

export const PhoneLoginPage = lazy(() =>
  import('./(auth)/Phone/Phone').then((module) => ({ default: module.Phone }))
);
export const CodeConfirmPage = lazy(() =>
  import('./(auth)/Code/Code').then((module) => ({ default: module.Code }))
);
export const Home = lazy(() => import('./Home/Home').then((module) => ({ default: module.Home })));
export const Profile = lazy(() =>
  import('./Profile/Profile').then((module) => ({ default: module.Profile }))
);
export const Wizard = lazy(() =>
  import('./(delivery-steps)/Wizard').then((module) => ({ default: module.Wizard }))
);
export const ApplicationSent = lazy(() =>
  import('./ApplicationSent/ApplicationSent').then((module) => ({
    default: module.ApplicationSent
  }))
);
export const History = lazy(() =>
  import('./History/History').then((module) => ({ default: module.History }))
);

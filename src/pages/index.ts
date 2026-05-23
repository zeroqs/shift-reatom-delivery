import { lazy } from 'react';

export const Login = lazy(() =>
  import('./Login/Login').then((module) => ({ default: module.Login }))
);

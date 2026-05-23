import { reatomRoute } from '@reatom/core';

export const rootRoute = reatomRoute(
  {
    layout: true,
    render: (self) => <>{self.outlet()}</>
  },
  'routes.root'
);

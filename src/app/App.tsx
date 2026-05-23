import { reatomComponent } from '@reatom/react';

import { router } from './router';

export const App = reatomComponent(() => {
  const routes = router.root.render();

  return <>{routes}</>;
});

import m from 'mithril';

import layout from './components/layout';

m.route(
  document.body,
  '/',
  {
    '/': layout,
  }
);

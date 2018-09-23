import m from 'mithril';

import styles from '../css/layout.css';

import header from './header';
import main from './main';
import footer from './footer';

const layout = {
  view: (vnode) => {
    return [m(header), m(main), m(footer)];
  },
};

export default layout;

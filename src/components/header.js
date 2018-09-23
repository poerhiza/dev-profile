import m from 'mithril';

import styles from '../css/header.css';

import wordcloud from './wordcloud';

const header = {
  view: () => {
    return m('div.header', [m(wordcloud)]);
  },
};

export default header;

import m from 'mithril';

import dialogPolyfill from 'dialog-polyfill';

import '../css/dialog.css';

const dialog = {
  view: (vnode) => {
    return [
      m('button', {class: 'mdl-button mdl-button--raised mdl-js-button dialog-button', onclick: function(evt) {
        console.log('you clicked me', this, evt);
        let dialog = evt.target.parentElement.lastChild;

        if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        evt.redraw = false;
      }}, vnode.attrs.bt),
      m('dialog', {
        class: 'mdl-dialog',
        style: 'top: 20px;',
      },
      [
        m('h3', {class: 'mdl-dialog__title'}, vnode.attrs.title),
        m('div', {class: 'mdl-dialog__content'}, [
          m('p', {}, 'this is an example dialg this ia pita to setup and use'),
        ]),
        m('div', {class: 'mdl-dialog__actions'}, [
          m('button', {class: 'mdl-button', type:'button', onclick: function(evt) {
            let dialog = evt.target.parentElement.parentElement;
            dialog.close();
            evt.redraw = false;
          }}, 'close'),
        ]),
      ]
      ),
    ];
  },
};

export default dialog;

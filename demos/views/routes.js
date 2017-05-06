import Home from './Home';
import Cell from './Cell';
import Button from './Button';
import Toast from './Toast';
import Dialog from './Dialog';

export default [
  { path: '', component: Home },
  { path: '/cell', component: Cell },
  { path: '/button', component: Button },
  { path: '/toast', component: Toast },
  { path: '/dialog', component: Dialog },

  { path: '*', component: { template: '<p>Page not found</p>' } }
];

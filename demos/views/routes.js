import Home from './Home';
import Cell from './Cell';
import Button from './Button';
import Toast from './Toast';
import Dialog from './Dialog';
import ActionSheet from './ActionSheet';

export default [
  { path: '', component: Home },
  { path: '/cell', component: Cell },
  { path: '/button', component: Button },
  { path: '/toast', component: Toast },
  { path: '/dialog', component: Dialog },
  { path: '/actionsheet', component: ActionSheet },

  { path: '*', component: { template: '<p>Page not found</p>' } }
];

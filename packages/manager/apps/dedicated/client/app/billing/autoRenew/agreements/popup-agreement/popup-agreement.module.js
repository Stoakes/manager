import angular from 'angular';
import 'angular-translate';
import atInternet from '@ovh-ux/ng-at-internet';
import '@ovh-ux/ng-translate-async-loader';
import '@ovh-ux/ui-kit';

import component from './popup-agreement.component';
import routing from './popup-agreement.routes';

const moduleName = 'ovhManagerBillingAutorenewActivation';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'oui',
    'pascalprecht.translate',
    'ui.router',
    atInternet,
  ])
  .config(routing)
  .component('billingAutorenewActivation', component);

export default moduleName;

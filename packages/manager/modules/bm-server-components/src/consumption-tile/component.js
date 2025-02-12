import controller from './controller';
import template from './template.html';

export default {
  bindings: {
    server: '<',
    trafficInformation: '<',
    dedicatedServer: '<',
    currentActiveLink: '<',
  },
  controller,
  template,
};

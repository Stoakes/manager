import { URLS, OPERATING_SYSTEM_ENUM } from './general-information.constants';

export default class BmServerComponentsGeneralInformationController {
  /* @ngInject */
  constructor($scope, $state, $translate, atInternet, coreConfig) {
    this.$scope = $scope;
    this.$state = $state;
    this.$translate = $translate;
    this.atInternet = atInternet;
    this.user = coreConfig.getUser();
    this.URLS = URLS;
  }

  getOperatingSystemLabel() {
    const { os } = this.server;
    if (!os || Object.values(OPERATING_SYSTEM_ENUM).includes(os)) {
      return this.$translate.instant(
        os === OPERATING_SYSTEM_ENUM.BRING_YOUR_OWN_IMAGE
          ? 'dedicated_server_dashboard_distribution_byoi'
          : 'dedicated_server_dashboard_distribution_none',
      );
    }

    return os;
  }

  openOsInstallation(type) {
    if (type === 'progress') {
      this.trackPage(`${this.trackingPrefix}::system-installation-progress`);
    } else {
      this.trackPage(`${this.trackingPrefix}::system-install`);
    }

    return this.$state.go(
      `app.dedicated-server.server.dashboard.installation-${type}`,
      {
        server: this.server,
        user: this.user,
      },
    );
  }

  canInstallOs() {
    if (this.dedicatedServer.$scope.disable.installationInProgress) {
      return false;
    }
    if (this.ola && this.ola.isConfigured()) {
      return !this.server.os;
    }
    return true;
  }

  trackPage(name) {
    this.atInternet.trackPage({
      name,
      type: 'navigation',
    });
  }
}

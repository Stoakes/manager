// ###
// main global file to include in this package in any cases (dev and prod mode).
// it allows to initialize some stuff of the library, after the component itself
// ###

import { OdsLogger } from '@ovhcloud/ods-common-core';

const logger = new OdsLogger('msc-tail-logs.global');
logger.log('init');

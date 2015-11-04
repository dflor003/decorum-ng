/// <reference path="../typings/tsd.d.ts" />

import * as Constants from './constants';
angular.module(Constants.ModuleName, []);

export {validateDirective, ValidateDirectiveController} from './validate-directive';
export {ValidationConfigService} from './validation-config';
export {validationElementDirective} from './validation-element-directive';
export {validatorDirective} from './validator-directive';


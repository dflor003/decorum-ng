import * as Constants from './constants';

let errorsTemplate = `
    <span class="help-block" ng-repeat="type in errorTypes" ng-show="msgFuncs[type] && $error[type]">
        {{msgFuncs[type]()}}
    </span>
`;

export class ValidationConfigService {
    errorsTemplate = errorsTemplate;

    constructor() {
    }
}

angular.module(Constants.ModuleName)
    .service(Constants.ValidationConfigService, () => new ValidationConfigService());
import * as Constants from './constants';

export function validatorDirective(): ng.IDirective {
    return <ng.IDirective>{
        restrict: 'A',
        controller() {
            this.validator = null;
        },
        link($scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) {
            let attrValue = attrs[Constants.ValidatorDirectiveKey];

            $scope.$watch(attrValue, (value: Object) => {
                ctrl.validator = value;
            });
        }
    };
}

angular.module(Constants.ModuleName).directive(Constants.ValidatorDirectiveKey, validatorDirective);
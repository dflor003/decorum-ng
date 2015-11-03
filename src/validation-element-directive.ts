import * as Constants from './constants';

export function validationElementDirective(): ng.IDirective {
    return <ng.IDirective>{
        restrict: 'A',
        scope: {
            errorCss: '@onErrorCss',
            validCss: '@onValidCss',
        },
        controller() {
            this.valid = false;
            this.invalid = false;
            this.pristine = true;
        },
        link($scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) {
            var errorCss = $scope['errorCss'],
                validCss = $scope['validCss'];

            if (errorCss) {
                $scope.$watch(
                    () => !ctrl.pristine && ctrl.invalid,
                    val => element.toggleClass(errorCss, val));
            }

            if (validCss) {
                $scope.$watch(
                    () => !ctrl.pristine && ctrl.valid,
                    val => element.toggleClass(validCss, val));
            }
        }
    };
}


angular.module(Constants.ModuleName).directive(Constants.ValidationElementDirectiveKey, validationElementDirective);

import * as Constants from './constants';
import {ValidationConfigService} from './validation-config';


export class ValidateDirectiveController {
    constructor() {
    }

    getMessage(type: string) {
    }
}

export function validateDirective($compile: ng.ICompileService, decorumConfig: ValidationConfigService): ng.IDirective {
    return <ng.IDirective>{
        restrict: 'A',
        scope: {},
        controller: ValidateDirectiveController,
        controllerAs: 'ctrl',
        require: ['ngModel', `^${Constants.ValidatorDirectiveKey}`, `?^${Constants.ValidationElementDirectiveKey}`, Constants.ValidateDirectiveKey],
        link($scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrls: any[]) {
            let modelCtrl: ng.INgModelController = ctrls[0],
                validatorCtrl = ctrls[1],
                validationElementCtrl = ctrls[2],
                ctrl: ValidateDirectiveController = ctrls[3],
                fieldKey = attrs[Constants.ValidateDirectiveKey] || modelCtrl.$name,
                $validationElement = angular.element(decorumConfig.errorsTemplate);

            // Setup scope functions used in template
            $scope['msgFuncs'] = {};
            $scope['$error'] = modelCtrl.$error;
            $scope['errorTypes'] = [];
            $scope['model'] = modelCtrl;

            $compile($validationElement)($scope);
            element.siblings().last().after($validationElement);

            $scope.$watch(
                () => validatorCtrl.validator,
                validator => {
                    if (!validator) {
                        return;
                    }

                    var fieldOptions = validator.getValidationOptions(fieldKey);
                    if (!fieldOptions) {
                        return;
                    }

                    let validators = fieldOptions.getValidators(),
                        fieldName = fieldOptions.getFieldName();
                    validators.forEach(validationObj => {
                        let key = validationObj.getKey();
                        modelCtrl.$validators[key] = (modelValue: any,  viewValue: any) => validationObj.isValid(viewValue, validator.model);
                        if (!validationObj.allowPristine()) {
                            modelCtrl.$setValidity(key,  false);
                        }
                        $scope['msgFuncs'][key] = () => validationObj.getCustomMessage() || validationObj.getMessage(fieldName, modelCtrl.$viewValue);
                        $scope['errorTypes'].push(key);
                    });
                });

            if (validationElementCtrl) {
                $scope.$watch(() => modelCtrl.$pristine, val => validationElementCtrl.pristine = val);
                $scope.$watch(() => modelCtrl.$valid, val => validationElementCtrl.valid = val);
                $scope.$watch(() => modelCtrl.$invalid, val => validationElementCtrl.invalid = val);
            }
        }
    };
}

angular.module(Constants.ModuleName).directive(Constants.ValidateDirectiveKey, validateDirective);
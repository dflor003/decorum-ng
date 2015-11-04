/*!
 * decorum-ng - 0.2.0-alpha
 *
 * AngularJS directives for use with the Decorum decorator validation library
 *
 * Copyright 2015 Danil Flores
 *
 * @version v0.2.0-alpha
 * @link https://github.com/dflor003/decorum-ng
 * @license MIT
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.decorum = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.ModuleName = 'decorum';
exports.ValidatorDirectiveKey = 'decValidator';
exports.ValidateDirectiveKey = 'decValidate';
exports.ValidationElementDirectiveKey = 'decValidationElement';
exports.ValidationConfigService = 'decorumConfig';
},{}],2:[function(require,module,exports){
var Constants = require('./constants');
var ValidateDirectiveController = (function () {
    function ValidateDirectiveController() {
    }
    ValidateDirectiveController.prototype.getMessage = function (type) {
    };
    return ValidateDirectiveController;
})();
exports.ValidateDirectiveController = ValidateDirectiveController;
function validateDirective($compile, decorumConfig) {
    return {
        restrict: 'A',
        scope: {},
        controller: ValidateDirectiveController,
        controllerAs: 'ctrl',
        require: ['ngModel', ("^" + Constants.ValidatorDirectiveKey), ("?^" + Constants.ValidationElementDirectiveKey), Constants.ValidateDirectiveKey],
        link: function ($scope, element, attrs, ctrls) {
            var modelCtrl = ctrls[0], validatorCtrl = ctrls[1], validationElementCtrl = ctrls[2], ctrl = ctrls[3], fieldKey = attrs[Constants.ValidateDirectiveKey] || modelCtrl.$name, $validationElement = angular.element(decorumConfig.errorsTemplate);
            // Setup scope functions used in template
            $scope['msgFuncs'] = {};
            $scope['$error'] = modelCtrl.$error;
            $scope['errorTypes'] = [];
            $scope['model'] = modelCtrl;
            $compile($validationElement)($scope);
            element.siblings().last().after($validationElement);
            $scope.$watch(function () { return validatorCtrl.validator; }, function (validator) {
                if (!validator) {
                    return;
                }
                var fieldOptions = validator.getValidationOptions(fieldKey);
                if (!fieldOptions) {
                    return;
                }
                var validators = fieldOptions.getValidators(), fieldName = fieldOptions.getFieldName();
                validators.forEach(function (validationObj) {
                    var key = validationObj.getKey();
                    modelCtrl.$validators[key] = function (modelValue, viewValue) { return validationObj.isValid(viewValue, validator.model); };
                    if (!validationObj.allowPristine()) {
                        modelCtrl.$setValidity(key, false);
                    }
                    $scope['msgFuncs'][key] = function () { return validationObj.getCustomMessage() || validationObj.getMessage(fieldName, modelCtrl.$viewValue); };
                    $scope['errorTypes'].push(key);
                });
            });
            if (validationElementCtrl) {
                $scope.$watch(function () { return modelCtrl.$pristine; }, function (val) { return validationElementCtrl.pristine = val; });
                $scope.$watch(function () { return modelCtrl.$valid; }, function (val) { return validationElementCtrl.valid = val; });
                $scope.$watch(function () { return modelCtrl.$invalid; }, function (val) { return validationElementCtrl.invalid = val; });
            }
        }
    };
}
exports.validateDirective = validateDirective;
angular.module(Constants.ModuleName).directive(Constants.ValidateDirectiveKey, validateDirective);
},{"./constants":1}],3:[function(require,module,exports){
var Constants = require('./constants');
var errorsTemplate = "\n    <span class=\"help-block\" ng-repeat=\"type in errorTypes\" ng-show=\"msgFuncs[type] && $error[type]\">\n        {{msgFuncs[type]()}}\n    </span>\n";
var ValidationConfigService = (function () {
    function ValidationConfigService() {
        this.errorsTemplate = errorsTemplate;
    }
    return ValidationConfigService;
})();
exports.ValidationConfigService = ValidationConfigService;
angular.module(Constants.ModuleName)
    .service(Constants.ValidationConfigService, function () { return new ValidationConfigService(); });
},{"./constants":1}],4:[function(require,module,exports){
var Constants = require('./constants');
function validationElementDirective() {
    return {
        restrict: 'A',
        scope: {
            errorCss: '@onErrorCss',
            validCss: '@onValidCss',
        },
        controller: function () {
            this.valid = false;
            this.invalid = false;
            this.pristine = true;
        },
        link: function ($scope, element, attrs, ctrl) {
            var errorCss = $scope['errorCss'], validCss = $scope['validCss'];
            if (errorCss) {
                $scope.$watch(function () { return !ctrl.pristine && ctrl.invalid; }, function (val) { return element.toggleClass(errorCss, val); });
            }
            if (validCss) {
                $scope.$watch(function () { return !ctrl.pristine && ctrl.valid; }, function (val) { return element.toggleClass(validCss, val); });
            }
        }
    };
}
exports.validationElementDirective = validationElementDirective;
angular.module(Constants.ModuleName).directive(Constants.ValidationElementDirectiveKey, validationElementDirective);
},{"./constants":1}],5:[function(require,module,exports){
var Constants = require('./constants');
function validatorDirective() {
    return {
        restrict: 'A',
        controller: function () {
            this.validator = null;
        },
        link: function ($scope, element, attrs, ctrl) {
            var attrValue = attrs[Constants.ValidatorDirectiveKey];
            $scope.$watch(attrValue, function (value) {
                ctrl.validator = value;
            });
        }
    };
}
exports.validatorDirective = validatorDirective;
angular.module(Constants.ModuleName).directive(Constants.ValidatorDirectiveKey, validatorDirective);
},{"./constants":1}],6:[function(require,module,exports){
/// <reference path="../typings/tsd.d.ts" />
var Constants = require('./constants');
angular.module(Constants.ModuleName, []);
var validate_directive_1 = require('./validate-directive');
exports.validateDirective = validate_directive_1.validateDirective;
exports.ValidateDirectiveController = validate_directive_1.ValidateDirectiveController;
var validation_config_1 = require('./validation-config');
exports.ValidationConfigService = validation_config_1.ValidationConfigService;
var validation_element_directive_1 = require('./validation-element-directive');
exports.validationElementDirective = validation_element_directive_1.validationElementDirective;
var validator_directive_1 = require('./validator-directive');
exports.validatorDirective = validator_directive_1.validatorDirective;
},{"./constants":1,"./validate-directive":2,"./validation-config":3,"./validation-element-directive":4,"./validator-directive":5}]},{},[6])(6)
});
//# sourceMappingURL=decorum-ng.js.map

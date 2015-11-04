namespace app.registration {
    export class RegistrationController {
        model = new RegistrationModel();

        constructor() {
        }
    }

    angular.module('app').controller('registrationCtrl', RegistrationController);
}
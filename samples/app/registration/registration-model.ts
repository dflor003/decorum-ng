namespace app.registration {
    import Required = decorum.Required;
    import Pattern = decorum.Pattern;
    import Email = decorum.Email;
    import FieldName = decorum.FieldName;
    import MaxLength = decorum.MaxLength;
    import MinLength = decorum.MinLength;
    import Length = decorum.Length;
    import Alpha = decorum.Alpha;
    import AlphaNumeric = decorum.AlphaNumeric;
    import Validation = decorum.Validation;

    export class RegistrationModel {

        @FieldName('User name')
        @Required()
        @MaxLength(50)
        username = '';

        @FieldName('Email address')
        @Required()
        @Email()
        email = '';

        @FieldName('Password')
        @MinLength(6)
        @MaxLength(30)
        password = '';

        @FieldName('Confirm password')
        @Validation(
            'Passwords must match',
            (value: string, model: RegistrationModel) => value === model.password
        )
        confirmPassword = '';

        constructor() {
        }
    }
}
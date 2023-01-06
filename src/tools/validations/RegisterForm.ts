import validator from 'validator'

export const validateRegisterForm = (e:HTMLInputElement, value2? : string) : string | null => {

    switch(e.name){

        case "name":
        case "last_name":
            if(!e.value){
                return "This input is required to be filled"
            }
            break

        case "user_name":
            if(e.value.length < 5){
                return "User Name must have a least 5 characters"
            }
            break

        case "phone":
            if(e.value && !validator.isMobilePhone(e.value)){
                return "This phone number is not valid"
            }
            break

        case "email":
            if(!validator.isEmail(e.value)){
                return "This is not a valid email"
            }
            break

        case "password":
            if(e.value.length < 7){
                return "Password must have a least 7 characters"
            }
            break

        case "password2":
            if(e.value !== value2){
                return "Passwords must be equal."
            }
            break

        default:
            return null
    }
    return null
}
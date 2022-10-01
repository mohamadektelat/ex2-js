
//Validator
let validator = (function(){
    let validate = {};

    //------------------------------------------------------------------------------------------------------------------
    //That function checks if the input is empty.
    validate.isEmpty = function(desc){
        return desc === '' || desc == null;
    }
    //------------------------------------------------------------------------------------------------------------------
    //That function checks if the input is already exists.
    validate.alreadyExists = function(desc){
        for(const item of todo_list){
            if(item.getTitle() === desc) {
                return true;
            }
        }
        return false;
    }
    return validate;

})();

//----------------------------------------------------------------------------------------------------------------------
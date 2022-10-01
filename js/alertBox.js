//Alert box
let alertBox = (function () {

    let alert = {};

    //------------------------------------------------------------------------------------------------------------------
    //That function hides the alert box if it is already on
    alert.hide = function(){
        if(!document.getElementById('alert_box').classList.contains('d-none'))
        {
            document.getElementById('alert_box').classList.add('d-none');
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    //That function shows alert box
    alert.show = function(str){
        document.getElementById('alert_box').innerHTML = str;
        document.getElementById('alert_box').classList.remove('d-none');
    }

    return alert;

})();

//----------------------------------------------------------------------------------------------------------------------
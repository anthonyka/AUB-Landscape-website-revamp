window.onload = function () {
    let form = getID("contactForm");
    form.addEventListener("submit", event => {
        event.preventDefault();
        if(getAction()==true){
            form.submit();
        }
    })
}

function getID(id) {
    return document.getElementById(id);
}

function getAction() {
    var v = grecaptcha.getResponse();
    if(v.length == 0)
    {
        document.getElementById('captcha').innerHTML="You can't leave Captcha Code empty";
        return false;
    }
    return true;
}
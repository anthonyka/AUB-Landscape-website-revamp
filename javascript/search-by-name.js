var arr=getPlants();

function $(id){
    return document.getElementById(id);
}
window.onload = () =>{
    getPlants();    
    $("CommonName").addEventListener("keyup",ShowCommonResults);

}

function getPlants() {
        return fetch('../json/plants3.json')
        .then(response => response.json())
        .then(function (json) {
            let plants = json.plants;
        })
}

function ShowCommonResults(){
    var typed=($("CommonName").value);
    typed= typed.toLowerCase()
    return typed;
}

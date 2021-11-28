function $(id){
    return document.getElementById(id);
}

let Common = $("CommonName")

window.onload = () =>{
    getPlants();
    var CommonInput=$("CommonName");
    //var activeTextbox = document.activeElement;
    //console.log(activeTextbox.id);
/*    if(activeTextbox.id==="CommonName"){
        console.log("focused")
    }*/
    $("CommonName").addEventListener("keyup",FilterCommonResults);        
    $("ScientificName").addEventListener("keyup",FilterScientificResults);
    $("submit-name").addEventListener("click", AllResults)
}

function getPlants() {
        return fetch('../json/plants3.json')
        .then(response => response.json())
        .then(function (json) {
            return json;
        })
}

function FilterCommonResults(json){
    fetch("../json/plants3.json")
    .then(res => res.json())
    .then(data => {
        var foundCommon=[];
        var typed=($("CommonName").value);
        
        typed= typed.toLowerCase()
        //console.log(typed);
        let narrowedData = data.plants.forEach(name => {
            let common = name["Common-name"].toLowerCase()
            var common_nocomma=common.replace(",","");
            var typed_fixedspacing=typed.replace("/\s/", '');
            console.log(typed_fixedspacing);
            //console.log(common_nocomma);
            //console.log(common.substring(typed));
            let words = common.split(" ");
            if (typed == "" ||typed==" ") {
                return null;
            }
            for (let i = 0; i < words.length; i++) {
                if (common.indexOf(typed)!==-1||common_nocomma.indexOf(typed)!==-1||common.indexOf(typed_fixedspacing)!==-1){
                    foundCommon.push(common);
                    break;
                }
            }
        });
        if(foundCommon!=[]){
            DisplayCommonResults(foundCommon)
        }         
    })
}
function DisplayCommonResults(foundCommon){
    $("Common-results").innerHTML="";
    for(var i=0;i<foundCommon.length;i++){
        if(i>10){
            break;
        }
        var result=document.createElement("li");
        result.className="commonResult"
        $("Common-results").appendChild(result);
        var linkresult=document.createElement("a"); 
        linkresult.innerHTML=foundCommon[i];
        result.appendChild(linkresult);
    }
}



function FilterScientificResults(json){
    fetch("../json/plants3.json")
    .then(res => res.json())
    .then(data => {
        var foundScientific=[];
        var typed=($("ScientificName").value);
        typed= typed.toLowerCase()
        console.log(typed);
        let narrowedData = data.plants.forEach(name => {
            let scientific = name["Scientific-name"].toLowerCase()
            var scientific_nocomma=scientific.replace(",","");
            console.log(scientific_nocomma);
            let words = scientific.split(" ");
            if (typed == "") {
                return null;
            } 
            for (let i = 0; i < words.length; i++) {
                if (scientific.indexOf(typed)!==-1||scientific_nocomma.indexOf(typed)!==-1){
                    foundScientific.push(scientific);
                    break;
                }
            }
        });
        if(foundScientific!=[]){
            DisplayScientificResults(foundScientific)
        }         
    })
}
function DisplayScientificResults(foundScientific){
    $("Scientific-results").innerHTML="";
    for(var i=0;i<foundScientific.length;i++){
        if(i>10){
            break;
        }
        var result=document.createElement("li");
        result.className="scientificResult"
        $("Scientific-results").appendChild(result);
        var linkresult=document.createElement("a"); 
        linkresult.innerHTML=foundScientific[i];
        result.appendChild(linkresult);
    }
}

function AllResults(){
    console.log("test");
    //document.getElementsByClassName("main").style.visibility = "hidden";
    
    var result=document.getElementsByClassName("result");
    
}
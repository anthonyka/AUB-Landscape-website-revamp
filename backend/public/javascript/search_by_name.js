window.onload = function () {
    getCollections();
    let CommonsearchBar = getID("CommonsearchBar");
    CommonsearchBar.addEventListener("keyup", ShowCommon);
    let ScientificsearchBar = getID("ScientificsearchBar");
    ScientificsearchBar.addEventListener("keyup",ShowScientific)
}
function getCollections() {
    fetch('/allplants?type=all')
        .then(response => response.json())
        .then(function (json) {
            let collection = json;
            PopulateCommon(collection)
            PopulateScientific(collection)
        })
}

function PopulateCommon(collection){
    var CommonSection= getID("Common-results");
    for(var i=0;i<collection.length;i++){
        var plant=collection[i];
        var CommonNamediv= document.createElement("div");
        CommonNamediv.className="answer";
        CommonNamediv.style.display="none";
        var Commontxt=document.createElement("a");
        Commontxt.innerText=plant.CommonEnglishName;
        CommonNamediv.appendChild(Commontxt)
        CommonSection.appendChild(CommonNamediv)
    }
}
function ShowCommon(){
    var CommonNameSection=getID("CommonNameSection")
    var CommonsearchBarValue=getID("CommonsearchBar").value;
    var answer=CommonNameSection.getElementsByClassName("answer");
    for(var i=0;i<answer.length;i++){
        answer[i].style.display="none"
    }
    if(CommonsearchBarValue==""){
        return
    }
    var max_length=0;
        for(var i=0;i<answer.length;i++){
            //remove commas
            var answerUpdated=(answer[i].innerText).replaceAll(",","") 
            CommonsearchBarValue=CommonsearchBarValue.replaceAll(",","")
            //remove excess space at the begining and end
            CommonsearchBarValue=CommonsearchBarValue.trim();
            //remove excess whitespace in between words
            CommonsearchBarValue=CommonsearchBarValue.replaceAll(/\s+/g," ")
            if(max_length==8){
                return;
            }
            if ((answerUpdated.toLowerCase()).indexOf(CommonsearchBarValue.toLowerCase())!==-1){
                answer[i].style.display="block";
                 max_length++;
            }
    }
}

/*Scientific */
function PopulateScientific(collection){
    var ScientificSection= getID("Scientific-results");
    for(var i=0;i<collection.length;i++){
        var plant=collection[i];
        var ScientificNamediv= document.createElement("div");
        ScientificNamediv.className="answer";
        ScientificNamediv.style.display="none";
        var Scientifictxt=document.createElement("a");
        Scientifictxt.innerText=plant.ScientificName;
        ScientificNamediv.appendChild(Scientifictxt)
        ScientificSection.appendChild(ScientificNamediv)
    }
}
function ShowScientific(){
    var ScientificNameSection=getID("ScientificNameSection")
    var ScientificsearchBarValue=getID("ScientificsearchBar").value;
    var answer=ScientificNameSection.getElementsByClassName("answer");
    for(var i=0;i<answer.length;i++){
        answer[i].style.display="none"
    }
    if(ScientificsearchBarValue==""){
        return
    }
    var max_length=0;
        for(var i=0;i<answer.length;i++){
            //remove commas
            var answerUpdated=(answer[i].innerText).replaceAll(",","") 
            ScientificsearchBarValue=ScientificsearchBarValue.replaceAll(",","")
            //remove excess space at the begining and end
            ScientificsearchBarValue=ScientificsearchBarValue.trim();
            //remove excess whitespace in between words
            ScientificsearchBarValue=ScientificsearchBarValue.replaceAll(/\s+/g," ")
            if(max_length==8){
                return;
            }
            if ((answerUpdated.toLowerCase()).indexOf(ScientificsearchBarValue.toLowerCase())!==-1){
                answer[i].style.display="block";
                max_length++;
            }
    }
}


function getID(id) {
    return document.getElementById(id);
}
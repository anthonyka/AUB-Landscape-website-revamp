window.onload = function () {
    getCollections();
    let CommonsearchBar = getID("CommonsearchBar");
    CommonsearchBar.addEventListener("keyup", ShowCommon)
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
        CommonNamediv.innerText=plant.CommonEnglishName;
        CommonNamediv.style.cursor = "pointer";
        CommonSection.appendChild(CommonNamediv)
        CommonNamediv.addEventListener("click",function(e){
            let CommonsearchBar = getID("CommonsearchBar");
            CommonsearchBar.value=e.target.innerText;
            ShowCommon();
            var answer=CommonSection.getElementsByClassName("answer");
            for(var i=0;i<answer.length;i++){
                answer[i].style.display="none"
            }
        })
    }
}
function ShowCommon(){
    var CommonNameSection=getID("CommonNameSection")
    var CommonsearchBarValue=getID("CommonsearchBar").value;
    var answer=CommonNameSection.getElementsByClassName("answer");
    for(var i=0;i<answer.length;i++){
        answer[i].style.display="none"
    }
    
    var max_length=0;
        for(var i=0;i<answer.length;i++){
            //remove commas
            var answerUpdated=(answer[i].innerText).replaceAll(",","") ;
            answerUpdated=answerUpdated.replaceAll("\'","");
            CommonsearchBarValue=CommonsearchBarValue.replaceAll(",","");
            CommonsearchBarValue=CommonsearchBarValue.replaceAll("\'","");
            //remove excess space at the begining and end
            CommonsearchBarValue=CommonsearchBarValue.trim();
            //remove excess whitespace in between words
            CommonsearchBarValue=CommonsearchBarValue.replaceAll(/\s+/g," ")

            var answerUpdatedarr=answerUpdated.split(" ");
            var firstletter=new Array(answerUpdatedarr.length)
            var lengthString=0;
            for(var j=0;j<answerUpdatedarr.length;j++){
                firstletter[j]=lengthString
                lengthString+=(answerUpdatedarr[j]).length
                lengthString++
            }
            lengthString-=1
            /*console.log(answerUpdated)
            console.log(lengthString)
            console.log(answerUpdated.length)*/
            //console.log(firstletter);
            if(CommonsearchBarValue==""){
                return;
            }
            var display=false;
            for(var j=0;j<firstletter.length;j++){
                var startindex=(answerUpdated.toLowerCase()).search(CommonsearchBarValue.toLowerCase());
                //console.log(startindex);
                /*if(startindex==-1){
                    continue plants;
                }*/
                if(firstletter[j]==startindex){
                    display=true
                    continue;
                }else{
                    var startindex2=(answerUpdated.toLowerCase()).search((" "+CommonsearchBarValue).toLowerCase())
                    console.log(startindex2)
                    firstletter.splice(0,1)
                    if(startindex2+1==firstletter[j]){
                        display=true;
                        continue;
                    }
                }
            }
            console.log(answerUpdated)
            console.log(display)

            if(max_length==8|| CommonsearchBarValue==""){
                return;
            }

            if (display==true){
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
        ScientificNamediv.innerText=plant.ScientificName;
        ScientificNamediv.style.cursor = "pointer";
        ScientificSection.appendChild(ScientificNamediv)
        ScientificNamediv.addEventListener("click",function(e){
            let ScientificsearchBar = getID("ScientificsearchBar");
            ScientificsearchBar.value=e.target.innerText;
            ShowScientific();
            var answer=ScientificNameSection.getElementsByClassName("answer");
            for(var i=0;i<answer.length;i++){
                answer[i].style.display="none"
            }
        })
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
            var answerUpdated=(answer[i].innerText).replaceAll(",","") ;
            answerUpdated=answerUpdated.replaceAll("\'","");
            ScientificsearchBarValue=ScientificsearchBarValue.replaceAll(",","");
            ScientificsearchBarValue=ScientificsearchBarValue.replaceAll("\'","");
            //remove excess space at the begining and end
            ScientificsearchBarValue=ScientificsearchBarValue.trim();
            //remove excess whitespace in between words
            ScientificsearchBarValue=ScientificsearchBarValue.replaceAll(/\s+/g," ")

            var answerUpdatedarr=answerUpdated.split(" ");
            var firstletter=new Array(answerUpdatedarr.length)
            var lengthString=0;
            for(var j=0;j<answerUpdatedarr.length;j++){
                firstletter[j]=lengthString
                lengthString+=(answerUpdatedarr[j]).length
                lengthString++
            }
            lengthString-=1
            /*console.log(answerUpdated)
            console.log(lengthString)
            console.log(answerUpdated.length)*/
            //console.log(firstletter);
            if(ScientificsearchBarValue==""){
                return;
            }
            var display=false;
            for(var j=0;j<firstletter.length;j++){
                var startindex=(answerUpdated.toLowerCase()).search(ScientificsearchBarValue.toLowerCase());
                //console.log(startindex);
                /*if(startindex==-1){
                    continue plants;
                }*/
                if(firstletter[j]==startindex){
                    display=true
                    continue;
                }else{
                    var startindex2=(answerUpdated.toLowerCase()).search((" "+ScientificsearchBarValue).toLowerCase())
                    console.log(startindex2)
                    firstletter.splice(0,1)
                    if(startindex2+1==firstletter[j]){
                        display=true;
                        continue;
                    }
                }
            }
            console.log(answerUpdated)
            console.log(display)

            if(max_length==8|| ScientificsearchBarValue==""){
                return;
            }

            if (display==true){
                answer[i].style.display="block";
                 max_length++;
            }
        }
}


function getID(id) {
    return document.getElementById(id);
}
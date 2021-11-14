    
    var allplants;
    var Index=0;
    window.onload= function(){
        console.log("hey");
        loadpage();
        window.onscroll = function()
        {
            
            
            
            
             var difference = document.documentElement.scrollHeight - window.innerHeight;
             var scrollposition = document.documentElement.scrollTop;
             
             if (difference - scrollposition <= 2)
             {
             
                    alert("Bottom of Page!"); 
                
             
             }
            
        
            
        }
    }


    function loadpage(){
        fetch('../json/plants.json')
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (json) {
            allplants = JSON.parse(json);
            console.log(allplants);
            for(var i=0;i<20;i++){
                document.getElementById("image_container").appendChild(createelement(allplants[i])) 
            }
        });

        

    }

function createelement(json){
    var key=json.Images[0].Key;
    var mycontainer=document.createElement("div");
    mycontainer.setAttribute("class","polaroid");
    myimage=document.createElement("div");
    myimage.style.backgroundImage="url(https://landscapeplants.aub.edu.lb"+key+")";
    myimage.setAttribute("class", "item_image");
    var name=document.createElement("p");
    var Scientificname=document.createElement("p");
    Scientificname.innerHTML=json.ScientificName;
    Scientificname.setAttribute("class", "Scientificname");
    name.innerHTML=json.CommonEnglishName;
    name.setAttribute("class", "englishname");
    mycontainer.appendChild(myimage);
    mycontainer.appendChild(Scientificname);
    mycontainer.appendChild(name);
    return mycontainer;
}




// allplants = JSON.parse(json);
// console.log(allplants);
// var key=allplants[0].Images[0].Key
// console.log(key);
// myimage=document.createElement("div");
// myimage.style.backgroundImage="url(https://landscapeplants.aub.edu.lb"+key+")";
// myimage.setAttribute("class", "item_image");
// document.getElementById("image_container").appendChild(myimage);
    
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
             
                fetch('../json/plants2.json')
                .then(function (response) {
                    console.log(response)
                    return response.json();
                })
                .then(function (json) {
                    allplants = JSON.parse(json);
                    console.log(allplants);
                    for(var i=0;i<allplants.length;i++){
                        document.getElementById("image_container").appendChild(createelement(allplants[i])) 
                    }
                });
             
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
            for(var i=0;i<12;i++){
                document.getElementById("image_container").appendChild(createelement(allplants[i])) 
            }
        });

        

    }

function createelement(json){
    var key=json.Images[0].Key;
    var mycontainer=document.createElement("div");
    mycontainer.object=json;
    mycontainer.imageIdex=0;
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

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    mycontainer.onclick = function(){
    modal.style.display = "block";
    modal.object=json;
    modal.index=0;
    modalImg.src = "https://landscapeplants.aub.edu.lb/"+this.object.Images[0].Key;
    captionText.innerHTML = this.object.CommonEnglishName;
    }
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    var right = document.getElementById("right");
    right.onclick = function() { 
    modalImg=document.getElementById("img01");
    modal=document.getElementById("myModal");
    if (modal.index<modal.object.Images.length-1){
        modal.index++;
        modalImg.src= "https://landscapeplants.aub.edu.lb/"+modal.object.Images[modal.index].Key;
        }
    }

    var left = document.getElementById("left");
    left.onclick = function() { 
        modalImg=document.getElementById("img01");
        modal=document.getElementById("myModal");
        if (modal.index>0){
            modal.index--;
            modalImg.src= "https://landscapeplants.aub.edu.lb/"+modal.object.Images[modal.index].Key;
            }
        }
    span.onclick = function() { 
    modal.style.display = "none";
    }
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


    
    var myplants="all";
    var Index=0;
    var myjson;
    mylength=0;
    //   console.log("myJson");
    //   console.log(myJson); 
    window.onload= function(){
        document.getElementById("alltypes").addEventListener("click",function() {
            myplants="all";
            Index=0;
            document.getElementById("image_container").innerHTML="";
            add_elements();
        });
        document.getElementById("cactus").addEventListener("click",function() {
            myplants="cactus";
            Index=0;
            document.getElementById("image_container").innerHTML="";
            add_elements();
        });
        document.getElementById("palm").addEventListener("click",function() {
            myplants="palm";
            Index=0;
            document.getElementById("image_container").innerHTML="";
            add_elements();
        });
        document.getElementById("lawn").addEventListener("click",function() {
            myplants="lawn";
            Index=0;
            document.getElementById("image_container").innerHTML="";
            add_elements();
        });
        document.getElementById("shrub").addEventListener("click",function() {
            myplants="shrub";
            Index=0;
            document.getElementById("image_container").innerHTML="";
            add_elements();
        });
        console.log("hey");
        add_elements();
        // alert(document.getElementById("render").value);
        document.getElementById("render").addEventListener("change",function() {
            Index=0;
            document.getElementById("image_container").innerHTML="";
            add_elements();
        });
        document.getElementById("sort").addEventListener("change",function() {
            Index=0;
            document.getElementById("image_container").innerHTML="";
            add_elements();
        });
        window.onscroll = function()
        {
            
            
            
            
             var difference = document.documentElement.scrollHeight - window.innerHeight;
             var scrollposition = document.documentElement.scrollTop;
             
             if (difference - scrollposition <= 1)
             {  if (Index<mylength){
                add_elements();
             }
             
             }
            
        
            
        }
    }


    function loadpage(){
        fetch('/plants')
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (json) {
            allplants = json;
            console.log(allplants);
            prevIndex=Index;
            while(Index<allplants.length && ((Index-prevIndex)<parseInt(document.getElementById("render").value))){
                document.getElementById("image_container").appendChild(createelement(allplants[Index]));
                Index=Index+1;
            }
            // for(var i=0;i<12;i++){
            //     document.getElementById("image_container").appendChild(createelement(allplants[i])) 
            // }
        });

        

    }
function add_elements(){
    console.log(myplants);
    fetch('/plants?type='+myplants)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (json) {
        allplants = json;
        allplants.sort(GetSortOrder(document.getElementById("sort").value));
        // alert("sorted");
        // console.log(allplants);
            var prevIndex=Index;
            mylength=allplants.length;
            while(Index<allplants.length && (Index-prevIndex<parseInt(document.getElementById("render").value))){
                document.getElementById("image_container").appendChild(createelement(allplants[Index]));
                Index++;
            }
        // else if(myplants=="cactus"){
        //     console.log("in");
        //     var prevIndex=Index;
        //     while(Index<allplants.length && (Index-prevIndex<6)){
        //         console.log("hello");
        //         if(allplants[Index].type=='cactus'){
        //             console.log("hi");
        //             console.log(allplants[Index]);
        //             document.getElementById("image_container").appendChild(createelement(allplants[Index]));
            
        //         }
        //         Index++;

        //     }
        // }
        // else if(myplants=="palm"){
        //     console.log("in");
        //     var prevIndex=Index;
        //     while(Index<allplants.length && (Index-prevIndex<6)){
        //         console.log("hello");
        //         if(allplants[Index].type=='palm'){
        //             console.log("hi");
        //             console.log(allplants[Index]);
        //             document.getElementById("image_container").appendChild(createelement(allplants[Index]));
            
        //         }
        //         Index++;

        //     }
        // }
        // else if(myplants=="lawn"){
        //     console.log("in");
        //     var prevIndex=Index;
        //     while(Index<allplants.length && (Index-prevIndex<6)){
        //         console.log("hello");
        //         if(allplants[Index].type=='lawn'){
        //             console.log("hi");
        //             console.log(allplants[Index]);
        //             document.getElementById("image_container").appendChild(createelement(allplants[Index]));
            
        //         }
        //         Index++;

        //     }
        // }
        // else if(myplants=="shrub"){
        //     console.log("in");
        //     var prevIndex=Index;
        //     while(Index<allplants.length && (Index-prevIndex<6)){
        //         console.log("hello");
        //         console.log(Index);
        //         if(allplants[Index].type=='shrub'){
        //             console.log("hi");
        //             console.log(allplants[Index]);
        //             document.getElementById("image_container").appendChild(createelement(allplants[Index]));
            
        //         }
        //         Index++;

        //     }
        // }
    });
}



function createelement(json){
    var key=json.Images[0].Key;
    var mycontainer=document.createElement("div");
    mycontainer.object=json;
    mycontainer.imageIdex=0;
    mycontainer.setAttribute("class","polaroid");
    myimage=document.createElement("div");
    myimage.object=json;
    myimage.style.backgroundImage="url(https://landscapeplants.aub.edu.lb"+key+")";
    myimage.setAttribute("class", "item_image");
    var name=document.createElement("p");
    var Scientificname=document.createElement("p");
    Scientificname.innerHTML=json.ScientificName;
    Scientificname.setAttribute("class", "Scientificname");
    name.innerHTML=json.CommonEnglishName;
    name.setAttribute("class", "englishname");
    Scientificname.onclick= function() {
        window.location.href="/Plants/PlantProfile?PlantId="+json.PlantId;};
    mycontainer.appendChild(myimage);
    mycontainer.appendChild(Scientificname);
    mycontainer.appendChild(name);

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    myimage.onclick = function(){
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


function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

// allplants = JSON.parse(json);
// console.log(allplants);
// var key=allplants[0].Images[0].Key
// console.log(key);
// myimage=document.createElement("div");
// myimage.style.backgroundImage="url(https://landscapeplants.aub.edu.lb"+key+")";
// myimage.setAttribute("class", "item_image");
// document.getElementById("image_container").appendChild(myimage);


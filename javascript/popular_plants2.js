    
    var allplants;
    var Index=0;
    window.onload= function(){
        const queryString = window.location.search;
        // console.log(queryString); 
        // console.log(queryString);
        // console.log("hey");
        loadpage();
        window.onscroll = function()
        {
            
            
            
            
            //  var difference = document.documentElement.scrollHeight - window.innerHeight;
            //  var scrollposition = document.documentElement.scrollTop;
             
            //  if (difference - scrollposition <= 2)
            //  {
             
            //     fetch('../json/plants2.json')
            //     .then(function (response) {
            //         console.log(response)
            //         return response.json();
            //     })
            //     .then(function (json) {
            //         allplants = JSON.parse(json);
            //         console.log(allplants);
            //         for(var i=0;i<allplants.length;i++){
            //             document.getElementById("image_container").appendChild(createelement(allplants[i])) 
            //         }
            //     });
             
            //  }
            
        
            
        }
    }


    function loadpage(){
        fetch('../json/plant_info.json')
        .then(function (response) {
            // console.log("hey");
            // console.log(response);
            return response.json();
        })
        .then(function (json) {
            categories = json;
            // console.log(categories);
            for(var i=0;i<categories.length;i++){
                // console.log(categories[i]);
                document.getElementById("image_container").appendChild(createelement(categories[i])) 
            }
        });

        

    }

function createelement(json){
    var key="https://landscapeplants.aub.edu.lb"+json.Images[0].Key;
    alert(key)
    var mycontainer=document.createElement("div");
    mycontainer.setAttribute("class","section");
    myimage=document.createElement("img");
    myimage.src=key;
    myimage.setAttribute("class", "item_image");
    var name=document.createElement("p");
    var Ssecond_name=document.createElement("span");
    Ssecond_name.innerHTML=json.CommonEnglishName;
    Ssecond_name.setAttribute("class", "englishname");
    name.innerHTML=json.ScientificName;
    name.setAttribute("class", "Scientificname");
    name.appendChild(Ssecond_name);
    mycontainer.appendChild(myimage);
    mycontainer.appendChild(name);
    var type_image=document.createElement("img");
    type_image.setAttribute("class", "category_image");
    var type=json.type;
    if (type=="shrub"){
        type_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/Shrub.png";
        type_image.title=type;
    }
    else if(type=="Ground cover"){
        type_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/Groundcover.png";
        type_image.title=type;
    }
    mycontainer.appendChild(type_image);
    var height_image=document.createElement("img");
    height_image.setAttribute("class", "category_image");
    height_image.src="https://landscapeplants.aub.edu.lb/images/iconHeight.png";
    height_image.title=json.height;
    mycontainer.appendChild(height_image);
    var width_image=document.createElement("img");
    width_image.setAttribute("class", "category_image");
    width_image.src="https://landscapeplants.aub.edu.lb/images/iconSpread.png";
    width_image.title=json.width;
    mycontainer.appendChild(width_image);
    var shape=json.shape;
    if(shape=="spreading"){
        var shape_image=document.createElement("img");
        shape_image.setAttribute("class", "category_image");
        shape_image.src="https://landscapeplants.aub.edu.lb/Images/search/plant/Multiple.png";
        shape_image.title=json.shape;
        mycontainer.appendChild(shape_image); 
    }
    
    else if(shape=="upright"){
        var shape_image=document.createElement("img");
        shape_image.setAttribute("class", "category_image");
        shape_image.src="https://landscapeplants.aub.edu.lb/Images/search/plant/Upright.png";
        shape_image.title=json.shape;
        mycontainer.appendChild(shape_image); 
        
    }
    var growth_rate_image=document.createElement("img");
    growth_rate_image.setAttribute("class", "category_image");
    growth_rate_image.src="https://landscapeplants.aub.edu.lb/images/iconGrowth.png";
    growth_rate_image.title=json.growth_rate;
    mycontainer.appendChild(growth_rate_image);
    var flower_color=json.flower_color;
    if(flower_color!="none"){
        var flower_color_image=document.createElement("img");
        flower_color_image.setAttribute("class", "category_image");
        flower_color_image.src="https://landscapeplants.aub.edu.lb/images/Flower_colored.jpg";
        flower_color_image.title=json.flower_color;
        mycontainer.appendChild(flower_color_image); 
    }
    var fruit_color=json.fruit_color;
    if(fruit_color!="none"){
        var fruit_color_image=document.createElement("img");
        fruit_color_image.setAttribute("class", "category_image");
        fruit_color_image.src="https://landscapeplants.aub.edu.lb/images/Fruit_colored.jpg";
        fruit_color_image.title=json.fruit_color;
        mycontainer.appendChild(fruit_color_image); 
    }
    var fragrant=json.fragrant;
    if(fragrant=="yes"){
        var fragrant_image=document.createElement("img");
        fragrant_image.setAttribute("class", "category_image");
        fragrant_image.src="https://landscapeplants.aub.edu.lb/images/iconFragant.png";
        fragrant_image.title="fragrant";
        mycontainer.appendChild(fragrant_image); 
    }
    var edible=json.edible;
    if(edible=="yes"){
        var edible_image=document.createElement("img");
        edible_image.setAttribute("class", "category_image");
        edible_image.src="https://landscapeplants.aub.edu.lb/images/iconEdible.png";
        edible_image.title="edible";
        mycontainer.appendChild(edible_image); 
    }
    var full_light=json.full_light;
    if(full_light=="yes"){
        var full_light_image=document.createElement("img");
        full_light_image.setAttribute("class", "category_image");
        full_light_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/full.png";
        full_light_image.title="Full light";
        mycontainer.appendChild(full_light_image); 
    }
    var partial_light=json.partial_light;
    if(partial_light=="yes"){
        var partial_light_image=document.createElement("img");
        partial_light_image.setAttribute("class", "category_image");
        partial_light_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/part.png";
        partial_light_image.title="Partial light";
        mycontainer.appendChild(partial_light_image); 
    }
    var shade=json.shade;
    if(shade=="yes"){
        var shade_image=document.createElement("img");
        shade_image.setAttribute("class", "category_image");
        shade_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/shade.png";
        shade_image.title="Shade";
        mycontainer.appendChild(shade_image); 
    }
    var water=json.water;
    var water_image=document.createElement("img");
    water_image.setAttribute("class", "category_image");
    if(water=="low water"){
        water_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/water-low.png";
        water_image.title="low water";
       
    }
    else if(water=="moderate water"){
        water_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/moderate.png";
        water_image.title="moderate water";
    }
    else if (water=="high water"){
        water_image.src="https://landscapeplants.aub.edu.lb/images/Search/Plant/water-high.png";
        water_image.title="high water";
    }
    mycontainer.appendChild(water_image); 
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


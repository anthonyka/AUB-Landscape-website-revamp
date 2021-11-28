window.onload = function () {
    hideAndUnhide();
    initializeTooltips();
    getCollections();

    let editField = getID("editField");
    editField.addEventListener("click",sendEditedFields)

    let addField = getID("addField");
    addField.addEventListener("click",sendAddedFields)
}


//----------------DOM-----------------//
function gencollectionsDropDown(collections) {
    let collectionDD = getID("collection-dropdown");
    for (let index = 0; index < collections.length; index++) {
        let collection = collections[index];
        let item = createDDItemcollection(collection);
        collectionDD.appendChild(item);
    }
}
//collection
function createDDItemcollection(collection) {
    let item = document.createElement("a");
    item.classList.add("dropdown-item");
    item.setAttribute('href', "#");
    item.id = "collectionDD-" + collection.name;
    item.innerHTML = collection.name;

    item.addEventListener("click", function () {
        getID("collectionDropDownButton").innerHTML = this.text;
        getFields(collection);
    })
    return item;
}


// Hide and unhide elements
function hideAndUnhide() {
    let iconsShow = document.querySelectorAll('.fa-eye');
    for (let index = 0; index < iconsShow.length; index++) {
        iconsShow[index].addEventListener("click", toggleHide);
        iconsShow[index].style.cursor = "pointer";
    }
}

function toggleHide() {
    //case currently visible -> hide
    if (this.classList[1] == "fa-eye") {
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");

        let parent = this.parentNode.parentNode;
        parent.querySelector(".content").style.display = "none";
    } else if (this.classList[1] == "fa-eye-slash") {
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");

        let parent = this.parentNode.parentNode;
        parent.querySelector(".content").style.display = "block";
    }
}

function genFields(fields) {
    if(getID("fieldsBody").querySelectorAll("td").length>0){
        while (getID("fieldsBody").firstChild) {
            getID("fieldsBody").removeChild(getID("fieldsBody").firstChild);
        }
    }
    fields.forEach((element,index) => {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row"
        let td = document.createElement("td");
        let input = document.createElement("input");
        input.placeholder = element;
        input.disabled = true;
        th.innerHTML = index;
        td.appendChild(input);
        tr.appendChild(th);
        tr.appendChild(td);
        
        if(element!="_id"){
            let td = document.createElement("td");
            let editIcon = document.createElement("i");
            editIcon.classList.add("far");
            editIcon.classList.add("fa-edit");
            td.addEventListener("click",editField);
            td.appendChild(editIcon);
            tr.appendChild(td);
        }
        getID("fieldsBody").appendChild(tr);
    });
    getID("table-buttons").style.display="block";
}

function editField() {
    let row = this.parentNode;
    let input = row.getElementsByTagName("input")[0]
    input.removeAttribute("disabled");
}

//-------------------API-----------------------//
function getCollections() {
    fetch('/getCollections')
        .then(response => response.json())
        .then(function (json) {
            console.log(json);
            let collections = json;
            console.log(collections);
            gencollectionsDropDown(collections);
        })
}

function getFields(collection) {
    console.log(collection)
    fetch('/getFields?' + new URLSearchParams({
    collection: collection.name,
}))
        .then(response => response.json())
        .then(function (json) {
            console.log(json);
            let fields = json;
            console.log(fields);
            genFields(fields);
        })
}

function sendEditedFields() {
    let changedFields = document.querySelectorAll("input:enabled");
    let editedFields = new Object();
    editedFields.collection = document.getElementById("collectionDropDownButton").innerText;
    for (let index = 0; index < changedFields.length; index++) {
        if(changedFields[index].placeholder!=changedFields[index].value && changedFields[index].value != ""){
            let name = changedFields[index].placeholder
            editedFields[name] = changedFields[index].value;
        }
    }
    fetch("/changeFields",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedFields)
    })
    .then(response => {
        window.location.reload();
    })
    .catch(err => console.log(err));
}

function sendAddedFields() {
    let addedField = getID("addFieldText")
    let newField = new Object();
    newField.collection = document.getElementById("collectionDropDownButton").innerText;
        if(addedField.value != ""){
            newField.newField = addedField.value;
        }
    fetch("/addField",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newField)
    })
    .then(response => {
        window.location.reload();
    })
    .catch(err => console.log(err));
}

//other
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function getID(id) {
    return document.getElementById(id);
}
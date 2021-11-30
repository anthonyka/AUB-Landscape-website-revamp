window.onload = function () {
    hideAndUnhide();
    initializeTooltips();
    getCollections();

    let editField = getID("editField");
    editField.addEventListener("click", sendEditedFields)

    let addField = getID("addField");
    addField.addEventListener("click", sendAddedFields)

    let editDocument = getID("editDocument");
    editDocument.addEventListener("click", sendEditedDocument)
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
function gencollectionsDropDown2(collections) {
    let collectionDD = getID("collection-dropdown2");
    for (let index = 0; index < collections.length; index++) {
        let collection = collections[index];
        let item = createDDItemcollection2(collection);
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
function createDDItemcollection2(collection) {
    let item = document.createElement("a");
    item.classList.add("dropdown-item");
    item.setAttribute('href', "#");
    item.id = "collectionDD2-" + collection.name;
    item.innerHTML = collection.name;

    item.addEventListener("click", function () {
        getID("collectionDropDownButton2").innerHTML = this.text;
        //Get all documents in that collection
        getDocuments(collection);
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
    if (getID("fieldsBody").querySelectorAll("td").length > 0) {
        while (getID("fieldsBody").firstChild) {
            getID("fieldsBody").removeChild(getID("fieldsBody").firstChild);
        }
    }
    fields.forEach((element, index) => {
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

        if (element != "_id") {
            let td = document.createElement("td");
            let editIcon = document.createElement("i");
            editIcon.classList.add("far");
            editIcon.classList.add("fa-edit");
            td.addEventListener("click", editField);
            td.appendChild(editIcon);
            td.setAttribute("data-bs-toggle", "tooltip");
            td.setAttribute("title", "Editing a field will require manually changing its name in the backend and frontend when needed")
            tr.appendChild(td);
        }
        getID("fieldsBody").appendChild(tr);
    });
    getID("table-buttons").style.display = "block";
}

function editField() {
    let row = this.parentNode;
    let input = row.getElementsByTagName("input")[0]
    input.removeAttribute("disabled");
}

function showDocumentCards(documents) {
    let documentsDiv = getID("documents");
    if (documentsDiv.children.length > 0) {
        while (documentsDiv.firstChild) {
            documentsDiv.removeChild(documentsDiv.firstChild);
        }
    }
    documents.forEach(element => {
        let divCard = document.createElement("div");
        
        divCard.addEventListener("click",showDocumentInfo);
        divCard.docc = element;
        divCard.style.cursor = "pointer";
        divCard.classList.add("card");
        divCard.classList.add("w-100");
        divCard.classList.add("m-2")
        divCard.style.position = "relative";

        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");

        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerText = element.ScientificName;

        // let divTextTrash = document.createElement("div");
        let trash = document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash");
        trash.style.color="red";
        trash.title = "delete";
        trash.addEventListener("click", function () {
            if(confirm("This action is permanent and cannot be undone.\nDo you want to proceed?")){
                
                deleteDocument(element, getID("collectionDropDownButton2").innerHTML);
            }else{

            }
        });
        trash.style.position = "absolute";
        trash.style.right = "5px";
        trash.style.top = "5px";
        

        let text = document.createElement("p");
        text.classList.add("card-text");
        text.innerText = element.CommonEnglishName;

        divCardBody.appendChild(title);
        divCardBody.appendChild(text);
        divCardBody.appendChild(trash);
        divCard.appendChild(divCardBody);
        documentsDiv.appendChild(divCard);
    });

}

function showDocumentInfo(event) {
    let doc = event.currentTarget.docc;
    //fetch the content of the document selected and show it on the side in a box where you can edit
    if (getID("documentDetail").querySelectorAll("td").length > 0) {
        while (getID("documentDetail").firstChild) {
            getID("documentDetail").removeChild(getID("documentDetail").firstChild);
        }
    }
    console.log(doc)
    for (const key in doc) {
        console.log(`${key} ${doc[key]}`)
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row"
        let td = document.createElement("td");
        let input = document.createElement("input");
        // if(Array.isArray(doc[key])){
        //     doc[key].forEach(element => {
        //         console.log(element);
        //     });
        // }
        input.placeholder = doc[key];
        input.disabled = true;
        th.innerHTML = key;
        td.appendChild(input);
        tr.appendChild(th);
        tr.appendChild(td);

        if (key != "_id" && key != "Images") {
            let td = document.createElement("td");
            let editIcon = document.createElement("i");
            editIcon.classList.add("far");
            editIcon.classList.add("fa-edit");
            td.addEventListener("click", editField);
            td.appendChild(editIcon);
            tr.appendChild(td);
        } else if(key=="_id"){
            td.id = "key";
        }
        getID("docBody").appendChild(tr);
    getID("documentDetail").style.display = "block";
    }
        
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
            gencollectionsDropDown2(collections);
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
    let changedFields = getID("table-buttons").querySelectorAll("input:enabled");
    let editedFields = new Object();
    editedFields.collection = document.getElementById("collectionDropDownButton").innerText;
    for (let index = 0; index < changedFields.length; index++) {
        if (changedFields[index].placeholder != changedFields[index].value && changedFields[index].value != "") {
            let name = changedFields[index].placeholder
            editedFields[name] = changedFields[index].value;
        }
    }
    fetch("/changeFields", {
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
    if (addedField.value != "") {
        newField.newField = addedField.value;
    }
    fetch("/addField", {
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

function sendEditedDocument() {
    let changedDocument = getID("documentDetail").querySelectorAll("input:enabled");
    let editedDocument = new Object();
    editedDocument.collection = document.getElementById("collectionDropDownButton2").innerText;
    editedDocument._id = getID("key").querySelector("input").placeholder;
    for (let index = 0; index < changedDocument.length; index++) {
        if (changedDocument[index].placeholder != changedDocument[index].value && changedDocument[index].value != "") {
            let name = changedDocument[index].parentNode.parentNode.querySelector("th").innerText;
            let value = changedDocument[index].value;
            let array;
            if(value.includes(',')){
                array = value.match(/(\w+)/gm);
                editedDocument[name] = array;
            }else{
                editedDocument[name] = changedDocument[index].value;
            }
            
        }
    }
    fetch("/changeDocument", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedDocument)
    })
        .then(response => {
            window.location.reload();
        })
        .catch(err => console.log(err));
}

function getDocuments(collection) {
    console.log(collection)
    fetch('/getDocuments?' + new URLSearchParams({
        collection: collection.name,
    }))
        .then(response => response.json())
        .then(function (json) {
            console.log(json);
            let documents = json;
            console.log(documents);
            //show bunch of plants in Cards with Scientific Name and Common Name only
            showDocumentCards(documents);
        })
}

function deleteDocument(doc, collection) {
    fetch('/deleteDocument?' + new URLSearchParams({
        collection: collection,
        id: doc._id
    }))
        .then(response => 
            {window.location.reload();}
        )
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
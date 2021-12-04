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

    let addDocument = getID("addDocument");
    addDocument.addEventListener("click", sendAddedDocument);

    let viewDropDown = getID("view-dropdown");
    let links = viewDropDown.getElementsByTagName("a");
    for (let index = 0; index < links.length; index++) {
        links[index].addEventListener("click", function () {
            getID("viewButton").innerHTML = this.text;
            //Get all documents in that collection
            getMessages(this.text);
        })
    }

    let searchBar = getID("searchBar");
    searchBar.addEventListener("keyup", filterCards);
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
function gencollectionsDropDown3(collections) {
    let collectionDD = getID("collection-dropdown3");
    for (let index = 0; index < collections.length; index++) {
        let collection = collections[index];
        let item = createDDItemcollection3(collection);
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
        getFields(collection, "DD1");
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

function createDDItemcollection3(collection) {
    let item = document.createElement("a");
    item.classList.add("dropdown-item");
    item.setAttribute('href', "#");
    item.id = "collectionDD3-" + collection.name;
    item.innerHTML = collection.name;

    item.addEventListener("click", function () {
        getID("collectionDropDownButton3").innerHTML = this.text;
        //Get all fields
        getFields(collection, "DD3");
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


function genFieldsToAddDoc(fields) {
    if (getID("fieldsBody3").querySelectorAll("td").length > 0) {
        while (getID("fieldsBody3").firstChild) {
            getID("fieldsBody3").removeChild(getID("fieldsBody3").firstChild);
        }
    }
    fields.forEach((element, index) => {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "row"
        let td = document.createElement("td");
        let input = document.createElement("input");
        th.innerHTML = element;
        td.appendChild(input);
        tr.appendChild(th);
        tr.appendChild(td);

        if (element == "_id") {
            input.disabled = true;
            input.title = "The ID is autogenerated"
        }
        getID("fieldsBody3").appendChild(tr);
    });
    getID("table-buttons3").style.display = "block";
}

function editField() {
    let row = this.parentNode;
    let input = row.getElementsByTagName("input")[0]
    input.removeAttribute("disabled");
}

function showDocumentCards(documents, collection) {
    let documentsDiv = getID("documents");
    if (documentsDiv.children.length > 0) {
        while (documentsDiv.firstChild) {
            documentsDiv.removeChild(documentsDiv.firstChild);
        }
    }
    documents.forEach(element => {
        let divCard = document.createElement("div");

        divCard.addEventListener("click", showDocumentInfo);
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
        if (collection == "allPlants") {
            title.innerText = element.ScientificName;
        } else if (collection == "countries") {
            title.innerText = element.name;
        }


        // let divTextTrash = document.createElement("div");
        let trash = document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash");
        trash.style.color = "red";
        trash.title = "delete";
        trash.addEventListener("click", function () {
            if (confirm("This action is permanent and cannot be undone.\nDo you want to proceed?")) {

                deleteDocument(element, getID("collectionDropDownButton2").innerHTML);
            } else {

            }
        });
        trash.style.position = "absolute";
        trash.style.right = "5px";
        trash.style.top = "5px";


        let text = document.createElement("p");
        text.classList.add("card-text");
        if (collection == "allPlants") {
            text.innerText = element.CommonEnglishName;
        }

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
    if (getID("docBody").querySelectorAll("td").length > 0) {
        while (getID("docBody").firstChild) {
            getID("docBody").removeChild(getID("docBody").firstChild);
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
        } else if (key == "_id") {
            td.id = "key";
        }
        getID("docBody").appendChild(tr);
        getID("documentDetail").style.display = "block";
    }

}

//messages
function showMessageCards(messages) {
    let messagesDiv = getID("messages");
    if (messagesDiv.children.length > 0) {
        while (messagesDiv.firstChild) {
            messagesDiv.removeChild(messagesDiv.firstChild);
        }
    }
    messages.forEach(element => {
        let divCard = document.createElement("div");

        divCard.addEventListener("click", showMessageInfo);
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
        title.innerText = element.subject;



        // let divTextTrash = document.createElement("div");
        let trash = document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash");
        trash.style.color = "red";
        trash.title = "delete";
        trash.addEventListener("click", function () {
            if (confirm("This action is permanent and cannot be undone.\nDo you want to proceed?")) {

                deleteDocument(element, "messages");
            } else {

            }
        });
        trash.style.position = "absolute";
        trash.style.right = "5px";
        trash.style.top = "5px";


        let text = document.createElement("p");
        text.classList.add("card-text");
        text.innerText = element.name;

        divCardBody.appendChild(title);
        divCardBody.appendChild(text);
        divCardBody.appendChild(trash);
        divCard.appendChild(divCardBody);
        messagesDiv.appendChild(divCard);
    });

}

function showMessageInfo(event) {
    let message = event.currentTarget.docc;
    if (getID("messageDetail").querySelectorAll("input").length > 0) {
        while (getID("messageDetail").firstChild) {
            getID("messageDetail").removeChild(getID("messageDetail").firstChild);
        }
    }
    console.log(message)
    createLabelInput("name", "Name", message.name);
    createLabelInput("company", "Company", message.company);
    createLabelInput("email", "Email", message.email);
    createLabelInput("phone", "Phone Number", message.phone);
    createLabelInput("country", "Country", message.country);
    createLabelInput("subject", "Subject", message.subject);
    //NEED TO ADD FILES DISPLAY
    createLabelTextArea("comments", "Comments", message.comments);

    if(message.response==undefined){
        //compose response
    let label = document.createElement("label");
    label.setAttribute("for", "response");
    label.innerText = "Compose Response";
    let textArea = document.createElement("textArea");
    textArea.id = "response";
    textArea.name = "response";
    textArea.type = "text";
    textArea.style.height = "200px";
    getID("messageDetail").appendChild(label);
    getID("messageDetail").appendChild(textArea);

    let sendResponse = getID("sendResponse");
    sendResponse.addEventListener("click", sendMessageResponse);
    sendResponse.message = message;
    }else{
        createLabelTextArea("response", "Sent Response", message.response);
    }
    

    getID("message-button").style.display = "";
}

function filterCards() {
    let searchTerm = getID("searchBar").getElementsByTagName("input")[0].value.toUpperCase();
    let cards = document.getElementsByClassName("card-body");
    for (let index = 0; index < cards.length; index++) {
        let sciName = cards[index].getElementsByClassName("card-title")[0];
        let commonName = cards[index].getElementsByClassName("card-text")[0];
        let txtValueSci = sciName.textContent || sciName.innerText;
        let txtValueCommon = commonName.textContent || commonName.innerText;
        if (txtValueSci.toUpperCase().indexOf(searchTerm) > -1 || txtValueCommon.toUpperCase().indexOf(searchTerm) > -1) {
            cards[index].parentNode.style.display = "";
        } else {
            cards[index].parentNode.style.display = "none";
        }
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
            gencollectionsDropDown3(collections);
        })
}

function getFields(collection, DropDownNumber) {
    console.log(collection)
    fetch('/getFields?' + new URLSearchParams({
        collection: collection.name,
    }))
        .then(response => response.json())
        .then(function (json) {
            console.log(json);
            let fields = json;
            console.log(fields);
            if (DropDownNumber == "DD1") {
                genFields(fields);

            } else {
                genFieldsToAddDoc(fields);
            }
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
        if (changedDocument[index].placeholder != changedDocument[index].value) {
            let name = changedDocument[index].parentNode.parentNode.querySelector("th").innerText;
            let value = changedDocument[index].value;
            let array;
            if (value.includes(',')) {
                array = value.match(/(\w+)/gm);
                editedDocument[name] = array;
            } else {
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
            showDocumentCards(documents, collection.name);
        })
}

function getMessages(filter) {
    fetch('/getMessages?' + new URLSearchParams({
        filter: filter,
    }))
        .then(response => response.json())
        .then(function (json) {
            console.log(json);
            let messages = json;
            console.log(messages);
            //show bunch of plants in Cards with Scientific Name and Common Name only
            showMessageCards(messages);
        })
}

function sendMessageResponse(event) {
    let response = getID("response");
    let message = event.currentTarget.message;
    if(message.email == ""){
        alert("There is no valid email address to send to");
        return;
    }

    fetch('/sendResponse?' + new URLSearchParams({
        response: response.value,
        id: message._id,
        subject: message.subject,
        to: message.email
    }))
        .then(res => {
            console.log(res)
            if (res.status == 200) {
                alert("mail sent successfully")
                window.location.reload();

            } else {
                alert("there was an error sending the response")
            }
        }
        )
}

function deleteDocument(doc, collection) {
    fetch('/deleteDocument?' + new URLSearchParams({
        collection: collection,
        id: doc._id
    }))
        .then(response => { window.location.reload(); }
        )
}

function sendAddedDocument() {
    let empty = 0;
    let headers = getID("fieldsBody3").getElementsByTagName("th");
    let inputs = getID("fieldsBody3").getElementsByTagName("input");
    let addedDocument = new Object();
    addedDocument.collection = document.getElementById("collectionDropDownButton3").innerText;
    for (let index = 0; index < headers.length; index++) {
        if (inputs[index].value != " " && inputs[index].value != null && inputs[index].value != "") {
            empty = 1;
        }
        if (inputs[index].value.includes(',')) {
            array = inputs[index].value.match(/(\w+)/gm);
            addedDocument[headers[index].innerText] = array;
        } else {
            addedDocument[headers[index].innerText] = inputs[index].value != null ? inputs[index].value : "";
        }
    }

    console.log(addedDocument);
    if (empty != 0) {
        fetch("/addDocument", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addedDocument)
        })
            .then(response => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    } else {
        alert("At least one field should be filled");
    }


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

function createLabelInput(id, labelTitle, value) {
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = labelTitle;
    let input = document.createElement("input");
    input.id = id;
    input.name = id;
    input.type = "text";
    input.readOnly = true;
    input.value = value;
    getID("messageDetail").appendChild(label);
    getID("messageDetail").appendChild(input);
}

function createLabelTextArea(id, labelTitle, value) {
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = labelTitle;
    let textArea = document.createElement("textArea");
    textArea.id = id;
    textArea.name = id;
    textArea.type = "text";
    textArea.readOnly = true;
    textArea.value = value;
    textArea.style.height = "200px";
    getID("messageDetail").appendChild(label);
    getID("messageDetail").appendChild(textArea);
}
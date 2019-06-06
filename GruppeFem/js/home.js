//Funksjonen forandrer navnen på knappen som viser hvilken tavle man skal linkes til.
function changeTable(id){
    if(askIsActive === true){
        resetAskUser()
    }
    let modal = document.getElementById("link-Table");
    let tableName = document.getElementById(id);
    let inputField = document.getElementById("change-Input");
    inputField.setAttribute("placeholder", tableName.innerHTML);
    modal.innerHTML = "Go to " + tableName.innerHTML.toLowerCase();
    modal.setAttribute("onclick","window.location.href='board.html'");
    let hiddenHead = document.getElementById("table-Head");
    hiddenHead.innerHTML = id;
}
//gjør det enklere å lage et html elemenet med tekst
function createHtmlElementWithText(tagName, text){
    let element = document.createElement(tagName);
    element.innerHTML = text;
    return element;
}

//kobler til en modal med setAttribute
function addModal(element, modalName){
    element.setAttribute('data-toggle', 'modal');
    element.setAttribute('data-target', '#'+modalName);
}

//Lager Gruppe elementer og gir dem attributter.
function lagGruppe(){
    let groupBody = document.getElementById("group-Body");
    groupBody.innerHTML ="";

    for(let i=0; i < group.length; i++){

        let gruppelist = document.createElement("table");
        let groupName = document.createElement("div");
        let groupHeader = document.createElement("div");
        addModal(groupName,"new-group-modal");
        gruppelist.appendChild(groupHeader);
        groupHeader.appendChild(groupName);
        groupHeader.setAttribute("class", "row");
        gruppelist.setAttribute("id",group[i].name + i);
        gruppelist.setAttribute("numb",i);
        gruppelist.setAttribute("class","column");
        gruppelist.style.marginBottom = "45px";
        groupName.onclick = function(e) {groupModal(e.target)};
        groupName.style.fontSize = "xx-large";
        gruppelist.style.backgroundColor = "#C92047";
        gruppelist.style.borderRadius = "25px";
        groupHeader.style.marginRight = "25px";
        groupHeader.style.marginLeft= "20px";


        //Lager knappen for å legge til flere tavler.
        let addButton = createHtmlElementWithText("div","Legg til tavle");
        addButton.setAttribute("class", "btn btn-primary m-3 btn-sm");
        addButton.innerHTML = "Add new board";
        groupName.innerHTML = group[i].name;
        groupBody.appendChild(gruppelist);
        gruppelist.appendChild(addButton);
        addModal(addButton,"create-Table-Modal");
        groupHeader.appendChild(addButton);
        addModal(addButton,"lag-Tavle-Modal");
        addButton.setAttribute("numb",i);
        addButton.setAttribute("id","button"+i);
        addButton.setAttribute("onclick","sendId(this.id)");

        gruppelist.className = "column";
        //Lager elementet som holder tavlene i gruppene.
        let tableList = document.createElement("div");
        tableList.setAttribute("id","tr"+i);
        tableList.setAttribute("numb", i);
        let gruppeliste = document.getElementById(group[i].name + i);
        gruppeliste.appendChild(tableList);
        // Funksjonen for å lage tavlene og for å gi den riktige attributter.
        function createTable() {
            let arrayOfTabler = group[i].boards;
            for(let k = 0; k < arrayOfTabler.length;k++){
                let arrayOfBoards = group[i].boards;
                let arrayOfTables = arrayOfBoards[k].name;
                let table = createHtmlElementWithText("div", arrayOfTables);
                let tableList = document.getElementById("tr"+i);
                tableList.appendChild(table);
                table.setAttribute("class","btn btn-dark m-3 onboard-text center");
                addModal(table,"table-Info-Modal");
                table.setAttribute("id",arrayOfTables + i + k);
                table.setAttribute("onclick","changeTable(this.id)");
                table.setAttribute("numb", k);
            }
        }
        //Kjører funksjonen slik at riktig tavler blir lagt til i riktig grupper
        createTable(board);
    }
}

//Kjører hele funksjonen for elementene på siden.
lagGruppe();

//Funksjonen for å lage nye tavler fra HTML siden.
function addExtraTable(){
    alert("funk kjører");
    let hiddenHead = document.getElementById("hiddenModal").innerHTML;
    let thisValue = document.getElementById(hiddenHead);
    let groupIndex = thisValue.getAttribute("numb");
    let sameName = false;
    let nyTableInput = document.getElementById("user-Input");
    //En loop som sjekker om navnet allerede eksisterer.
    for (let j = 0; j < group[groupIndex].boards.length; j++){
        if (group[groupIndex].boards[j].name === nyTableInput.value){
            sameName = true;
        }
    }
    //Her sjekker man det er noe i input feltet, og så sjekker den om navnet eksisterte og så stopper funksjonen.
    if(nyTableInput.value === ""){
        alert("Vennligst skriv inn et navn");
    } else if(sameName === true) {
        alert("Dette navnet blir allerede brukt i denne gruppen. Vennligst skriv inn et annet navn.");
        nyTableInput.value = "";
    } else {

        //Ny tavle objectet lages og legges til i riktige arrays.
        let tableIndex = group[groupIndex].boards.length;
        let newtable =
            {
                name:nyTableInput.value,
                lists: [],
                member: [],
            };
        group[groupIndex].boards.push(newtable);
        board.push(newtable);
        //HTML tavlen får riktige attributter
        let arrayOfBoards = group[groupIndex].boards;
        let table = createHtmlElementWithText("div", arrayOfBoards[tableIndex].name);
        let tableList = document.getElementById("tr" + groupIndex);
        addModal(table,"table-Info-Modal");
        table.setAttribute("class", "btn onboard-text m-3 center btn-dark");
        table.setAttribute("id", nyTableInput.value + groupIndex + tableIndex);
        table.setAttribute("onclick","changeTable(this.id)");
        tableList.appendChild(table);
        removeInput()
    }
}

// Fjerner tekst fra input når man lukker modal
function removeInput(){
    let input = document.getElementById("user-Input");
    input.value = "";
}

// Funksjonen for å forandre navnet til tavler både elementet i HTML og navnet i arrayet.
function renameTable() {
    let thisTable = document.getElementById("table-Head");
    let hiddenID = thisTable.innerHTML;
    let newName = document.getElementById("change-Input");
    let thisTableOut = document.getElementById(hiddenID);
    let trTag = thisTableOut.parentElement;
    let groupIndex = trTag.getAttribute("numb");
    let arrayOfGroup = group[groupIndex];
    let nameExists = false;
    //Her sjekkes det både om navnet allerede eksistere og om det ikke er noe i input feltet.
    for(let l = 0; l <group[groupIndex].boards.length;l++) {
        if (newName.value === arrayOfGroup.boards[l].name) {
            nameExists = true;
        }
    }
    //Hvis navnet eksisterer stopper funksjonen, hvis ikke så forandres navnet både HTML elementet og objectet i arrayet.
    if (newName.value === "") {
        alert("Vennligst oppgi nytt navn.");
        newName.value = "";
    }else if(nameExists === true) {
        alert("Det er allerede en tavle med dette navnet. Vennligst velg et annet navn.");
    } else {
        for(let o = 0; o <group[groupIndex].boards.length; o++){
                var thisIndex = o;
                let arrayOfBoards = group[groupIndex].boards;
                arrayOfBoards[thisIndex].name = newName.value;
                thisTableOut.innerHTML = newName.value;
        }
        let arrayOfBoards = group[groupIndex].boards;
        arrayOfBoards[thisIndex].name = newName.value;
        thisTableOut.innerHTML = newName.value;
    }
    thisTableOut.setAttribute("id", newName.value + groupIndex +thisIndex);
    newName.value = "";
}

// Fjerner tekst fra input når man lukker modal
function removeChangeInput(){
    let input = document.getElementById("change-Input");
    input.value = "";
}
//Funksjon som finner input felt og gjør at det aksepterer input når man trykker på enter.
function giveOnEnterPress(input,funcButton) {
    let cardInputField = document.getElementById(input);
    cardInputField.addEventListener("keyup",function (event) {
        if(event.key === "Enter"){
            document.getElementById(funcButton).click();
        }
    });
}
//Gjør at alle modaler aksepterer input når man trykker enter
giveOnEnterPress("group-name-group-modal","create-new-group");
giveOnEnterPress("user-Input","accept-Table-Input");
giveOnEnterPress("change-Input","accept-Input");

//Funksjon for å sende id inn til modal slik at man lett kan finne knappen man trykket på.
function sendId(id){
    let hiddenHead = document.getElementById("hiddenModal");
    hiddenHead.innerHTML = id;
}

//Forandrer modal og spør bruker om bruker er sikkere på om de vil slette tavlen.
var askIsActive = false;
function askUserRemove() {
    askIsActive = true;
    let godtaButton = document.getElementById("accept-Input");
    let closeButton = document.getElementById("close-Modal-Button");

    document.getElementById("delete-Table").setAttribute("hidden",true);
    document.getElementById("link-Table").setAttribute("hidden",true);
    document.getElementById("change-Input").setAttribute("hidden",true);

    let modalBody = document.getElementById("table-Info-Modal-Body");
    let textBody = document.createElement("div");

    textBody.setAttribute("id","getThisBody");
    textBody.style.color = "black";
    modalBody.appendChild(textBody);
    textBody.innerHTML = "Are you sure you want to delete this table?";

    closeButton.innerHTML = "No, i don't want to delete this table.";
    closeButton.setAttribute("class","btn btn-primary");
    closeButton.setAttribute("onclick","resetAskUser()");
    godtaButton.innerHTML = "Yes, delete table";
    godtaButton.setAttribute("onclick","removeTable()");
}

//Reseter det som askUserRemove gjorde med modalen.
function resetAskUser() {
    let godtaButton = document.getElementById("accept-Input");
    let closeButton = document.getElementById("close-Modal-Button");

    document.getElementById("delete-Table").removeAttribute("hidden");
    document.getElementById("link-Table").removeAttribute("hidden");
    document.getElementById("change-Input").removeAttribute("hidden");

    let textBody = document.getElementById("getThisBody");
    textBody.parentNode.removeChild(textBody);

    closeButton.innerHTML = "Close";
    closeButton.setAttribute("class","btn btn-default");
    godtaButton.innerHTML = "Save changes";
    closeButton.setAttribute("onclick","removeChangeInput()");
    godtaButton.setAttribute("onclick","renameTable()");
    askIsActive = false;
}

//Funksjon for å fjerne en tavle fra arrayet det lå i og fra HTML siden.
function removeTable(){
    let hiddenHead = document.getElementById("table-Head").innerHTML;
    let boardIndex = document.getElementById(hiddenHead);
    let groupIndexFinder = boardIndex.parentElement.id;
    let tr = document.getElementById(groupIndexFinder);
    let bIndex = boardIndex.getAttribute("numb");
    let groupFound = document.getElementById(tr.parentElement.id);
    let gIndex = groupFound.getAttribute("numb");
    group[gIndex].boards.splice(bIndex,1);
    board.splice(bIndex, 1);
    boardIndex.parentNode.removeChild(boardIndex);
    $("#table-Info-Modal").modal("toggle");
    resetAskUser();
    return false;
}
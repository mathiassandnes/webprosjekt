/**
 * Genererer tabs
 */
//her lagres alle elementer på siden

let arrayOfBoards = group.group1.boards;
let arrayOfLists = arrayOfBoards[0].lists;


function drawBoards() {
    for (let i = 0; i < arrayOfBoards.length; i++) {
        let newTabButtonElement = createHtmlElementWithText('button', arrayOfBoards[i].name);
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");
        newTabButtonElement.className="btn-light rounded m-1"
        document.getElementById('nav').appendChild(newTabButtonElement);
    }
}

function createHtmlElementWithText(tagName, text){
    let element = document.createElement(tagName);
    element.innerHTML = text;
    return element;
}

/**
 * Genererer alle listene, med kort og knapper
 */
function drawTables(board) {

    // clears the screen
    document.getElementById('lists-area').innerHTML="";

//henter ut en liste med lister

//henter ut en html elementet som listene skal være inni
    let listsArea = document.getElementById('lists-area');

//looper igjennom listen med lister
    for (let i = 0; i < arrayOfLists.length; i++) {

        //lager et nytt html element
        let listElementContainer = document.createElement('li');
        let listElement = createHtmlElementWithText('div', arrayOfLists[i].name); // få dette større <legend>
        let listElementBody = document.createElement('ul');
        listElementContainer.className = "m-3 bg-dark rounded list-element p-1";


        var arrayOfCards = arrayOfLists[i].cards;

        listElement.id = i;
        listElement.className = "col-12 text-12 text-light text-center m-1 p-2"
        //legger listen inni liste området
        listElementContainer.appendChild(listElement);
        listElementContainer.appendChild(listElementBody);

        //legger til navnet til listen i en dropdown meny på kort modal
        document.getElementById('list-name').appendChild(createHtmlElementWithText('option', arrayOfLists[i].name));

        // makes the cards for a list
        for (let j = 0; j < arrayOfCards.length; j++) {
            //lager et nytt html element
            let cardElementContainer = document.createElement('li');
            let cardElement = createHtmlElementWithText('div', arrayOfCards[j].name);
            cardElementContainer.className="center col-12";

            //adds modal
            cardElement.setAttribute('data-toggle', 'modal');
            cardElement.setAttribute('data-target', '#card-modal');

            cardElement.id = cardElement+i+j;

            // activates modal
            cardElement.addEventListener('click', function(){
                document.getElementById('card-name-input').setAttribute('placeholder', arrayOfCards[j].name);
                document.getElementById('card-description').innerText = arrayOfCards[j].description;
                document.getElementById('priority').options.selectedIndex = arrayOfCards[j].priority;
                //document.getElementById('list-name').setAttribute('placeholder', arrayOfLists[i].name);
            });

            cardElement.className="btn btn-primary text-dark m-1 center col-12";//btn btn-primary";
            //legger kortet inn i listen
            cardElementContainer.appendChild(cardElement);
            listElementBody.appendChild(cardElementContainer);

        }

        /**
         *Nytt kort knapp, trenger funksjonalitet
         */
        let newCardButton = createHtmlElementWithText('button', 'Nytt kort');

        //adds modal
        newCardButton.setAttribute('data-toggle', 'modal');
        newCardButton.setAttribute('data-target', '#card-modal');

        newCardButton.addEventListener('click', function(){
            document.getElementById('card-name-input').setAttribute('placeholder', "name of task");
            document.getElementById('card-description').innerText = "description of task";
            document.getElementById('priority').options.selectedIndex = 0;
            //document.getElementById('list-name').setAttribute('placeholder', arrayOfLists[i].name);
        });

        newCardButton.className="center btn btn-success col-12 new-card-button";
        listElementContainer.appendChild(newCardButton);
        listsArea.appendChild(listElementContainer);

    }

    /**
     *NY liste knapp, trenger funksjonalitet
     */

    var newListButton = createHtmlElementWithText('button', 'Ny liste');
    newListButton.id = "new-list";
    newListButton.className = "col-1 btn btn-primary m-5";


    //adds modal
    newListButton.setAttribute('data-toggle', 'modal');
    newListButton.setAttribute('data-target', '#list-modal');



    listsArea.appendChild(newListButton);
}

drawBoards();
drawTables(0); //input må være det boardet vi trykket på i "home" siden

/**
 * Ting å fikse
 * cards må kunne oppdateres
 * cards må kunne lages
 * */



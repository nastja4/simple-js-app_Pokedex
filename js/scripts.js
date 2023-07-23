let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');
    
    /*[
        {name: "Nidorino", attack: 72, defense: 57, types: ["poison"]},
        {name: "Ponyta", attack: 85, defense: 55, types: ["fire"]},
        {name: "Onix", attack: 45, defense: 160, types: ["rock", "ground"]},
        {name: "Starmie", attack: 75, defense: 85, types: ["water", "psychic"]},
        {name: "Umbreon", attack: 65, defense: 110, types: ["dark"]}
    ]*/

    function getAll () {
        return pokemonList;
    }

    function add (pokemon) { 
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        } else {
            document.write('Data type is not correct');
        }       
    }

    function addListItem(pokemon) {
        let pokemonListUl = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');           
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonListUl.appendChild(listItem);
        
        // Adding an event listener to the button //
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }    
    
    // Creating a func loadList() //
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {

            return response.json();
        }).then(function (json) {            
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    // Creating a func loadDetails() //
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            if (details.types.length > 1) {
                item.types = details.types[0].type.name + ', ' + details.types[1].type.name;
            } else {
                item.types = details.types[0].type.name;
            }
            item.attack = details.stats[1].base_stat;
            item.defense = details.stats[2].base_stat;
            hideLoadingMessage();
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }


    // Editing a func showDetails() //
    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item); 
        });
    }
    
    function showLoadingMessage() {
        console.log('Data is loading...');
        // alert('Data is loading...');
    }

    function hideLoadingMessage() {
        console.log('Loaded!');
        // alert('Loaded!');
    }


    function showModal(pokemon) {        
        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close'; // '&times'; (.innerHTML)
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height + '\n Weight: ' + pokemon.weight + '\n Attack: ' + pokemon.attack + '\n Defense: ' + pokemon.defense + '\n Types: ' + pokemon.types;

        let imageElement = document.createElement('img');
        imageElement.setAttribute("src", pokemon.imageUrl);
        imageElement.setAttribute("alt", "Pokemon logo");

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Close modal-window with Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Close modal-window if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });



    return {
        getAll: getAll,
        add: add,        
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage,
        showModal: showModal,
        hideModal: hideModal
    };    
})();

pokemonRepository.add({name: 'Magneton', attack: 60, defense: 95, types: ['electric', 'steel'] });

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
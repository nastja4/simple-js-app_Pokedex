let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let modalContainer = document.querySelector("#exampleModal");

    function getAll () {
        return pokemonList;
    }

    function add (pokemon) { 
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        } else {
            document.write("Data type is not correct");
        }       
    }

    function addListItem(pokemon) {
        let pokemonListUl = document.querySelector(".list-group");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "border-0", "py-1", "px-0");
        
        let button = document.createElement("button");
        // Button trigger modal //
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#exampleModal");
        button.classList.add("btn-info", "text-capitalize", "fs-16", "w-100", "font-weight-bold", "d-flex", "justify-content-between", "align-items-center");
        // Adding an event listener to the button //
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
        // button.innerText = pokemon.name; //

        let buttonName = document.createElement("div");
        buttonName.classList.add("buttonName");
        buttonName.innerText = pokemon.name;
        
        let buttonPokemonImg = document.createElement("img");
        buttonPokemonImg.classList.add("buttonPokemonImg");
        buttonPokemonImg.setAttribute("willReadFrequently", "true");
        buttonPokemonImg.setAttribute("loading", "lazy");
        buttonPokemonImg.src = pokemon.imageUrl;        

        button.appendChild(buttonName);
        button.appendChild(buttonPokemonImg);
        listItem.appendChild(button); 
        pokemonListUl.appendChild(listItem);        
    }    
    
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {

            return response.json();
        }).then(function (json) {            
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                hideLoadingMessage();

                let url = pokemon.detailsUrl;
                let pattern = /\/(\d+)\/?$/;
                let match = url.match(pattern);
    
                if (match) {
                    pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${match[1]}.png`;
                }
            });
        }).catch(function (e) {            
            console.error(e);
            hideLoadingMessage();
        });
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item //
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            if (details.types.length > 1) {
                item.types = details.types[0].type.name + ", " + details.types[1].type.name;
            } else {
                item.types = details.types[0].type.name;
            }
            item.attack = details.stats[1].base_stat;
            item.defense = details.stats[2].base_stat;
            hideLoadingMessage();
        }).catch(function (e) {            
            console.error(e);
            hideLoadingMessage();
        });
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item); 
        });
    }
    
    function showLoadingMessage() {
        console.log("Data is loading...");        
    }

    function hideLoadingMessage() {
        console.log("Loaded!");        
    }

    function showModal(pokemon) {        
        let titleElement = document.querySelector(".modal-title");
        titleElement.innerText = pokemon.name;

        let contentElement = document.querySelector(".modal-detailsPokemonContent");
        contentElement.innerText = "Height: " + pokemon.height + "\n Weight: " + pokemon.weight + "\n Attack: " + pokemon.attack + "\n Defense: " + pokemon.defense + "\n Types: " + pokemon.types;

        let imageElement = document.querySelector(".modal-imgPokemon");
        imageElement.setAttribute("src", pokemon.imageUrl);
        
        modalContainer.classList.add("is-visible");
    }

    function hideModal() {
        modalContainer.classList.remove("is-visible");
    }

    // Close modal-window with Escape //
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }
    });

    modalContainer.addEventListener("click", (e) => {
        // Close modal-window if the user clicks directly on the overlay //
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

// Adding pokemon //
// pokemonRepository.add({name: 'Magneton', attack: 60, defense: 95, types: ['electric', 'steel'] });

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    
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
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        } else {
            document.write("Data type is not correct");
        }       
    }

    function addListItem(pokemon) {
        let pokemonListUl = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");           
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonListUl.appendChild(listItem);
        // Adding an event listener to the button //
        button.addEventListener("click", function() {
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
            item.types = details.types;
            item.attack = details.attack;
            item.defense = details.defense;
            hideLoadingMessage();
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    // Editing a func showDetails() //
    function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
        });
    }

    function showLoadingMessage() {
        console.log("Data is loading...");
    }

    function hideLoadingMessage() {
        console.log("Loaded!");
    }

    return {
        getAll: getAll,
        add: add,        
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage
    };    
})();

pokemonRepository.add({name: "Magneton", attack: 60, defense: 95, types: ["electric", "steel"] });

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// let pokemonList = [
//     {name: 'Nidorino', attack: 72, defense: 57, types: ['poison']},
//     {name: 'Ponyta', attack: 85, defense: 55, types: ['fire']},
//     {name: 'Onix', attack: 45, defense: 160, types: ['rock', 'ground']},
//     {name: 'Starmie', attack: 75, defense: 85, types: ['water', 'psychic']},
//     {name: 'Umbreon', attack: 65, defense: 110, types: ['dark']}
// ];

// function printArrayDetails() {
//     for (let i = 0; i < pokemonList.length; i++) {    
//         if (pokemonList[i].attack > 80) {        
//             document.write(pokemonList[i].name + ' (attack: ' + pokemonList[i].attack + ' / defense: ' + pokemonList[i].defense + ') is the most powerful pokemon of ' + pokemonList.length + '<br>'); 
//             } else {
//                 document.write(pokemonList[i].name + ' (attack: ' + pokemonList[i].attack + ' / defense: ' + pokemonList[i].defense + ')<br>');
//             }
//     }
// }

// printArrayDetails();



let pokemonRepository = (function() {

    let pokemonList = [
        {name: "Nidorino", attack: 72, defense: 57, types: ["poison"]},
        {name: "Ponyta", attack: 85, defense: 55, types: ["fire"]},
        {name: "Onix", attack: 45, defense: 160, types: ["rock", "ground"]},
        {name: "Starmie", attack: 75, defense: 85, types: ["water", "psychic"]},
        {name: "Umbreon", attack: 65, defense: 110, types: ["dark"]}
    ]

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
        button.addEventListener("click", function () {
            showDetails(pokemon.name);
        });
    }
    
    // Creating a func showDetails() //
    function showDetails(pokemon) {
        console.log(pokemon);
    }
    
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        // Adding a created func showDetails() //
        showDetails: showDetails
    };    
})();

pokemonRepository.add({name: "Magneton", attack: 60, defense: 95, types: ["electric", "steel"]});

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});

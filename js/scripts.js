
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



let pokemonRepository = (function () {

    let pokemonList = [
        {name: 'Nidorino', attack: 72, defense: 57, types: ['poison']},
        {name: 'Ponyta', attack: 85, defense: 55, types: ['fire']},
        {name: 'Onix', attack: 45, defense: 160, types: ['rock', 'ground']},
        {name: 'Starmie', attack: 75, defense: 85, types: ['water', 'psychic']},
        {name: 'Umbreon', attack: 65, defense: 110, types: ['dark']}
    ]

    function getAll () {
        return pokemonList;
    }

    function add (pokemon) {        
       pokemonList.push(pokemon);
    }
    
    return {
        getAll: getAll,
        add: add
    };    
})();


function pokemonLoopFunction(pokemon) {           
    if (pokemon.attack > 80) {        
        document.write(pokemon.name + ' (attack: ' + pokemon.attack + ', defense: ' + pokemon.defense + ', types: ' + pokemon.types + ') is the most powerful pokemon of ' + pokemonRepository.getAll().length + '<br>'); 
        } else {
            document.write(pokemon.name + ' (attack: ' + pokemon.attack + ', defense: ' + pokemon.defense + ', types: ' + pokemon.types + ')<br>');
        }
}

// pokemonRepository.getAll().forEach(pokemonLoopFunction);

pokemonRepository.add({name: 'Magneton', attack: 60, defense: 95, types: ['electric', 'steel']});

pokemonRepository.getAll().forEach(pokemonLoopFunction);


// document.write(pokemonRepository.getAll());
// pokemonRepository.add('RRR');
// document.write(pokemonRepository.getAll());

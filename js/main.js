//constante lista pokemon
const listaPokemon = document.querySelector('#listaPokemon');
const btnHeader = document.querySelectorAll('.btn-header');

let URL = 'https://pokeapi.co/api/v2/pokemon/';

for(let i = 1; i <= 151; i++){
    fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data)) 
}

function mostrarPokemon(poke){

    let tipos = poke.types.map(type =>`<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString().padStart(3, '0');

    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML = `
        <p class="pokemon-id-back">
            #${pokeId}
        </p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2>${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stast">
            <p class="stat">${poke.height/10} m</p>
            <p class="stat">${poke.weight/10} kg</p>
        </div>
    </div>
    `;
    listaPokemon.appendChild(div);
}

btnHeader.forEach(boton => boton.addEventListener('click', (Event) =>{
    const botonId = Event.currentTarget.id;
    listaPokemon.innerHTML = '';
    for(let i = 1; i <= 151; i++){
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            
            if(botonId === 'ver-todos'){
                mostrarPokemon(data);
            }else{
                const tipos = data.types.map(type =>type.type.name);
                if(tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data);
                }
            }
        }) 
    }
}))
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemones = [];

// Texto cargando al inicio de la petición
listaPokemon.innerHTML = "Cargando pokemones...";

async function fetchPokemones() {
  for (let i = 1; i <= 999; i++) {
    try {
      const response = await fetch(URL + i);
      const data = await response.json();
      pokemones.push(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Mostrar todos los pokemones llamando a la funcion
  mostrarTodosLosPokemon();
}

function mostrarPokemon(poke) {
  let tipos = poke.types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  tipos = tipos.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}"> 
        </div>
        <div class="pokemon-info">
          <div class="nombre-contenedor">
              <p class="pokemon-id">#${pokeId}</p>
              <h2 class="pokemon-nombre">${poke.name}</h2>
         </div>
         <div class="pokemon-tipos">
            ${tipos}
         </div>
         <div class="pokemon-stats">
             <p class="stat">${poke.height}cm</p>
             <p class="stat">${poke.weight}kg</p>
         </div>
      </div>
   `;
  listaPokemon.append(div);
}
// Mostrar todos los pokemones y ocultar texto cargando
function mostrarTodosLosPokemon() {
  listaPokemon.innerHTML = "";
  pokemones.forEach((poke) => mostrarPokemon(poke));
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";

    pokemones.forEach((data) => {
      if (botonId === "ver-todos") {
        mostrarPokemon(data);
      } else {
        const tipos = data.types.map((type) => type.type.name);
        if (tipos.some((tipo) => tipo.includes(botonId))) {
          mostrarPokemon(data);
        }
      }
    });
  })
);
// Cargar pokemones al cargar la pagina
window.addEventListener("load", fetchPokemones);

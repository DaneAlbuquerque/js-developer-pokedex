const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modal = document.getElementById("pokemonModal");
const modalContent = document.getElementById("modalPokemonDetails");
const closeModal = document.querySelector(".close-modal");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  const li = document.createElement("li");
  li.className = `pokemon ${pokemon.type}`;
  li.innerHTML = `
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
  `;
  li.addEventListener("click", () => showPokemonDetails(pokemon));
  return li;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemons.forEach((pokemon) => {
      const pokemonElement = convertPokemonToLi(pokemon);
      pokemonList.appendChild(pokemonElement);
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function showPokemonDetails(pokemon) {
  modalContent.innerHTML = `
    <div class="modal-header ${pokemon.type}">
      <h2 class="name">${pokemon.name}</h2>
      <span class="number">#${pokemon.number}</span>
    </div>
    <img class="modal-pokemon-img" src="${pokemon.photo}" alt="${pokemon.name}">
    <div class="types">
      ${pokemon.types
        .map((type) => `<span class="type ${type}">${type}</span>`)
        .join("")}
    </div>
    <div class="modal-pokemon-stats">
      <p><strong>Height:</strong> ${pokemon.height}m</p>
      <p><strong>Weight:</strong> ${pokemon.weight}kg</p>
      <p><strong>Abilities:</strong> ${pokemon.abilities.join(", ")}</p>
      <p><strong>HP:</strong> ${pokemon.stats.hp}</p>
      <p><strong>Attack:</strong> ${pokemon.stats.attack}</p>
      <p><strong>Defense:</strong> ${pokemon.stats.defense}</p>
    </div>
  `;
  modal.style.display = "block";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

const characterSelect = document.getElementById('characterSelect');
const getCharacterBtn = document.getElementById('getCharacterBtn');
const nameEl = document.getElementById('name');
const typeEl = document.getElementById('type');
const imageEl = document.getElementById('image');
const info1El = document.getElementById('info1');
const info2El = document.getElementById('info2');


fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
  .then(res => res.json())
  .then(data => {
    data.results.forEach(pokemon => {
      const option = document.createElement('option');
      option.value = pokemon.name;
      option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      characterSelect.appendChild(option);
    });
  });


getCharacterBtn.addEventListener('click', () => {
  const selectedName = characterSelect.value;
  if (!selectedName) {
    alert("Please select a Pokemon.");
    return;
  }

fetch(`https://pokeapi.co/api/v2/pokemon/${selectedName}`)
    .then(res => res.json())
    .then(data => {
      nameEl.textContent = `Name: ${capitalize(data.name)}`;
      typeEl.textContent = `Type: ${data.types.map(t => t.type.name).join(', ')}`;
      imageEl.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
      imageEl.style.display = 'block';
      info1El.textContent = `Height: ${data.height}`;
      info2El.textContent = `Weight: ${data.weight}`;
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      alert("Something went wrong. Please try again.");
    });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}




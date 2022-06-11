// Make new template elements for the pokemon card
const template = document.createElement("template");
// Log the template and its methods
// console.log("My template is: ", template);

template.innerHTML = `
<style>
    .card-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 290px;
        height: 400px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        margin-bottom: 250px;
        padding: 10px;
    }

    .pokemon-img-wrapper {
        width: 70%;
        height: 100%;
        margin: 10px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

    }

    .pokemon-name{
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      margin: 1.5rem;
      color: #fff;
      shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      text-shadow: 0 0 10px #000;
    }

    .pokemon-power{
        display: flex;
        justify-content: space-between;
        height: 150px;
        width: 100%;
        font-size: 1.5rem;
        align-items: center;
    }

    .pokemon-details{
        display: flex;
        justify-content: space-between;
        height: 150px;
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
        align-items: center;
    }

    .pokemon-button{
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }

</style>

<div class="card-wrapper">
    <h1>        
        <span class= "pokemon-name"></span>
    </h1>
    <span class="pokemon-img-wrapper">
        <img class="pokemon-img"/>
    </span>

    <div class="pokemon-power">
        <span class ="hp"></span>
        <span class="pokemon-element"></span>
        <span class="attack-description"></span>
    </div>

    <div class="pokemon-details">
        <span class= "pokemon-length"></span>
        <span class= "pokemon-weight"></span>
    </div>
    <button class="pokemon-button"></button>
</div>
`;

class PokemonCard extends HTMLElement {
  constructor() {
    super();
    let number = (this.number = 1);

    // Now we can attach our template to the shadow DOM
    this.attachShadow({ mode: "open" });
    // append the template to the shadow DOM and clonde the content of the template
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".card-wrapper");
  }

  randomNumber() {
    return Math.floor(Math.random() * 151) + 1;
  }

  async pokemonData() {
    try {
      let res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.randomNumber()}/`
      );

      let data = await res.json();

      this.shadowRoot.querySelector(".pokemon-name").textContent = data.name;
      this.shadowRoot.querySelector(".pokemon-length").textContent =
        "Height " + data.height;
      this.shadowRoot.querySelector(".pokemon-weight").textContent =
        "Weight " + data.weight;

      this.shadowRoot.querySelector(
        ".pokemon-img-wrapper"
      ).innerHTML = `<img src="${data.sprites.front_shiny}" />`;

      this.shadowRoot.querySelector(
        ".pokemon-element"
      ).innerHTML = `${data.types[0].type.name}
       `;
      this.shadowRoot.querySelector(
        ".attack-description"
      ).innerHTML = `${data.abilities[0].ability.name}
       `;
      this.shadowRoot.querySelector(
        ".hp"
      ).innerHTML = `HP ${data.stats[0].base_stat}
       `;
      this.shadowRoot.querySelector(".pokemon-button").innerHTML =
        "Click to Generate";
    } catch {
      console.error("Error fetching data");
    }
  }

  connectedCallback() {
    this.pokemonData();
    this.shadowRoot
      .querySelector(".pokemon-button")
      .addEventListener("click", () => {
        console.log("clicked");
        this.pokemonData();
      });
  }
}

window.customElements.define("pokemon-card", PokemonCard);

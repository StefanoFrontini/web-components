const template = document.createElement("template");
template.setAttribute("shadowrootmode", "open");
template.innerHTML = `
<style>
:host {
  border: 2px solid red;
  display: block;
}
h3 {
  color: black;
}
.user-card {
    font-family: 'Arial', sans-serif;
    background: var(--backgroundColor);
    width: 600px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-bottom: darkorchid 5px solid;
}

.user-card img {
    width: 100%;
}

.user-card button {
    cursor: pointer;
    background: darkorchid;
    color: #fff;
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
}
.info p:first-child {
  font-weight: var(--cool-font-bold);
}
</style>

<header part="header">Header</header>
<div class="user-card">
  <img />
  <div>
    <h3></h3>
    <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
    <slot></slot>
    </div>
    <button id="toggle-info">Hide info</button>
  </div>
</div>
`;
class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }
  constructor() {
    super();

    this.showInfo = true;

    this.shadowDOM = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector(".info");
    const toggleBtn = this.shadowRoot.querySelector("#toggle-info");
    if (this.showInfo) {
      info.style.display = "block";
      toggleBtn.innerText = "Hide Info";
    } else {
      info.style.display = "none";
      toggleBtn.innerText = "Show Info";
    }
  }

  changeName(newName) {
    this.shadowRoot.querySelector("h3").innerText = newName;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      this.changeName(newValue);
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener();
  }
}

window.customElements.define("user-card", UserCard);

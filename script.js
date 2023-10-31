class App {
  constructor() {
    this.move = this.move.bind(this);
    this.getElements();
    this.addListeners();
  }

  getElements() {
    this.tower = document.querySelector(".tower");
    this.disks = this.tower.querySelectorAll("li");
    this.Label = document.querySelector("label");
    this.selected = null;
    return (this.moves = 0);
  }

  addListeners() {
    const self = this;
    return Array.from(this.disks).map((create) =>
    create.addEventListener("click", function () {
        if (self.selected === null) {
          this.classList.add("selected");
          return (self.selected = this);
        } else {
          return self.move(this);
        }
      })
    );
  }

  move(place) {
    const placeWidth = parseInt(
      guard(place.lastElementChild, "getAttribute", (a) =>
        a.getAttribute("data-width")
      )
    );
    const targetWidth = parseInt(
      guard(this.selected.lastElementChild, "getAttribute", (a1) =>
        a1.getAttribute("data-width")
      )
    );
    if (isNaN(placeWidth) || targetWidth < placeWidth) {
      place.appendChild(this.selected.lastElementChild);
      this.moves++;
      this.Label.innerHTML = this.moves;
    }
    this.selected.classList.remove("selected");
    return (this.selected = null);
  }
}
function guard(obj, methodName, transform) {
  if (
    typeof obj !== "undefined" &&
    obj !== null &&
    typeof obj[methodName] === "function"
  ) {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}

new App();

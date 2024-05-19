// Your code is going to go here

const Pet = (props) => {
  return React.createElement("div", { id: "petContainer" },
    [
      React.createElement("h1", {}, props.name),
      React.createElement("h2", {}, props.animal),
      React.createElement("h1", {}, props.breed)
    ]
  );
};

const App = () => {
  return React.createElement(
    "div",
    { id: "myID" },
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        name: "Raja",
        animal: "Dog",
        breed: "German"
      }),
      React.createElement(Pet, {
        name: "Ganja",
        animal: "Cat",
        breed: "American"
      }),
      React.createElement(Pet, {
        name: "Manja",
        animal: "Kangaroo",
        breed: "Australian"
      })
    ]
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
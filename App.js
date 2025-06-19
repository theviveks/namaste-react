const heading = React.createElement("h1", { id: "heading", xyz: "abc" }, "Namaste React");

const parent = React.createElement("div",
    { id: "parent" },
    [React.createElement("div", { id: "child" },
        [React.createElement("h1", {}, "I am h1 Tag"),
        React.createElement("h2", {}, "I am h1 Tag")]),
    React.createElement("div", { id: "child2" },
        [React.createElement("h1", {}, "I am h1 Tag"),
        React.createElement("h2", {}, "I am h1 Tag")])]);
console.log(parent)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
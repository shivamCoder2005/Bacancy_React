// const rootElement = document.getElementById("root");

// ************************** custom react and react dom  *************************************

// const React = {
//   createElement: function (tagName, children, attributes = {}) {
//     const newElement = document.createElement(tagName);
//     newElement.textContent = children;

//     for (let key in attributes) {
//       if (key == "style") Object.assign(newElement.style, attributes["style"]);
//       else newElement[key] = attributes[key];
//     }

//     return newElement;
//   },
// };

// const ReactDOM = {
//   render: function (childElement, parentElement = rootElement) {
//     parentElement.append(childElement);
//   }
// };

// **************** using React and ReactDOM *********************

// const myel1 = React.createElement("p", null, "paragraph 1");
// const myel2 = React.createElement("p", null, "paragraph 2");
// const myel3 = React.createElement("p", null, "paragraph 3");

// const el = React.createElement(
//   "h1",
//   {
//     id: "myh1",
//     style: {
//       width: "100px",
//       height: "100px",
//       backgroundColor: "red",
//     },
//   },
//   ["Hello World", 5, myel1, myel2, myel3],
// );
// console.log(el);

// const rootElement = ReactDOM.createRoot(document.getElementById("root"));
// rootElement.render(el);

// ReactDOM.render(h2Element);

// notes
// React is core library + ReactDOM is used for Web Pages

// React does not create a dom element
// it just creates an object which represent how the dom node should look like
// ReactDOM (Web) is responsible to create a dom element using object given by React

// similary we have React Native which is used by mobile applications

// *********************** Babel and JSX *************************************

// creating an react element using JSX

// const name = "shivam";
// const desc = "Bad Boy";
// const items = [
//   { id: 1, name: "tea", price: 10 },
//   { id: 2, name: "coffe", price: 15 },
//   { id: 3, name: "samosa", price: 30 },
// ];

// const myCustomElement = (
//   <div>
//     <h1>Name : {name}</h1>
//     <h2>Description :{desc}</h2>
//     <ul>
//       {items.map((item) => (
//         <div key={item.id}>
//           <p>{item.name}</p>
//           <p>{item.price}</p>
//         </div>
//       ))}
//     </ul>
//   </div>
// );

// // JSX ---> Babel --> React.createElement() --> js object --> ReactDOM.render() --> actual element

// const rootElement = ReactDOM.createRoot(document.getElementById("root"));
// rootElement.render(myCustomElement);

// *********************** React Components *************************************

function App(name, age) {
  return (
    <h1>
      My name is {name} and age is {age}
    </h1>
  );
}

const name = "shivam";
const age = 21;
const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(App(name, age));

// another way of calling react component (functions)
// rootElement.render(<App />);



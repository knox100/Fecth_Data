const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-card-container]");
const searchInput = document.querySelector("[data-search]");

// users object
let users = [];

// search for individual users
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  //filtering through the individual users to display in search result
  users.forEach((user) => {
    // diplay the users if the results contain the user name or email address
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    //toggle to add or remove the isVisible class
    user.element.classList.toggle("hide", !isVisible);
  });
});

// making a fecth request
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    //Displaying the individual user data into the template using forEach
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);
      return { name: user.name, email: user.email, element: card };
    });
  });

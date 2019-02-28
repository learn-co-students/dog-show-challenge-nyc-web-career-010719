document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector("#table-body");

  const dogForm = document.querySelector("#dog-form");
  const nameField = dogForm.querySelector("#edit-name");
  const breedField = dogForm.querySelector("#edit-breed");
  const sexField = dogForm.querySelector("#edit-sex");
  const idField = dogForm.querySelector("#edit-hidden-id");

  const dogsUrl = "http://localhost:3000/dogs";
  let allTheDogs = [];

  tableBody.addEventListener("click", e => {
    if (e.target.id == "edit-button") {
      let dog = allTheDogs.find(d => {
        return d.id == e.target.dataset.id;
      });
      editDogForm(dog);
    };
  });

  dogForm.addEventListener("submit", e => {
    e.preventDefault();
    let dog = allTheDogs.find(d => {
      return d.id == idField.value;
    });
    let data = {
      name: nameField.value,
      breed: breedField.value,
      sex: sexField.value,
    };
    editTheDoggo(dog, data);
  });

  function editDogForm(dog) {
    nameField.value = `${dog.name}`;
    breedField.value = `${dog.breed}`;
    sexField.value = `${dog.sex}`;
    idField.value = `${dog.id}`;
  };

  function editTheDoggo(dog, data) {
    fetch(`${dogsUrl}/${dog.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(resp => resp.json())
    .then(dog => updateAllTheDogs(dog))
    .then(dogs => getDogs())
  };

  function updateAllTheDogs(dog) {
    let localDog = allTheDogs.find(d => {
      return d.id == dog.id;
    });
    let index = allTheDogs.findIndex(d => {
      return d == localDog;
    });
    allTheDogs[index] = dog;
    return allTheDogs;
  };

  function getDogs() {
    allTheDogs = [];
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(dogs => {
      dogs.forEach(dog => {
        allTheDogs.push(dog);
      });
      return allTheDogs;
    })
    .then(allTheDogs => displayDogs(allTheDogs))
  };

  function displayDogs(dogs) {
    tableBody.innerHTML = "";
    dogs.forEach(function(dog) {
      tableBody.innerHTML += `
      <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id="edit-button" data-id="${dog.id}">Edit</button></td>
      </tr>
      `;
    });
  };

  getDogs();
});

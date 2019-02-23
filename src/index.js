document.addEventListener('DOMContentLoaded', () => {

  /*****************************************
  CONSTANTS & VARIABLE DECLARATIONS
  *****************************************/
  const tableBody = document.querySelector("#table-body")
  const dogForm = document.querySelector("#dog-form")
  let dogs = []

  /*****************************************
  FETCH REQUESTS
  *****************************************/
  //fetch get request from server
  fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  .then(parsedResponse => {
    dogs = parsedResponse
    // console.log(dogs[0]);
    addDogsToTable(dogs)
  })

  /*****************************************
  EVENT LISTENERS
  *****************************************/
  // add the click event listener to the edit button
  tableBody.addEventListener("click", function(event) {
    if (event.target.dataset.action == "edit" ) {
      findDogToEdit(event.target.dataset.id)
    }
  })

  dogForm.addEventListener("submit", function(event) {
    event.preventDefault(); // default is re-render of page

    // we're grabbing the ID
    let dogId = dogForm.querySelector("#dog-id").value

    // we're going to create data that stores what's on the form
    let data = {
      name: dogForm.querySelector("#dog-name").value,
      breed: dogForm.querySelector("#dog-breed").value,
      sex: dogForm.querySelector("#dog-sex").value
    }

    // console.log(data);
    // creating the patch request
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(function(res) {
      // this changes the dog array that we are using
      // right now, dogs is still the original array (no change has been made)
      let newDogs = dogs.map(function(dog) { // <= CHANGING the dog array we use
        if (dog.id == res.id) {
          return res
        } else {
          return dog
        }
      })
      tableBody.innerHTML = ""
      addDogsToTable(newDogs)
    })

  })

  /*****************************************
  HELPER FUNCTIONS
  *****************************************/
  // creates each line of the dog table
  // for each of the dogs in the array
  function addDogsToTable(dogs) {
    dogs.forEach(function(dog) {
      tableBody.innerHTML += `
      <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td>
          <button data-id="${dog.id}" data-action="edit">Edit</button>
        </td>
      </tr>`
    })
  }

  function findDogToEdit(id) {
    let dog = dogs.find(function(d) {
      return d.id == id
    })

    dogForm.innerHTML = `
      <input type="hidden" id="dog-id" value="${dog.id}">
      <input type="name" id="dog-name" name="name" placeholder="name" value="${dog.name}">
      <input type="breed" id="dog-breed" name="breed" placeholder="breed" value="${dog.breed}">
      <input type="sex" id="dog-sex" name="sex" placeholder="sex" value="${dog.sex}">
      <input type="submit"value="Submit">`
  }

}) // end of the DOMContentLoaded


let allDogs = []
document.addEventListener('DOMContentLoaded', () => {
  let dogDiv = document.querySelector("#table-body")
  let editButton = document.querySelector("#edit")
  let dogForm = document.querySelector("#dog-form")

  fetchDogs()

/**********************
fetches & renders dogs
***********************/

  function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(r=> r.json())
    .then(function(dogs){
      allDogs.push(dogs)
      renderAllDogs(dogs)
    })
  }

  function renderAllDogs(dogs){
    dogs.forEach(function(dog){
      renderOneDog(dog)
    })
  }

  function renderOneDog(dog){
    dogDiv.innerHTML += `
    <tr><td> ${dog.name} </td>
    <td> ${dog.breed} </td>
    <td> ${dog.sex} </td>
    <td><button data-id="${dog.id}" id="edit">Edit</button>
    </td></tr>
    `
  }

/**********************
        edits dogs
***********************/

document.addEventListener("click", function(e){
  let id = e.target.dataset.id
  console.log(id)
  editDog(id)
})

function editDog(id){
  let newName = dogForm.querySelector("#inputname").value
  let newBreed = dogForm.querySelector("#inputbreed").value
  let newSex = dogForm.querySelector("#inputsex").value
  let dogToEdit = allDogs.find(function(dog){
    return dog.id == id
  })
  let data = {
    name: newName,
    breed: newBreed,
    sex: newSex
  }
  console.log(id)
  console.log(allDogs)

  document.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e)
    fetch("http://localhost:3000/dogs"+`/${dogToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(function(updatedDog){
      newDogArray = allDogs.push(updatedDog)
      renderAllDogs(newDogArray)
    })
  })
  dogForm.reset()
}



})





// updatedDog = json

// event.preventDefault()
// console.log(e)
// let id = e.target.dataset.id
// console.log(id)
// // debugger
// // let dog = allDogs.find(dog => (id == dog.id))
// console.log(allDogs)
// // if (event.target.dataset.id == dog.id){
  // //   console.log("hello")
  // // }

  // if

document.addEventListener('DOMContentLoaded', () => {


const tableBody = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")
let dogs = []
// console.log(tableBody);

//fetch get request from server
fetch("http://localhost:3000/dogs")
.then(response => response.json())
.then(parsedResponse => {
  dogs = parsedResponse
  //console.log(dogs[0])
  addDogsToTable(dogs)
})

//###################
//event listeners
//###################

tableBody.addEventListener("click", function(event){
  if (event.target.dataset.action == "edit" ){
    console.log("you clicked edit")
    findDogToEdit(event.target.dataset.id);
    console.log(event.target.dataset.id);
  } //else {
    // console.log("you didn't click edit");
  //}

})

dogForm.addEventListener("submit", function(event){
  event.preventDefault(); // default is re-render page
  // console.log(event.target);
  //editSelectedDog(event)

  let dogId = dogForm.querySelector("#dog-id").value
  console.log(dogId)
  // console.log(dogName)
  let data = { //this is the new data of the dog that we are updating
    name: dogForm.querySelector("#dog-name").value,
    breed: dogForm.querySelector("#dog-breed").value,
    sex: dogForm.querySelector("#dog-sex").value

  }
  // console.log(data)
  fetch(`http://localhost:3000/dogs/${dogId}`, {
     method: "PATCH",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: JSON.stringify(data)
   })
   .then(response => response.json())
  // fetch(`http://localhost:3000/dogs/${dogId}`, {
  //   method: "PATCH",
  //   headers: {
  //     "Contect-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify(data)
  // })
  // .then(response => response.json())
  .then(function(parsedResponse){ //this is going to change the dog array that we are using
    console.log(parsedResponse);
    let newDogs = dogs.map(function(dog) {
      if (dog.id === parsedResponse.id){
        return parsedResponse
      } else {
        return dog
      }
    })
    tableBody.innerHTML = ""
    addDogsToTable(newDogs)
  })

})


//#########################
//helper functions
//#########################
// makes each line in the dog table
// for each of the dogs in the array
function addDogsToTable(dogs) {
  dogs.forEach(function(dog) {
    tableBody.innerHTML += `
    <tr>
      <td>Dog ${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
    <td><button data-id="${dog.id}" data-action="edit">Edit</button>
      </td>
    </tr>`
  })
}

//this finds and populates the dogForm

function findDogToEdit(id) {
  let dog = dogs.find(function(d){
    return d.id == id
  })

  dogForm.innerHTML = `
    <input type="hidden" id="dog-id" value="${dog.id}">
    <input type="name" id="dog-name" name="name" placeholder="name" value="${dog.name}">
    <input type="breed" id="dog-breed" name="breed" placeholder="breed" value="${dog.breed}">
    <input type="sex" id="dog-sex" name="sex" placeholder="sex" value="${dog.sex}">
    <input type="submit"value="Submit"> `
}









})

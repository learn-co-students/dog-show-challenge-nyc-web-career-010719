let tableBody = document.querySelector('#table-body')
let dogForm = document.querySelector('#dog-form')

tableBody.addEventListener('click', masterEventListener)
dogForm.addEventListener('submit', editDog)

document.addEventListener('DOMContentLoaded', () => {
fetchDogs()
})

function fetchDogs(){
  fetch (`http://localhost:3000/dogs`)
  .then(function(response) {
  return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    allDogs = myJson
    renderAllDogs(allDogs)
  });

}

function renderSingleDog(dog){
  tableBody.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id=${dog.id} class="edit">  Edit </button></td></tr>`
}

function renderAllDogs(dogs){
  tableBody.innerHTML = ""
  dogs.forEach(function(e){
    renderSingleDog(e)
  })


}

function masterEventListener(e){
  if (e.target.classList == "edit"){
    renderEditForm(e)
  }
}

function renderEditForm(e){
  e.preventDefault()
  let dog = allDogs.find(dog => dog.id == e.target.id)
  document.querySelector('#dog-form').name.value = `${dog.name}`
  document.querySelector('#dog-form').breed.value = `${dog.breed}`
  document.querySelector('#dog-form').sex.value = `${dog.sex}`
  document.querySelector('#dog-form').id.dataset.id = `${dog.id}`
}

function editDog(e){
  e.preventDefault()
  // let dog = allDogs.find(dog => dog.id == e.target.id.dataset.id)
  let name = e.target.name.value
  let breed = e.target.breed.value
  let sex = e.target.sex.value
  let data = {
    name: name,
    breed: breed,
    sex: sex
  }
  let dogID = e.target.id.dataset.id
  fetch (`http://localhost:3000/dogs/${dogID}`,{
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(data),
  }) // end fetch
  .then(function(response) {
  return response.json();
  })
  .then(function(myJson) {
  console.log(JSON.stringify(myJson));
  let dog = allDogs.find(dog => dog.id == e.target.id.dataset.id)
  dog.name = myJson.name
  dog.breed = myJson.breed
  dog.sex = myJson.sex
  renderAllDogs(allDogs)
  dogForm.reset()

  });
}

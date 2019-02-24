let dogsUrl = "http://localhost:3000/dogs"
let allDogs = []
// let dogFormName = document.querySelector('#dog-form').querySelector('input[name="name"]')

document.addEventListener('DOMContentLoaded', () => {
  const dogForm = document.querySelector('#dog-form')
  let dogsTable = document.querySelector('#dogs-table')
  let dogFormName = dogForm.querySelector('input[name="name"]')
  let dogFormBreed = dogForm.querySelector('input[name="breed"]')
  let dogFormSex = dogForm.querySelector('input[name="sex"]')
  let submit = dogForm.querySelector('input[type="submit"]')

  fetchDogs()

  dogsTable.addEventListener('click', function(event){
    if (event.target.name === "Edit") {
      let dog = allDogs.find(function(dog){
        return dog.id === parseInt(event.target.dataset.id)
      })
      dogFormName.value = dog.name
      dogFormBreed.value = dog.breed
      dogFormSex.value = dog.sex
      dogForm.setAttribute('data-id', `${dog.id}`)
      // console.log(submit.dataset.id )
      // submit.dataset.id = dog.id
      // set submoit data attribute to dog it
    }
  })

  dogForm.addEventListener('submit', function(event){
    event.preventDefault()
    // console.log(event)
    // console.log(dogFormName.value)
    // console.log(dogForm.dataset)
    // debugger

    console.log(allDogs)
    allDogs = allDogs.map(function(dog){
      if (dog.id === parseInt(dogForm.dataset.id)){
        dog.name = dogFormName.value
        dog.breed = dogFormBreed.value
        dog.sex = dogFormSex.value
        return dog
      }
      else {return dog}
    })
    console.log(allDogs)
    renderAllDogs(allDogs)


    fetch(`${dogsUrl}/${parseInt(dogForm.dataset.id)}`, {
      method: 'Patch',
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        "name": `${dogFormName.value}`,
        "breed": `${dogFormBreed.value}`,
        "sex": `${dogFormSex.value}`
      })
    })
    .then(res => res.json())
    .then(updatedDog => {
      console.log(updatedDog)
    })
  })

}) //end of doc load

function fetchDogs(){
  fetch(dogsUrl)
  .then (function (response){
    return response.json()
  })
  .then(function(dogs){
    allDogs = dogs
    console.log(allDogs)
    renderAllDogs(allDogs)
  })
}

function renderDog(dog){
  const dogsTable = document.querySelector('#dogs-table')
  dogsTable.innerHTML += `
  <tr>
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button data-id="${dog.id}" name="Edit">Edit Dog</button></td>
  </tr>
  `
}

function renderAllDogs(dogs){
  const dogsTable = document.querySelector('#dogs-table')
  dogsTable.innerHTML = `
    <thead class='blue'>
      <tr class='padding'>
        <th class='padding center'>Name</th>
        <th class='padding center'>Breed</th>
        <th class='padding center'>Sex</th>
        <th class='padding center'>Edit Dog</th>
      </tr>
    </thead>
    `
  dogs.forEach(function(dog){
    renderDog(dog)
  })
}

// function findDog(dog){
//   allDogs.find(function(dog){
//     return  dog.id === parseInt(event.target.dataset.id)
//   })
// }

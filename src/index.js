document.addEventListener('DOMContentLoaded', () => {
const dogContainer = document.querySelector('#table-body')
let allDogs = []

fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogs => {
    allDogs = dogs
    renderDogs(dogs)
  })

dogContainer.addEventListener("click", e => {
      if (e.target.dataset.action === "edit"){
      console.log(e.target.dataset.id)
      let dog = allDogs.find(p => p.id == e.target.dataset.id)
      console.log(dog)
      let editDogForm = document.querySelector('#dog-form')

      editDogForm.innerHTML = `
      <form id='dog-form' class="padding margin border-round border-grey" method="patch" action='dogs/${dog.id}' value=${dog.id}>
      <input type="hidden" id="dog-id" value="${dog.id}">
        <input type="name" name="name" value=${dog.name}>
        <input type="breed" name="breed" placeholder="breed" value=${dog.breed}>
        <input type="sex" name="sex" placeholder="sex" value=${dog.sex}>
        <input type="submit"value="Submit">
      </form>
      `
      editDogForm.addEventListener("submit", handleEditDog)
    }
    })


function handleEditDog(e) {
      e.preventDefault()
      console.log('hi')
      let id = e.target.querySelector('#dog-id').value
      // debugger
      let data = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value,
      }
      fetch(`http://localhost:3000/dogs/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": 'application/json',
          "Accepts": 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
           let updatedDog = data
           let newDogs = allDogs.map(dog =>{
             if (updatedDog.id === dog.id) {
               return updatedDog
             } else {
               return dog
             }
           })
           dogContainer.innerHTML = ""
           renderDogs(newDogs)
         })
       }
function renderSingleDog(dog) {
      dogContainer.innerHTML += `
      <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-action="edit" data-id=${dog.id}>Edit</button></td></tr>
      `
    }
function renderDogs(arr) {
      arr.map(renderSingleDog).join('')
    }

console.log("dom fully loaded")
})

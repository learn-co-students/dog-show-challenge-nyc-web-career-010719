let allDogs = []
let table = document.querySelector("#table-body")
let form = document.querySelector("#dog-form")

document.addEventListener("DOMContentLoaded", () => {
  getDogs()

  document.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.id === "editBtn") {
      editForm(e.target.parentElement.parentElement)
      document.addEventListener("submit", editDog)
    }
  })

})

function editDog(e) {
  let dName = e.target.name.value
  let dBreed = e.target.breed.value
  let dSex = e.target.sex.value
  let dId = parseInt(e.target.querySelector("#name").dataset.id)
  fetch(`http://localhost:3000/dogs/${dId}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({name: dName, breed: dBreed, sex: dSex})
  })
  .then(resp => resp.json())
}

function editForm(edit) {
  let name = edit.querySelector("#name").innerText
  let breed = edit.querySelector("#breed").innerText
  let sex = edit.querySelector("#sex").innerText
  let id = edit.dataset.id
  form.innerHTML = `
  <input data-id=${id} id="name" type="name" name="name" placeholder="name" value="${name}">
  <input id="breed" type="breed" name="breed" placeholder="breed" value="${breed}">
  <input id="sex" type="sex" name="sex" placeholder="sex" value="${sex}">
  <input type="submit"value="Submit">
  `
}

function getDogs() {
  fetch('http://localhost:3000/dogs')
  .then(resp => resp.json())
  .then(function(dogs) {
    allDogs = dogs
    renderDogs(dogs)
  })
}

function renderDogs(dogs) {
  dogs.forEach(function(dog) {
    renderDog(dog)
  })
}

function renderDog(dog) {
  table.innerHTML += `
  <tr data-id=${dog.id}>
    <td id="name">${dog.name}</td>
    <td id="breed">${dog.breed}</td>
    <td id="sex">${dog.sex}</td>
    <td><button id="editBtn">Edit</button></td>
  </tr>
  `
}



































// document.addEventListener('DOMContentLoaded', () => {
//   fetchDogs()
//   let table = document.querySelector('#table-body')
//   table.addEventListener("click", function(e) {
//     if (e.target.class = "editBtn") {
//       let form = document.querySelector("#dog-form")
//       let dog = allDogs.find(dog => dog.id == e.target.id)
//       form.innerHTML = `<form id='dog-form' class="padding margin border-round border-grey" action="dogs/${dog.id}" method="patch">
//         <input type="hidden" value="${dog.id}">
//         <input type="name" name="name" value="${dog.name}">
//         <input type="breed" name="breed" value="${dog.breed}">
//         <input type="sex" name="sex" value="${dog.sex}">
//         <input type="submit"value="Submit">
//       </form>`
//       form.addEventListener("submit", editDog)
//     }
//   })
// })
//
// allDogs = []
//
// function fetchDogs() {
//   let table = document.querySelector('#table-body')
//   fetch('http://localhost:3000/dogs')
//   .then(dogs => dogs.json())
//   .then(function(parsed) {
//     for (var dog in parsed) {
//       allDogs.push(parsed[dog]);
//       table.innerHTML += `
//       <tr id = "dog-${parsed[dog].id}">
//         <td class='padding center' id = 'name'>${parsed[dog].name}</td>
//         <td class='padding center' id = 'breed'>${parsed[dog].breed}</td>
//         <td class='padding center' id = 'sex'>${parsed[dog].sex}</td>
//         <td class='padding center'>
//           <button class = 'center editBtn' id="${parsed[dog].id}" >Edit</button>
//         </td>
//       </tr>`
//     }
//   })
// }
//
// function editDog(e) {
//   e.preventDefault()
//   let name = e.target.name.value
//   let breed = e.target.breed.value
//   let sex = e.target.sex.value
//   let id = e.target[0].value
//   let data = {
//     name: name,
//     breed: breed,
//     sex: sex
//   }
//
//   fetch(`http://localhost:3000/dogs/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": 'application/json',
//       "Accepts": 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).
//   then(res => res.json())
//   .then(updatedDog => {
//     allDogs = allDogs.map(dog => {
//       if (dog.id == updatedDog.id) {
//         return updatedDog
//       } else {
//         return dog
//       }
//     })
//     let table = document.querySelector('#table-body')
//     table.innerHTML = ""
//     fetchDogs()
//   })
// }
//
// function renderDogs(dogs) {
//   let table = document.querySelector('#table-body')
//   table.innerHTML = ""
//   dogs.forEach(renderDog)
// }
//
// function renderDog(dog) {
//   let table = document.querySelector('#table-body')
//   table.innerHTML += `
//   <tr id = "dog-${dog.id}">
//     <td class='padding center' id = 'name'>${dog.name}</td>
//     <td class='padding center' id = 'breed'>${dog.breed}</td>
//     <td class='padding center' id = 'sex'>${dog.sex}</td>
//     <td class='padding center'>
//       <button class = 'center editBtn' id="${dog.id}" >Edit</button>
//     </td>
//   </tr>`
// }

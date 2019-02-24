let allDogs = []

document.addEventListener('DOMContentLoaded', () => {

  fetch("http://localhost:3000/dogs")
  .then(resp => resp.json())
  .then(parsed => {
    // render each dog as a row on the table
    parsed.forEach(dog => renderDog(dog))
    allDogs = parsed
  })


  const table = document.querySelector("#table-body")
  // add event listener to table
  table.addEventListener("click", fillEditForm)

})



// fills edit form with dog's current info
function fillEditForm(e) {
  e.preventDefault()
  let form = document.querySelector("#dog-form")
  if (e.target.dataset.id){
    let dog = allDogs.find(dog => dog.id == e.target.dataset.id)
    form.children[0].value = dog.name
    form.children[1].value = dog.breed
    form.children[2].value = dog.sex
    form.setAttribute("data-id", `${dog.id}`)
    form.addEventListener("submit", editDog)
  }
}

// updates db with dog info from form
function editDog(e) {
  e.preventDefault()
  let form = document.querySelector("#dog-form")
  let name = form.children[0].value
  let breed = form.children[1].value
  let sex = form.children[2].value
  let dog = allDogs.find(dog => dog.id == e.target.dataset.id)

  let data = {
    name: name,
    breed: breed,
    sex: sex
  }

  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "accepts": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(newDog => {
    newDogs = allDogs.map(dog => {
      if (dog.id == newDog.id) {
        return newDog
      }
      else {
        return dog
      }
    })

  // updates local variable
  allDogs = newDogs

  const table = document.querySelector("#table-body")
  table.innerHTML = ""

  // renders all dogs again
  newDogs.forEach(dog => renderDog(dog))
  })
}



function renderDog(dog) {
  const table = document.querySelector("#table-body")
  table.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`
}

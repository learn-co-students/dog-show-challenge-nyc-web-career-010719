let allDogs = []
document.addEventListener('DOMContentLoaded', () => {
  table = document.querySelector('#table-body')

  fetch("http://localhost:3000/dogs")
  .then(promise => {
    return promise.json()
  }).then(file => {
    let dogsHTML = file.map(dog =>{
      return `
      <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td>
       <td><button data-id=${dog.id} >Edit</button></td></tr>
      `
    })
    table.innerHTML = dogsHTML.join('')
    allDogs = file
  })
  table.addEventListener('click', fillEditForm)


  function fillEditForm(e){
    console.log(e.target.dataset.id)
  let dogForm = document.querySelector("#dog-form")
  if (e.target.dataset.id){

    let dog = allDogs.find(dog => dog.id == e.target.dataset.id)

    dogForm.children[0].value = dog.name
    dogForm.children[1].value = dog.breed
    dogForm.children[2].value = dog.sex
    dogForm.setAttribute("data-id", `${dog.id}`)

    }
  }

    document.querySelector("#dog-form").addEventListener('submit', editDog)

    function editDog(e){
      console.log("working")
      e.preventDefault()
      let dogForm = document.querySelector("#dog-form")
      let name = dogForm.children[0].value
      let breed = dogForm.children[1].value
      let sex = dogForm.children[2].value
      let dog = allDogs.find(dog => dog.id == e.target.dataset.id)

      let data = {
        name: name,
        breed: breed,
        sex: sex
      }

    fetch(`http://localhost:3000/dogs/${dog.id}`, {method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then (resp => resp.json())
  .then (newDog => {
    let puppy = allDogs.find(dog => dog.id == newDog.id)
      puppy.name = newDog.name
      puppy.breed = newDog.breed
      puppy.sex = newDog.sex

    let dogsHTML = allDogs.map(dog =>{
      return `
      <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td>
       <td><button data-id=${dog.id} >Edit</button></td></tr>
      `
    })
    table.innerHTML = dogsHTML.join('')
  })
}


})

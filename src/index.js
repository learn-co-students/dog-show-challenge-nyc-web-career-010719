document.addEventListener('DOMContentLoaded', () => {
  let dogsArray = []
  const tableBody = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  const editBtn = document.querySelector('#update')

  //fetch request to get all dogs to page
  fetch('http://localhost:3000/dogs')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    dogsArray = data
    renderDogsToPage(dogsArray)
  })

  //event listener for editing a dog
  tableBody.addEventListener('click', renderDogToEditForm)


  //event listener for updating dog form
  dogForm.addEventListener('click', handleUpdateDog)

  //helper funtion to render all dogs
  function renderDogsToPage(dogs){
    dogs.map(renderSingleDogToPage).join('')
  }

  //helper function to render single dog to page
  function renderSingleDogToPage(dog){
    const tableBody = document.querySelector('#table-body')
    tableBody.innerHTML += `<tr data-id="${dog.id}"><td id="dog-name"> ${dog.name} </td> <td id="dog-breed"> ${dog.breed} </td> <td id="dog-sex"> ${dog.sex} </td> <td><button data-id="${dog.id}" id="edit-btn">Edit</button></td></tr>`
  }
  //helper function to edit a dog
  function renderDogToEditForm(e){
    if (e.target.id === 'edit-btn') {
      let dog = dogsArray.find(d => d.id == e.target.dataset.id)
      let data = {
        name: dog.name,
        breed: dog.breed,
        sex: dog.sex
      }

      //fetch request to edit specific dog
      fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        let updatedDog = data
          dogForm.innerHTML = `<input id="name" type="name" name="name" placeholder="" value="${updatedDog.name}">
          <input id="breed" type="breed" name="breed" placeholder="" value="${updatedDog.breed}">
          <input id="sex" type="sex" name="sex" placeholder="" value="${updatedDog.sex}">
          <input data-id="${updatedDog.id}" id="update" type="submit" value="Edit">`
      })
    }
  }

  function handleUpdateDog(e){
    e.preventDefault()
    if (e.target.id === "update") {
      let dog = dogsArray.find(d => d.id == e.target.dataset.id)
      let name = document.querySelector('#name').value
      let breed = document.querySelector('#breed').value
      let sex = document.querySelector('#sex').value
      // let dogTdName = document.querySelector('#dog-name')
      // let dogTdBreed = document.querySelector('#dog-breed')
      // let dogTdSex = document.querySelector('#dog-sex')

      let data = {
        name: name,
        breed: breed,
        sex: sex
      }

      //fetch to update the DB with the edited dog
      fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        let updatedDog = data

        //set the map to a new array (replacing the old dog with the updated dog) and then re-render the page with that new array. This will prevent the update happening on any other element EXCEPT the one you are trying to edit.
        let newDogs = dogsArray.map(dog =>{
          if (updatedDog.id === dog.id) {
            return updatedDog
          } else {
            return dog
          }
        })
        tableBody.innerHTML = ""
        renderDogsToPage(newDogs)
      })
    }
  }
})

document.addEventListener('DOMContentLoaded', () => {

  //VARIABLES===================================================================
  const allDogsURL = "http://localhost:3000/dogs"
  const dogTable = document.querySelector(".margin")
  const tableHead = document.querySelector(".blue")
  // const editButton = document.querySelector("#edit-button")

  //CALLS=======================================================================
  fetchDogs(allDogsURL)

  //EVENT LISTENERS=============================================================
  dogTable.addEventListener('click', (e)=> {
    console.log(e.target)
  })

  //FUNCTIONS===================================================================
  function fetchDogs(url){
    fetch(url)
    .then(response => response.json())
    .then(parsedJSON => {
      renderAllDogs(parsedJSON)
    })
  }

  function renderDog(dog){
    tableHead.innerHTML += `
    <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id="edit-button" data-id=${dog.id}>Edit</button></td></tr>
    `
  }

  function renderAllDogs(dogs){
    dogs.forEach(renderDog)
  }
})

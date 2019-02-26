document.addEventListener('DOMContentLoaded', () => {
  const dogTable = document.querySelector('#table-body')
  const dogUrl = 'http://localhost:3000/dogs'
  const dogForm = document.querySelector('#dog-form')
  let allDogs = []

  let currentData = function(){
    fetch(dogUrl)
    .then(function(res) {
      return res.json()
    })
    .then(function(dogs) {
      dogTable.innerHTML = ""
      allDogs = dogs
      allDogs.forEach(showDog)
    })
  }
  currentData()

dogTable.addEventListener('click', function(e) {
    let dogForm = document.querySelector('#dog-form')
    let dog = allDogs.find(dog => dog.id === parseInt(e.target.id))
    if (e.target.dataset.action === "edit"){
      dogForm.children[0].value = dog.name
      dogForm.children[1].value = dog.breed
      dogForm.children[2].value = dog.sex
    }
    dogForm.addEventListener('submit', (e) => {
      e.preventDefault()
      fetch(dogUrl + `/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": `${dogForm.children[0].value}`,
          "breed": `${dogForm.children[1].value}`,
          "sex": `${dogForm.children[2].value}`
        })
      })
      .then(res => res.json())
      .then(function(editDog) {
        
        currentData()
      })
    })
  })

  function showDog(dog){
    dogTable.innerHTML += `
    <tr><td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button id="${dog.id}" data-action="edit">Edit</button></td></tr>
    `
  }

})

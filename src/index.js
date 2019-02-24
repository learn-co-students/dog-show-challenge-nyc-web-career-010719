document.addEventListener('DOMContentLoaded', () => {
  let allDogs = []
  const doggoTable = document.querySelector('table')
  const dogForm = document.querySelector('#dog-form')

  fetch('http://localhost:3000/dogs')
  .then(r => r.json())
  .then(dogs => {
    allDogs = dogs
    renderAllDogToPage(dogs)
  })

  doggoTable.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'edit') {
      console.log("I'm clicked.")
      const dogPicked = e.target.dataset.id
      dogForm.innerHTML += `<input type="hidden" name="dogId" value="${dogPicked}" />`
      const nameInput = dogForm.querySelector('[name=name]')
      const breedInput = dogForm.querySelector('[name=breed]')
      const sexInput = dogForm.querySelector('[name=sex]')
      const dogInfo = allDogs.find(dog => dog.id === parseInt(dogPicked))
      nameInput.value = dogInfo.name
      breedInput.value = dogInfo.breed
      sexInput.value = dogInfo.sex
    }
  })

  dogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const dogPicked = allDogs.find(dog => dog.id == e.target.dogId.value)
    const dogId = dogPicked.id
    const dogName = e.target.name.value
    const dogBreed = e.target.breed.value
    const dogSex = e.target.sex.value
    const data = {
      id: parseInt(dogId),
      name: dogName,
      breed: dogBreed,
      sex: dogSex
    }
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
        "Accepts":"application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(dog => {
      allDogs = allDogs.map(dog => {
        if (dog.id === data.id) {
          return data
        } else {
          return dog
        }
      })
      renderAllDogToPage(allDogs)
    })
  })
})

function renderAllDogToPage(dogs) {
  const dogTable = document.querySelector('#table-body')
  dogTable.innerHTML = ''
  for (const dog of dogs) {
    renderSingleDogToPage(dog)
  }
}

function renderSingleDogToPage(dog) {
  const dogTable = document.querySelector('#table-body')
  dogTable.innerHTML += `
  <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-action="edit" data-id="${dog.id}">Edit</button></td></tr>
  `
}

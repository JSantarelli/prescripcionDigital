/* 

FLUJO BASICO
1. Usuario busca meds
    a. Usuario selecciona fecha inicio / fin
    b. Sistema calcula duración
    c. Sistema calcula dosis necesaria
    d. El resultado es mostrado en el contenedor al confirmar
2. Selección med
3. Meds seleccionados se muestran en contenedor
4. Usuario guarda prescripción

*/


// Renderizo resultados

const resultsContainer = document.getElementById('containerResults')

// Declaraciones prescripción
const selectedMeds = () => JSON.parse(localStorage.getItem('prescription')) || []
const prescription = selectedMeds()
const url = 'assets/js/meds.json'
const meds = [] 


// Armado de prescripcion en base a meds seleccionados
function getCard(med) {
  return `
      <li role="button" aria-label="${med.nombreComercial}" class="card--vertical">
          <h3>${med.nombreComercial}</h3> 
          <button id="${med.id}" class="card__btn--outline">Agregar</button>
      </li>
      `
}

getError = () => {
  getError = () => {
    return `
            <h3>
              Error!
            </h3>
            `
  }
}

listMeds = () => {
  //   for(let i in vademecum) {
  //   resultsContainer.innerHTML += 
  //     `<li>
  //       <p>${vademecum[i].nombreComercial}</p>
  //       <button id="${vademecum[i].id}" class="card__btn--outline">Agregar</button>
  //     </li>`
  // }

  resultsContainer.innerHTML = ''
  vademecum.length > 0 ? vademecum.forEach((med) => resultsContainer.innerHTML += getCard(med))
                  : resultsContainer.innerHTML = getError()
  activateButtons()
}

activateButtons = () => {
  const buttons = document.querySelectorAll('button.card__btn--outline')
  for (let btn of buttons) {
    btn.addEventListener('click', (e)=> {
        const selectedMed = vademecum.find((med) => med.id === parseInt(e.target.id))
        console.log(e.target.id, selectedMed)
        prescription.push(selectedMed)
        alert(`The med '${selectedMed.nombreComercial}' has been added`)
        localStorage.setItem('prescription', JSON.stringify(prescription))
      })
    }
}

listMeds()

// Cargo tarjetas de meds
let containerMeds = document.querySelector('div#containerMeds')

function loadCards() {
    containerMeds.innerHTML = ''
    meds.forEach((item) => {
         containerMeds.innerHTML += getCard(item)

    })
}

loadCards()
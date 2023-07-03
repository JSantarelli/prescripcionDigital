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

// Muestro info paciente
const patientName = document.querySelector('#patientInfo')
const savePatient = document.querySelector('#btnRegister')

savePatient.addEventListener('click', () => {
    if (patientName.value !== '') {
        localStorage.setItem('namePatient', patientName.value)
        displayPatientInfo()
    }
})

displayPatientInfo = () => {
  if (localStorage.getItem('namePatient')) {
    patientName.value = localStorage.getItem('namePatient')
  }
  document.getElementById('namePatient').innerHTML = patientName.value
}

// Renderizo resultados
const resultsContainer = document.getElementById('containerResults')

// Declaraciones prescripción
const selectedMeds = () => JSON.parse(localStorage.getItem('prescription')) || []
const prescription = selectedMeds()
const url = 'assets/js/meds.json'
const meds = [] 


// Armado de prescripcion en base a meds seleccionados
getList = (med) => {
  return `
      <li role="button" aria-label="${med.nombreComercial}" class="">
          <h3>${med.nombreComercial}</h3>
          <small>${med.concentracion} ${med.presentacion.formaFarmaceutica}</small>
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
  vademecum.length > 0 ? vademecum.forEach((med) => resultsContainer.innerHTML += getList(med))
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

function removeMed() {
  localStorage.removeItem()
}

// Cargo tarjetas de meds
const containerMeds = document.querySelector('div#containerMeds')

displayPrescription = () => {
  prescription.forEach((localPrescription, i) => containerMeds.innerHTML += 
     `<div class="card--vertical">
            <h3>${localPrescription.nombreComercial}</h3>
            <small>${localPrescription.presentacion.cantidad} ${localPrescription.presentacion.formaFarmaceutica}</small>
            <form>
              <fieldset>
              <legend>Dosage</legend>
                <label for="${i}">Amount</label><br>
                <input type="number" id="${i}" onchange="getMedCount(${i})"/><br>

                <label for="presentationType">Type</label><br>
                <select name="presentationType" class="selectTypes" id="selectType-${i}">
                  <option id="0">Select a type</option>
                </select><br>
                
                <label for="dosisCantidad">Every</label><br>
                <input type="number" name="dosisCantidad"><br>
      
                <label for="tiempoFormato">Time format</label><br>
                <select name="tiempoFormato" id="">
                    <option value="0">Minutes (min)</option>
                    <option value="1">Hours (hs)</option>
                    <option value="2">Days (d)</option>
                    <option value="3">Weeks (w)</option>
                </select>

                <hr>
                <legend>Time frame</legend>
                  <label for="${i}">Start date</label>
                  <input type="date" id="${i}" onchange="getStartDate(${i})"/>

                  <label for="${i}">End date</label>
                  <input type="date" id="${i}" onchange="getEndDate(${i})"/>
                  <h5 class="startDateHolder"></h5>
                  <h5 class="endDateHolder"></h5>
                  <button onclick="removeMed()">x</button>
                  <button type="submit" disabled>Editar</button>
                  <button type="submit">Guardar</button>
              </fieldset>
            </form>
          </div>`
    )
  }

  displayPrescription()


  // DOSIS

  let medCount = document.getElementById('medCount')

  let dailyDosage // calc weeklyDosage
  
    
// Recorro cada medicamento de la prescripción
getMedCount = (i) => {
  const inputsCount = document.querySelectorAll('input[type="number"]')
  for (let i = 0; i < inputsCount.length; i++) {
    inputsCount[i].onclick = function() {
       console.log(inputsCount[i].value)
    }
  }
}

// Map + filter
getMedTypes = () => {
  const arrayCategorias = vademecum.map ((med)=> { return med.presentacion.formaFarmaceutica })
  const categoriasUnicas = [...new Set (arrayCategorias)]
  const typeOptions = document.getElementById('selectType-0')
  categoriasUnicas.forEach((formaFarmaceutica) => {
  const results = vademecum.filter((med)=> med.presentacion.formaFarmaceutica === formaFarmaceutica)

    for(let i in results) {
      typeOptions.innerHTML += 
        `<option>${results[i].presentacion.formaFarmaceutica}</option>`
    }
  })
}

getMedTypes()



// CALENDAR

// Calculo duración del tratamiento | TODO: Implementar con Luxon y en cada medicamento

// function calcDuration() {
//   let medStart = document.getElementById('medStart').value;
//   let medEnd = document.getElementById('medEnd').value;
//   let treatmentDuration = new Date(medEnd).getTime() - new Date(medStart).getTime();
//   let treatmentDays = treatmentDuration / (1000 * 3600 * 24);
//   document.getElementById("treatmentDuration").innerHTML = treatmentDays;
// }

// const savePrescription = document.querySelector("button [type='submit']")

calcDuration = (i) => {
  const startDateText = document.querySelectorAll('h5.startDateHolder')
  // if (startDateText.textContent !== '') {
  //   for (let i = 0; i < startDateText.length; i++) {
  //     console.log(startDateText[i])
  //   }
  // }
  // const endDateHolder = document.querySelectorAll('h5.endDateHolder')

  // let treatmentDuration = new Date(endDateHolder).getTime() - new Date(startDateHolder).getTime();
  // let treatmentDays = treatmentDuration / (1000 * 3600 * 24);
  // document.getElementById("treatmentDuration").innerHTML = treatmentDays;
  // console.log(treatmentDays)
}

getStartDate = (i) => {
  const inputsStartDate = document.querySelectorAll('input[type="date"]')
  const startDateHolder = document.querySelectorAll('h5.startDateHolder')
  for (let i = 0; i < inputsStartDate.length; i++) {
    inputsStartDate[i].onclick = function() {
      // console.log(inputsStartDate[i].value)
      startDateHolder[i].textContent = inputsStartDate[i].value
    }
  }
}

getEndDate = (i) => {
  const inputsEndDate = document.querySelectorAll('input[type="date"]')
  const endDateHolder = document.querySelectorAll('h5.endDateHolder')
  for (let i = 0; i < inputsEndDate.length; i++) {
    inputsEndDate[i].onclick = function() {
      // console.log(inputsEndDate[i].value)
      endDateHolder[i - 1].textContent = inputsEndDate[i].value
    }
    // calcDuration()
  }
}



// let elements = document.querySelectorAll('div');
// for (var x = 0; x < elements.length; x++) {
//   elements[x].onclick = function(){
//     this.style.fontSize = "20px";
//   }
// };

// const input = document.querySelector('input');
// document.querySelector('#moods').addEventListener('click', (e) => {
//   if (e.target.matches('li')) {
//     input.value = e.target.textContent;
//   }
// });
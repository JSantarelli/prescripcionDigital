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

Machete: [^="start"]  [*="contain"]  [$="ends"]
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
  const addButtons = document.querySelectorAll('button.card__btn--outline')
  for (let btn of addButtons) {
    btn.addEventListener('click', (e)=> {
        const selectedMed = vademecum.find((med) => med.id === parseInt(e.target.id))
        console.log(e.target.id, selectedMed)

        // MODAL
        confirmMed = () => {
          Swal.fire (
            {
              title: `The med '${selectedMed.nombreComercial}' has been added`,
              showCancelButton: true,
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              // Define estructura para manipular respuestas según interacción del usuario
            }).then((result) => {
              if (result.isConfirmed) {
                  prescription.push(selectedMed)
                  localStorage.setItem('prescription', JSON.stringify(prescription))
                  Swal.fire( '${selectedMed.nombreComercial} has been added', 'Description text' , 'success')
                      } else if (result.isDenied) {
                      Swal.fire( '${selectedMed.nombreComercial} could not be added', '', 'info')
              }
          })
        }
        confirmMed()
      })
    }
}


listMeds()


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
                <select name="presentationType" class="selectTypes" id="selectType--${i}">
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
                  <input type="date" id="startDate--${i}" onchange="getStartDate(${i})"/>

                  <label for="${i}">End date</label>
                  <input type="date" id="endDate--${i}" onchange="getEndDate(${i})"/>
                  <h5 id="startDateHolder--${i}" class="startDateHolder"></h5>
                  <h5 id="endDateHolder--${i}" class="endDateHolder"></h5>
                  <button id="removeBtn--${i}" class="form__btn--warn">x</button>
                  <button type="submit" disabled>Editar</button>
                  <button type="button" id="saveButton--${i}" onclick="savePrescription()">Guardar</button>
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
  document.querySelectorAll('[id^="selectType--"]').forEach((select) =>
    categoriasUnicas.forEach((formaFarmaceutica) => {
    const results = vademecum.filter((med)=> med.presentacion.formaFarmaceutica === formaFarmaceutica)
  
      for(let i = 0; i < results.length; i++) {
        select.innerHTML += 
          `<option>${results[i].presentacion.formaFarmaceutica}</option>`
      }
    }
    )
  )
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

const inputsStartDate = document.querySelectorAll('[id^="startDate--"]')
const inputsEndDate = document.querySelectorAll('[id^="endDate--"]')
const startDateHolder = document.querySelectorAll('[id^="startDateHolder--"]')
const endDateHolder = document.querySelectorAll('[id^="endDateHolder--"]')

// var date1 = new Date(document.getElementById("fromDatePicker").value);
// var date2 = new Date(document.getElementById("toDatePicker").value);

// var difference = date2 - date1;

// var days = difference/(24*3600*1000);

calcDuration = () => {

    inputsStartDate.forEach((startHolder) => {
      
      if (inputsStartDate.textContent !== '') {
        const n = document.getElementById(startHolder.id).value
        let x = new Date(n).getTime()
        console.log(x)
      }  })
      
      endDateHolder.forEach((endHolder) => {
        if (endDateHolder.textContent !== '') {
          const c = document.getElementById(endHolder.id).value
          let d = new Date(c).getTime()
          console.log(d)
        }
      })
      
  
  // let treatmentDuration = new Date(endDateValue).getTime() - new Date(startDateValue).getTime();
  // let treatmentDays = treatmentDuration / (1000 * 3600 * 24);

  // document.getElementById("treatmentDuration").innerHTML = treatmentDays;
}


savePrescription = () => {
  document.querySelectorAll('[id^="saveButton--"]').forEach((btn) => {
    
    btn.addEventListener('click', (e)=> {
      calcDuration()
    }

 ) }) 
}

// Borrar prescripción entera
const removeBtn = document.getElementById('removePrescription')

removeBtn.addEventListener('click', (e)=> {
    localStorage.removeItem('prescription')
  }
)

// Borrado selectivo
removeMed = () => {
  // prescription.forEach((i) => {
    const xBtn = document.querySelectorAll('[id^="removeBtn--"]')
    console.log(xBtn.length)
    for (let i = 0; i < xBtn.length; i++) {
      xBtn[i].addEventListener('click', (e)=> {
        
        const selectedLocalMed = prescription.find((localMed) => localMed.id === parseInt(e.target.id))
        prescription.splice(selectedLocalMed, i)
        // console.log(selectedLocalMed)
        
        // if (localMed.id == e.target.id) {
        //   localMed.splice(i, 1);
        //   }
        }
      )
    }
}
  
  // for (let i =0; i < prescription.length; i++) {
  //   ) 
  //   localMed = JSON.stringify(prescription)
  //   localStorage.setItem('prescription', prescription)
  // }




// CALENDAR
getStartDate = (i) => {
  
  for (let i = 0; i < inputsStartDate.length; i++) {
    startDateHolder[i].textContent = inputsStartDate[i].value
    let d = inputsStartDate[i].value
    let x = new Date(d).getTime()
    if (startDateHolder.textContent != '') {
    }
  }
}

getEndDate = (i) => {

  for (let i = 0; i < inputsEndDate.length; i++) {
    endDateHolder[i].textContent = inputsEndDate[i].value
    }
  }


// INTERACTIVIDAD

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
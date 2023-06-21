// Alimento select con medicamentos
dropdownMeds = document.getElementById('nombreMedicamento')

listarMedicamentos = () => {

  for(let i in vademecum) {
    dropdownMeds.innerHTML += `<option value="${i}">${vademecum[i].nombreComercial}</option>`
  }
}

listarMedicamentos()

// Forma farmacéutica
dropdownUnits = document.getElementById('dosisUnidad')

listarUnidades = () => {

  for(let i in unidades) {
    dropdownUnits.innerHTML += `<option value="${i}">${unidades[i]}</option>`
  }
}

listarUnidades()

// Obtengo medicamento seleccionado
function getCantidad() {
  let cantidad = document.getElementById('dosisCantidad').value
  console.log(cantidad)
  }


// Obtengo medicamento seleccionado
function seleccionarMed() {
  let selectedMed = dropdownMeds.options[dropdownMeds.selectedIndex]
  console.log(selectedMed.text)
  }


// Pusheo datos a localStorage
  const nombrePaciente = document.querySelector('#infoPaciente')
  const medName = document.querySelector('#nombreMedicamento')
  const medNumber = document.querySelector('#dosisCantidad')
  const medUnit = document.querySelector('#dosisUnidad')
  const btnStorage = document.querySelector('#btnStorage')
  
  btnStorage.addEventListener('click', () => {
      if (medName.text !== '') {
          localStorage.setItem('nombreMedicamento', medName.text)
      }
      if (medNumber.value !== '') {
          localStorage.setItem('dosisCantidad', medNumber.value)
      }
      if (medUnit.value !== '') {
          localStorage.setItem('dosisUnidad', medUnit.value)
      }
  })
  
    if (localStorage.getItem('nombreMed')) {
      medName.text = localStorage.getItem('nombreMed')
    }
    if (localStorage.getItem('dosisCantidad')) {
      medNumber.value = localStorage.getItem('dosisCantidad')
    }
    if (localStorage.getItem('dosisUnidad')) {
      medUnit.value = localStorage.getItem('dosisUnidad')
    }
  


// Objeto medicamento
const medicamentos = [
  {
      id: 123,
      nombreComercial: 'Ibuprofeno',
      dosisCantidad: 30,
      dosisUnidad: 'Comprimidos'
  },
  {
    id: 264,
    nombreComercial: 'Lorazepam',
    dosisCantidad: 50,
    dosisUnidad: 'Comprimidos'
  },
  {
    id: 873,
    nombreComercial: 'Oxycontin',
    dosisCantidad: 12,
    dosisUnidad: 'Comprimidos'
  }
] 


// Almaceno tabla en localStorage: localStorage no permite almacenar objetos, sólo strings
localStorage.setItem('misMedicamentos', medicamentos)

// Stringify: Convertir a cadena de texto
localStorage.setItem('misMedicamentos', JSON.stringify(medicamentos))

// Parse: analizar sintácticamente
JSON.parse(localStorage.getItem('misMedicamentos'))



function mostrarPaciente() {
    let infoPaciente = localStorage.getItem('Paciente')
    document.getElementById('infoPaciente').innerHTML = infoPaciente
}


  // Armado de cada prescripcion
  function getCard(item) {
    return `
        <div role="button" aria-label="${item.nombreComercial}" class="card--vertical">
            <h3>${item.id}</h3> 
            <h3>${item.nombreComercial}</h3> 
            <p>${item.dosisCantidad} ${item.dosisUnidad}</p>
            <button id="${item.id}" class="card__btn--outline">Toma realizada</button>
        </div>
        `
}


// Cargo tarjetas de prescripciones
let container = document.getElementById('container')

function loadCards() {
    container.innerHTML = ''
    medicamentos.forEach((item) => {
         container.innerHTML += getCard(item)

    })
}

loadCards()

meds = ''

mostrarMedicamentos = () => {
  for(let i in vademecum) {
    meds = `${vademecum[i].nombreComercial}, ${vademecum[i].presentacion.cantidad}`
    console.table(meds)
  }
}

mostrarMedicamentos()

// Obtengo cantidad de medicación inicial
let cantidadMedicacion = parseInt(prompt('Ingrese cantidad de comprimidos disponibles: '))
console.log(cantidadMedicacion)

// Obtengo duración del tratamiento
let duracionTratamiento = parseInt(prompt('Ingrese duración del tratamiento (días): '))
console.log(duracionTratamiento)

// Obtengo duración del tratamiento
let dosisDiaria = parseInt(prompt('Cuántos comprimidos diarios debe consumir? '))
console.log(dosisDiaria)

calcularDosis = () => {
  let dosisTotal = dosisDiaria * duracionTratamiento
  let diferenciaDosis = dosisTotal - cantidadMedicacion

  if (dosisTotal <= cantidadMedicacion) {
    alert('Tienes suficiente medicación: ' + dosisTotal + ' comprimidos')
  } else {
    alert('Necesitarás: ' + diferenciaDosis + ' comprimidos extra')
    console.warn('Necesitarás: ' + diferenciaDosis + ' comprimidos extra')
  }

}

calcularDosis()
const contenedorevents = document.getElementById('contenedorevents')
const contenedorchevents = document.getElementById('checkevents')
const buscador = document.getElementById('buscador')

pintartarjeta(data.events,contenedorevents)

let categorias = extraereventos(data.events)
pintarcheck(categorias,contenedorchevents)

contenedorchevents.addEventListener("change", filtradoglobal)

buscador.addEventListener("input", filtradoglobal)


//funciones

function createCard(eventos){
  return `<div class="col-12 col-sm-6 col-md-4 col-xl-3">
  <div class="card d-flex h-100 text-center text-bg-secondary mb-3 my-3">
      <img src="${eventos.image}" class="card-img-top" alt="${eventos.name}">
      <div class="card-body">
          <h5 class="card-title">${eventos.name}</h5>
          <h5 class="card-title">${eventos.date}</h5>
          <p class="card-text">${eventos.description}</p>
          <p>$${eventos.price}</p>
          <a href="./details.html?id=${eventos._id}" class="btn btn-light">details</a>
      </div>
  </div>
</div>`;
}

function pintartarjeta(arreglo,contenedorevents){
  if(arreglo.length == 0){
    contenedorevents.innerHTML = `<h2>No events found</h2>`
    return
  }
  let html = ""
  arreglo.forEach(element => {
    html += createCard(element)
  })
  contenedorevents.innerHTML = html
}

function crearcheck(dato){
  return `<div class="form-check col">
  <input class="form-check-input" type="checkbox" value="${dato}" id="${dato}">
  <label class="form-check-label" for="${dato}">
    ${dato}
  </label>
</div>`
}

function pintarcheck(arraydedatos, contenedor){
  let html = ''
  arraydedatos.forEach(element => {
    html += crearcheck(element)
  })
  contenedor.innerHTML = html
}

function extraereventos(arreglo){
  return arreglo.map(element => element.category).filter((category,
    indice, categorias) => categorias.indexOf(category) === indice)
}

//filtros

function filtrartexto(arreglo, texto){
  let arreglofiltrado = arreglo.filter(elemento => elemento.name.
    toLowerCase().includes(texto.trim().toLowerCase()) || elemento.description.
    toLowerCase().includes(texto.trim().toLowerCase()))
  return arreglofiltrado
}

function filtrarcategorias(arreglo) {
  let checkboxes = document.querySelectorAll(".form-check-input");
  let checkboxesazul = Array.from(checkboxes).filter(check => check.checked)
  if(checkboxesazul.length == 0){
    return arreglo
  };
  let valores = checkboxesazul.map(checkazul => checkazul.value);
  let arreglofiltrado = arreglo.filter(evento => valores.includes(evento.category));
  return arreglofiltrado;
}

function filtradoglobal(){
  let filtro1 = filtrarcategorias(data.events)
  let filtro2 = filtrartexto(filtro1,buscador.value)
  pintartarjeta(filtro2,contenedorevents)
}
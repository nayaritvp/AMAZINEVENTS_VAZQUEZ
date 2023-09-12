let data = []

traerDatos()

let masasistencia = []
let menosasistencia = []
let mascapacidad = []

const tabla1 = document.querySelector('#tabla1')

function traerDatos(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataev => {
      data = dataev
      extraerdatosptabla(data.events);
      pintarprimeratab();
    })
    .catch(error => console.log(error))
}

function extraerdatosptabla(datos){
  datos.sort((a,b) => b.assistance - a.assistance)
  masasistencia.push(datos[0],datos[1],datos[2])

  datos.sort((a,b) => a.assistance - b.assistance)
  menosasistencia.push(datos[0],datos[1],datos[2])

  datos.sort((a,b) => b.capacity - a.capacity)
  mascapacidad.push(datos[0],datos[1],datos[2])
}

function pintarprimeratab(){
  let html=''
  for(let i = 0; i <masasistencia.length; i++){
    html += `<tr>
    <td>${masasistencia[i].name} with ${masasistencia[i].category}</td>
    <td>${menosasistencia[i].name} with ${menosasistencia[i].category}</td>
    <td>${mascapacidad[i].name} with ${mascapacidad[i].category}</td>
    </tr>`
  }
  tabla1.innerHTML = html
}

let data2 = [];

let datostabla2 = [];
const tabla2 = document.querySelector('#tabla2');
traerDatos2();


function traerDatos2() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataeventos => {
      data2 = dataeventos;
      console.log(data2.events);
      extraderdatos2tabla(data2.events);
      pintarestadisticas2();
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
}

function extraderdatos2tabla(datos) {
  let categorias = [...new Set(datos.map(elemento => elemento.category))];
  console.table(categorias);
  categorias.forEach(categoria => {
    let fila = {
      categoria: categoria,
      revenues: 0,
      porcentajeasistencia: 0,
    };

    let multipcat = 0;
    let totalAsistencia = 0;
    let totalCapacidad = 0;
    
    let datosporcategoria = datos.filter(elemento => elemento.category === categoria);
    datosporcategoria.forEach(elemento => {
      if (!isNaN(elemento.assistance) && !isNaN(elemento.price)) {
        multipcat += +elemento.assistance * elemento.price;
      }
      
      if (!isNaN(elemento.assistance) && !isNaN(elemento.capacity)) {
        totalAsistencia += +elemento.assistance;
        totalCapacidad += +elemento.capacity;
      }
    });
    fila.revenues = multipcat;

    if (totalCapacidad > 0) {
      fila.porcentajeasistencia = (totalAsistencia / totalCapacidad) * 100;
    } else {
      fila.porcentajeasistencia = 0; // Evitar la división por cero
    }

    datostabla2.push(fila);
  });
}



function pintarestadisticas2() {
  let html = '';
  datostabla2.forEach(fila => {
    html += `<tr>
      <td>${fila.categoria}</td>
      <td>${fila.revenues}</td>
      <td>${fila.porcentajeasistencia}</td>
      </tr>`;
  });
  tabla2.innerHTML = html;
}


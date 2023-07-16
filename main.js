

async function cargarDatos(){
    //canvas donde se va a mostrar la grafica
    const grafica = document.getElementById("myChart").getContext("2d");

    //peticion a la api
    const request = await fetch("http://ucamp.alumnos.dev4humans.com.mx/Main/endpoint_libros");
  const response = await request.json()
    console.log(response);

    let etiquetas = response.data.map((item) => {
        return item.nombre.toUpperCase();
    });

    let info_data = response.data.map((data) =>{
        return data.ventas_millones;
    });

    const myChart = new Chart(grafica, {
        type: "line",
        data :{
            labels: etiquetas,
            datasets:[
                {
                    label: "Ventas",
                    data: info_data,
                    fill: true,
                    backgroundColor: "#ccd9ff",
                    borderColor: "#3366ff"
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    })
  
    tblPeliculas.innerHTML = "";
    for(const pelicula of response.data){
        let tr = `<tr>
                <td>${pelicula.id}</td>
                <td>${pelicula.nombre}</td>
                <td>${pelicula.ventas_millones}</td>
        </tr>`
        tblPeliculas.innerHTML += tr;
    }

} 

cargarDatos()
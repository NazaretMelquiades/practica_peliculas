//array de películas
const peliculas = [
    {
        titulo: "Hereditary",
        año: 2018,
        descripcion: "Es una película de terror psicológico que explora temas de luto, secretos familiares y la influencia de fuerzas sobrenaturales",
        url_img: "./assets/hereditary.jpg",
        genero: "Terror"
    },
    {
        titulo: "Jhon Wick",
        año: 2014,
        descripcion: "Es un legendario asesino a sueldo que se retira de su peligrosa vida para vivir con su esposa, Helen. Tras la muerte de su esposa y el asesinato de su perro, un regalo de ella, John Wick se ve obligado a regresar al inframundo criminal que había dejado atrás para buscar venganza",
        url_img: "./assets/jhonwick.jpg",
        genero: "Accion"
    },
    {
        titulo: "Torrente",
        año: 1998,
        descripcion: "La película sigue las desventuras de José Luis Torrente, un policía corrupto, machista y racista, fanático del Atlético de Madrid y del cantante El Fary, que se ve envuelto en una operación antidroga",
        url_img: "./assets/torrente.jpg",
        genero: "Comedia"
    }, {
        titulo: "Un paseo para recordar",
        año: 2002,
        descripcion: "La historia sigue a Landon Carter, un joven estudiante popular, y Jamie Sullivan, una chica reservada e hija de un ministro bautista, quienes se enamoran a pesar de sus diferencias",
        url_img: "./assets/unpaseopararecordar.jpg",
        genero: "Romantica"
    },
];

//renderizar lista peliculas en una tabla
function renderPeliculasList(lista = peliculas) {
    const peliculasList = document.getElementById("tablapeliculas");
    peliculasList.innerHTML = ""; //limpia antes de pintar

    lista.forEach((pelicula, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
       <td> ${pelicula.titulo}</td>
       <td> ${pelicula.año}</td>
       <td> ${pelicula.descripcion}</td>
       <td> ${pelicula.genero}</td>
       <td> <img src= ${pelicula.url_img}></td>
            <td>
               <button class="delete-button">Eliminar</button>
               <button class="edit-button">Editar</button>
           </td>
        `;

        // Agregar evento al botón de eliminar
        const deleteButton = tr.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            lista.splice(index, 1); // Borra del array original
            renderPeliculasList(lista); // Vuelve a renderizar la tabla
        });

        peliculasList.appendChild(tr);
    });
}
renderPeliculasList();

//evento envío formulario
document.getElementById("formulario-pelicula").addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const titulo = event.target.elements.titulo.value.trim();
    const año = parseInt(event.target.elements.año.value.trim());
    const descripcion = event.target.elements.descripcion.value.trim();
    const genero = event.target.elements.genero.value.trim();
    const url_img = event.target.elements.url_img.value.trim();

    let msj = "";

    if (titulo.length < 2 || titulo.length > 70) {
        //err
        msj += "El nombre tiene que estar comprendido entre 1 y 70 caracteres\n";
    }

    if (descripcion.length < 15 || descripcion.length > 160) {
        //err
        console.log("Nombre fuera de tamaño: 15-160");
        msj += "La descripcion debe tener entre 15 y 160 caracteres\n";
    }

    if (año < 1800 || año > 2025) {
        //err
        console.log("Nombre fuera de tamaño: 1800-2025");
        msj += "El año tiene que estar comprendido entre 1800 y 2025\n";
    }

    if (msj.length != 0) {
        alert(msj); //imprime mensaje final de error
        document.getElementById("añade-película").innerHTML += msj;
        let p = document.createElement("pre");
        let mensaje = document.createTextNode(msj);
        p.style.color = "#DD1C1A";
        p.style.fontSize = "16px";
        p.appendChild(mensaje);
        return;

    } else {
        alert("enviado con exito");
    }

    if (titulo && año && descripcion && genero && url_img) {
        const nuevaPelicula = { titulo, año, descripcion, genero, url_img };
        peliculas.push(nuevaPelicula);
        renderPeliculasList(); // Actualizar la lista de peliculas
        event.target.reset(); // Limpiar el formulario
    }
});

//filtro por genero
function filtrarPorGenero(genero) {

    // Devuelve una lista con todas las películas que coincidan con el género
    return peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());
}

document.getElementById("unicofiltro").addEventListener("change", (event) => {
    const generoSeleccionado = event.target.value;
    // const peliculasFiltradas = filtrarPorGenero(generoSeleccionado);

    let peliculasFiltradas = [];

    if (generoSeleccionado === "") {
        // Mostrar todas si no se selecciona ningún género
        peliculasFiltradas = peliculas;
    } else {
        // Filtrar por género seleccionado
        peliculasFiltradas = filtrarPorGenero(generoSeleccionado);
    }

    renderPeliculasList(peliculasFiltradas); // Pinta directamente en la tabla

    if (lista.length === 0) {
        peliculasList.innerHTML = `<tr><td colspan="5">No se encontraron películas para ese género.</td></tr>`;
        return;
    }
});




























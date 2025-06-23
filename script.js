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
function renderPeliculasList() {
    const peliculasList = document.getElementById("tablapeliculas");
    peliculasList.innerHTML = ""; //limpia antes de pintar

    peliculas.forEach(pelicula => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
       <td> ${pelicula.titulo}</td>
       <td> ${pelicula.año}</td>
       <td> ${pelicula.descripcion}</td>
       <td> ${pelicula.genero}</td>
       <td> <img src= ${pelicula.url_img}></td>
      `;
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

    const filteredPeliculaSection = document.getElementById("filtrado");
    filteredPeliculaSection.innerHTML = ""; // Limpiar la sección

    if (peliculasFiltradas.length > 0) {
        peliculasFiltradas.forEach(pelicula => {
            const article = document.createElement("article");
            article.innerHTML = `
          <p><b>Título:</b> ${pelicula.titulo}</p>
          <p><b>Año:</b> ${pelicula.año}</p>
          <p><b>Descripción:</b> ${pelicula.descripcion}</p>
          <p><b>Género:</b> ${pelicula.genero}</p>
          <img src="${pelicula.url_img}" alt="${pelicula.titulo}" width="200">
        `;
            filteredPeliculaSection.appendChild(article);
        });
    } else {
        filteredPeliculaSection.innerHTML = "<p>No se encontró ninguna película con ese género.</p>";
    }
});


























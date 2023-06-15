//VARIABLES

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregar un curso presionando agregar al carrito
    listaCursos.addEventListener('click',agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [];
        limpiarHtml();
    })
}

//FUNCIONES

function agregarCurso(e){
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito')){
        const  cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimna del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso =>curso.id !== cursoId);
        carritoHtml(); //Volvemos a llamar el carrito para mostrar su HTML
    }
}

//Lee el contendio del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //Crear un objecto con el contenido del curso actual
    const infoCurso={
        imagen   : curso.querySelector("img").src,
        titulo   : curso.querySelector("h4").textContent,
        precio   : curso.querySelector(".precio span").textContent,
        id       : curso.querySelector("a").getAttribute('data-id'),
        cantidad : 1,
    }
    
    //REVISA SI UN elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso =>curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; 
            }else{
                return curso;
            }
        });
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    }
    carritoHtml();
}

//Muestra el carrito de compras en el HTML

function carritoHtml(){

    //Limpiar el HTML
    limpiarHtml();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(carrito => {
        const { imagen,titulo,precio,cantidad,id } =carrito
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>
                    <img src=" ${imagen}" width="100">
               </td>    
               <td>${titulo}</td>  
               <td>${precio}</td>  
               <td>${cantidad}</td>  
               <td>
                    <a href="#" class="borrar-curso" data-id=${id} > X </a>
               </td>  
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}


//Elimina los cursos del tbody
function limpiarHtml(){
    //Forma lenta
    // contenedorCarrito.innerHTML = "";

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//

// function
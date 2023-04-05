let regs = [];
let favs = [];
let pass = "";
let registroActual = null;
const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const clasesDias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
//obtener los divs principales
const divMenu = document.getElementById("divMenu");
const divImportar = document.getElementById("divImportar");
const divExportar = document.getElementById("divExportar");
const divDescifrar = document.getElementById("divDescifrar");
const divCifrar = document.getElementById("divCifrar");
const divRegistrar = document.getElementById("divRegistrar");
const divFavoritos = document.getElementById("divFavoritos");
const divDetallado = document.getElementById("divDetallado");
const divRegistros = document.getElementById("divRegistros");
//ya están obtenidos
iniciar();
function crearDivMenu() {
  divMenu.innerHTML = "";
  let botonMenu = document.createElement("div");
  divMenu.appendChild(botonMenu);
  botonMenu.id = "botonmenu";
  botonMenu.innerHTML = "Menu";

  let contenidoMenu = document.createElement("div");
  divMenu.appendChild(contenidoMenu);
  contenidoMenu.id = "contenidomenu";
  contenidoMenu.classList.add("oculto");

  botonMenu.addEventListener("click", toggleMenu);
  function toggleMenu() {
    contenidoMenu.classList.toggle("oculto");
  }

  let opcionCifrar = document.createElement("div");
  contenidoMenu.appendChild(opcionCifrar);
  opcionCifrar.classList.add("opcion");
  opcionCifrar.innerHTML = "Cifrar";
  opcionCifrar.addEventListener("click", crearDivCifrar);

  let opcionExportar = document.createElement("div");
  contenidoMenu.appendChild(opcionExportar);
  opcionExportar.classList.add("opcion");
  opcionExportar.innerHTML = "Exportar";
  opcionExportar.addEventListener("click", crearDivExportar);

  let opcionImportar = document.createElement("div");
  contenidoMenu.appendChild(opcionImportar);
  opcionImportar.classList.add("opcion");
  opcionImportar.innerHTML = "Importar";
  opcionImportar.addEventListener("click", crearDivImportar);
}
function crearDivImportar() {
  document.querySelectorAll("body > div").forEach((div) => {
    div.innerHTML = "";
  });
  //crear boton de volver
  let volver = document.createElement("div");
  volver.classList.add("boton", "volver");
  volver.innerHTML = "Volver";
  volver.addEventListener("click", () => {
    divImportar.innerHTML = "";
    crearDivMenu();
    crearDivRegistrar();
    crearDivFavoritos();
    crearDivRegistros();
  });

  let textoImportar = document.createElement("textarea");
  textoImportar.id = "textoimportar";
  textoImportar.placeholder = "Pega aquí tus datos";
  textoImportar.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight + 5) + 'px';
  });
  console.log(textoImportar)
  let botonImportar = document.createElement("div");
  botonImportar.classList.add("boton", "importar");
  botonImportar.innerHTML = "Importar";
  
  botonImportar.addEventListener("click", importar);
  divImportar.appendChild(volver);
  divImportar.appendChild(botonImportar);
  divImportar.appendChild(textoImportar);
  function importar() {
    if (comprobarJSON(textoImportar.value)) {
      let importar = JSON.parse(textoImportar.value);
      console.log(importar)
      for (let i = 0; i < importar.registros.length; i++) {
        importar.registros[i].fecha = new Date(importar.registros[i].fecha);
      }
      console.log(importar)
      regs=regs.concat(importar.registros);
      favs=favs.concat(importar.favoritos);
      duplicados();
      guardar();
      alert("Datos importados");
    } else if (textoImportar.value == "") {
      console.log("vacio");
    } else {
      alert("Los datos no están bien formados");
    }
  }
}

function crearDivExportar() {
  document.querySelectorAll("body > div").forEach((div) => {
    div.innerHTML = "";
  });
  //crear boton de volver
  let volver = document.createElement("div");
  divExportar.appendChild(volver);
  volver.classList.add("boton", "volver");
  volver.innerHTML = "Volver";
  volver.addEventListener("click", () => {
    divExportar.innerHTML = "";
    crearDivMenu();
    crearDivRegistrar();
    crearDivFavoritos();
    if (registroActual != null) {
      crearDivDetallado(registroActual);
    } else {
      crearDivRegistros();
    }
  });
  const exportar = {};
  exportar.registros = regs;
  exportar.favoritos = favs;
  let botonCopiar = document.createElement("div");
  divExportar.appendChild(botonCopiar);
  botonCopiar.classList.add("boton", "copiar");
  botonCopiar.innerHTML = "Copiar";
  botonCopiar.addEventListener("click", function () {
    portapapeles(textoExportar);
    alert("Datos copiados al portapapeles");
  });

  let textoExportar = document.createElement("div");
  divExportar.appendChild(textoExportar);
  textoExportar.innerHTML = JSON.stringify(exportar);
  textoExportar.classList.add("textoexportar");
}
function crearDivDescifrar() {
  //crear input descifrar

  let textoDescifrar = document.createElement("input");
  textoDescifrar.type = "text";
  textoDescifrar.classList.add("textodescifrar");
  let botonDescifrar = document.createElement("div");
  botonDescifrar.classList.add("botondescifrar", "boton");
  botonDescifrar.innerHTML = "Descifrar";
  let mensajeDescifrar = document.createElement("div");
  mensajeDescifrar.classList.add("mensajedescifrar");
  textoDescifrar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      descifrar();
    }
  });
  botonDescifrar.addEventListener("click", descifrar);
  function descifrar() {
    pass = textoDescifrar.value;
    if (cargar()) {
      divDescifrar.querySelectorAll("*").forEach((elemento) => {
        elemento.classList.remove("error");
        elemento.classList.add("correcto");
      });
      mensajeDescifrar.innerHTML = "Contraseña correcta :)";
      console.log("se ha cargado desde descifrar");
      divDescifrar.innerHTML = "";
      crearDivMenu();
      crearDivRegistrar();
      crearDivFavoritos();
      crearDivRegistros();
    } else {
      mensajeDescifrar.innerHTML = "La contraseña está mal :(";
      divDescifrar.querySelectorAll("*").forEach((elemento) => {
        elemento.classList.remove("correcto");
        elemento.classList.add("error");
      });
    }
  }
  divDescifrar.appendChild(textoDescifrar);
  divDescifrar.appendChild(botonDescifrar);
  divDescifrar.appendChild(mensajeDescifrar);
}
function crearDivCifrar() {
  document.querySelectorAll("body > div").forEach((div) => {
    div.innerHTML = "";
  });
  //crear input cifrar
  let inputCifrar = document.createElement("div");
  let textoCifrar = document.createElement("input");
  textoCifrar.type = "text";
  textoCifrar.classList.add("textocifrar");
  let botonCifrar = document.createElement("div");
  botonCifrar.classList.add("botoncifrar", "boton");
  botonCifrar.innerHTML = "Cifrar";
  divCifrar.appendChild(inputCifrar);
  inputCifrar.id = "inputcifrar";
  inputCifrar.appendChild(textoCifrar);
  inputCifrar.appendChild(botonCifrar);
  textoCifrar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      cifrar();
    }
  });
  botonCifrar.addEventListener("click", cifrar);
  function cifrar() {
    if (pass == "" && textoCifrar.value != "") {
      alert('Se ha establecido la contraseña "' + textoCifrar.value + '"');
    } else if (pass == "" && textoCifrar.value == "") {
      alert("No se ha establecido ninguna contraseña");
    } else if (pass != "" && textoCifrar.value == "") {
      alert('Se ha eliminado la contraseña "' + pass + '"');
    } else if (pass == textoCifrar.value) {
      alert("La contraseña introducida es la misma que la actual");
    } else if (pass != "" && textoCifrar.value != "") {
      alert('Se ha cambiado la contraseña de "' + pass + '" a "' + textoCifrar.value + '"');
    }
    pass = textoCifrar.value;
    divCifrar.innerHTML = "";
    guardar();
    crearDivMenu();
    crearDivRegistrar();
    crearDivFavoritos();
    if (registroActual != null) {
      crearDivDetallado(registroActual);
    } else {
      crearDivRegistros();
    }
  }
}
function crearDivRegistrar() {
  //crear input registrar
  let textoRegistrar = document.createElement("input");
  textoRegistrar.type = "text";
  textoRegistrar.id = "textoregistrar";

  let botonRegistrar = document.createElement("div");
  botonRegistrar.classList.add("botonregistrar", "boton");
  botonRegistrar.innerHTML = "Registrar";
  divRegistrar.appendChild(textoRegistrar);
  divRegistrar.appendChild(botonRegistrar);

  textoRegistrar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      nuevoRegistro();
    }
  });
  botonRegistrar.addEventListener("click", nuevoRegistro);
  function nuevoRegistro() {
    if (textoRegistrar.value) {
      let regNuevo = {};
      regNuevo.fecha = new Date();
      regNuevo.texto = textoRegistrar.value;

      regs.unshift(regNuevo);
      crearDivRegistros();
      guardar();
      textoRegistrar.value = "";
    }
  }
}
function crearDivFavoritos() {
  //esta funcion deja vacio el cuadro de favoritos antes de mostrarlos
  divFavoritos.innerHTML = "";
  let editarFavs = document.createElement("div");
  divFavoritos.appendChild(editarFavs);
  editarFavs.innerHTML = "Editar";
  editarFavs.classList.add("editarfavs", "boton");
  editarFavs.addEventListener("click", crearEditarFavs);
  //botones de favoritos guardados
  for (let i = 0; i < favs.length; i++) {
    //añadir un botón al cuadro
    let favHtml = document.createElement("div");
    divFavoritos.appendChild(favHtml);
    favHtml.classList.add("fav", "boton");
    //añadir el texto
    favHtml.innerHTML = favs[i];
    //añadir un escuchador al boton de favorito
    favHtml.addEventListener("click", function () {
      let textoRegistrar = document.getElementById("textoregistrar");
      textoRegistrar.value = favHtml.textContent;
    });
  }
  function crearEditarFavs() {
    divFavoritos.innerHTML = "";
    let noEditarFavs = document.createElement("div");
    divFavoritos.appendChild(noEditarFavs);
    noEditarFavs.classList.add("boton");
    noEditarFavs.innerHTML = "No editar";
    noEditarFavs.classList.add("noeditarfavs");
    noEditarFavs.addEventListener("click", crearDivFavoritos);
    //botones de favoritos guardados
    for (let i = 0; i < favs.length; i++) {
      //añadir un botón al cuadro
      let favHtml = document.createElement("div");
      divFavoritos.appendChild(favHtml);
      favHtml.classList.add("faveliminar");
      favHtml.classList.add("boton");
      favHtml.innerHTML = favs[i];
      //añadir un escuchador
      favHtml.addEventListener("click", function () {
        eliminarFav(i);
        crearEditarFavs();
      });
    }
    function nuevoFav(tnf) {
      //tnf significa texto nuevo fav
      if (tnf.value) {
        favs.unshift(tnf.value);
        guardar();
        crearEditarFavs();
        if (registroActual != null) {
          crearDivDetallado(registroActual);
        }
        tnf.value = "";
      }
    }
    //texto añadir fav
    let inputNuevoFav = document.createElement("div");
    divFavoritos.appendChild(inputNuevoFav);
    inputNuevoFav.classList.add("inputnuevofav");
    let textoNuevoFav = document.createElement("input");
    inputNuevoFav.appendChild(textoNuevoFav);
    textoNuevoFav.type = "text";
    textoNuevoFav.placeholder = "Añadir";
    textoNuevoFav.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        nuevoFav(textoNuevoFav);
      }
    });
    textoNuevoFav.classList.add("textonuevofav");

    //boton nuevo fav
    let botonNuevoFav = document.createElement("div");
    inputNuevoFav.appendChild(botonNuevoFav);
    botonNuevoFav.innerHTML = "Ok";
    botonNuevoFav.classList.add("submitfav");
    botonNuevoFav.classList.add("boton");
    botonNuevoFav.addEventListener("click", function () {
      nuevoFav(textoNuevoFav);
    });
    function eliminarFav(indiceFav) {
      favs.splice(indiceFav, 1);
      guardar();
      crearEditarFavs();
      if (registroActual != null) {
        crearDivDetallado(registroActual);
      } else {
        crearDivRegistros();
      }
    }
  }
}
function crearDivDetallado(i) {
  registroActual = i;
  //crear div de la información del registro
  //limpiar el html del div detallado por si tuviera algo
  divDetallado.innerHTML = "";
  //h3 del titulo del registro
  let tituloRegistro = document.createElement("h3");
  divDetallado.classList.add("divdetallado");
  divDetallado.appendChild(tituloRegistro);
  tituloRegistro.innerHTML = `Registro: ${regs[i].texto}`;
  tituloRegistro.classList.add("tituloregistro");
  //fecha del registro
  let fechaHoraRegistro = document.createElement("div");
  divDetallado.appendChild(fechaHoraRegistro);
  fechaHoraRegistro.innerHTML = `${nombresDias[regs[i].fecha.getDay()]} ${regs[
    i
  ].fecha.getFullYear()}-${regs[i].fecha.getMonth() + 1}-${regs[i].fecha.getDate()}
    ${regs[i].fecha.getHours().toString().padStart(2, "0")}:${regs[i].fecha
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${regs[i].fecha.getSeconds().toString().padStart(2, "0")}`;
  fechaHoraRegistro.classList.add("fecha");
  //crear un contador de tiempo
  let contadorTiempo = document.createElement("div");
  divDetallado.appendChild(contadorTiempo);
  contadorTiempo.innerHTML = mostrarTiempo(i);
  setInterval(function () {
    contadorTiempo.innerHTML = mostrarTiempo(i);
  }, 200);
  contadorTiempo.classList.add("contadorTiempo");

  //div texto editable
  let divTextoLargo = document.createElement("div");
  divDetallado.appendChild(divTextoLargo);
  //texto editable
  let textoEditable = document.createElement("div");
  divTextoLargo.appendChild(textoEditable);
  textoEditable.classList.add("textolargo");
  textoEditable.textContent = regs[i].textoLargo;
  //boton editar texto
  let botonEditarTexto = document.createElement("div");
  divTextoLargo.appendChild(botonEditarTexto);
  if (textoEditable.textContent == "") {
    botonEditarTexto.innerHTML = "Añadir texto largo";
    textoEditable.classList.add("oculto");
  } else {
    botonEditarTexto.innerHTML = "Editar";
  }
  botonEditarTexto.classList.add("boton");
  botonEditarTexto.classList.add("botoneditartexto");
  botonEditarTexto.addEventListener("click", function () {
    textoEditable.contentEditable = true;
    textoEditable.classList.add("textoeditable");
    textoEditable.classList.remove("oculto");
    botonEditarTexto.remove();
    function salirEditar() {
      botonGuardarTexto.remove();
      botonNoGuardarTexto.remove();
      divTextoLargo.appendChild(botonEditarTexto);
      if (textoEditable.textContent == "") {
        botonEditarTexto.innerHTML = "Añadir texto largo";
        textoEditable.classList.add("oculto");
      } else {
        botonEditarTexto.innerHTML = "Editar";
        textoEditable.classList.remove("textoeditable");
      }
    }
    //boton guardar
    let botonGuardarTexto = document.createElement("div");
    divTextoLargo.appendChild(botonGuardarTexto);
    botonGuardarTexto.innerHTML = "Guardar";
    botonGuardarTexto.classList.add("boton");
    botonGuardarTexto.classList.add("botonguardartexto");
    botonGuardarTexto.addEventListener("click", function () {
      regs[i].textoLargo = textoEditable.textContent;
      textoEditable.contentEditable = false;
      guardar();
      salirEditar();
    });
    //boton no guardar
    let botonNoGuardarTexto = document.createElement("div");
    divTextoLargo.appendChild(botonNoGuardarTexto);
    botonNoGuardarTexto.innerHTML = "No guardar";
    botonNoGuardarTexto.classList.add("boton");
    botonNoGuardarTexto.classList.add("botonnoguardartexto");
    botonNoGuardarTexto.addEventListener("click", function () {
      textoEditable.textContent = regs[i].textoLargo;
      textoEditable.contentEditable = false;
      salirEditar();
    });
  });

  //div boton volver
  let volver = document.createElement("div");
  divDetallado.appendChild(volver);
  volver.classList.add("boton");
  volver.innerHTML = "Volver";
  volver.classList.add("volver");
  volver.addEventListener("click", () => {
    clearInterval()
    divDetallado.innerHTML = "";
    registroActual = null;
    crearDivRegistros();
  });
  //div boton favoritos
  let toggleFav = document.createElement("div");
  divDetallado.appendChild(toggleFav);
  let esFav = false;
  for (let f = 0; f < favs.length && esFav == false; f++) {
    if (regs[i].texto == favs[f]) {
      esFav = true;
      indiceFav = f;
    }
  }
  if (esFav) {
    toggleFav.innerHTML = "Favorito";
    toggleFav.classList.add("esfav");
  } else {
    toggleFav.innerHTML = "Añadir";
    toggleFav.classList.add("noesfav");
  }
  toggleFav.classList.add("boton");
  toggleFav.addEventListener("click", function () {
    if (esFav) {
      favs.splice(indiceFav, 1);
      guardar();
      crearDivFavoritos();
      crearDivDetallado(i);
    } else {
      favs.unshift(regs[i].texto);
      guardar();
      crearDivFavoritos();
      crearDivDetallado(i);
    }
  });
  //div boton eliminar
  let eliminar = document.createElement("div");
  divDetallado.appendChild(eliminar);
  eliminar.innerHTML = "Eliminar";
  eliminar.classList.add("eliminar");
  eliminar.addEventListener("click", function () {
    if (window.confirm('Eliminar el registro "' + regs[i].texto + '"?')) {
      clearInterval()
      divDetallado.innerHTML = "";
      eliminarRegistro(i);
    }
  });
  eliminar.classList.add("boton");
  function mostrarTiempo(indice) {
    let fechaContador = regs[indice].fecha;
    let ahora = new Date();
    let diferencia = ahora.getTime() - fechaContador.getTime();
    let segundos = Math.floor(diferencia / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);
    segundos %= 60;
    minutos %= 60;
    horas %= 24;
    return (
      "Hace " +
      dias +
      " días, " +
      horas.toString().padStart(2, "0") +
      ":" +
      minutos.toString().padStart(2, "0") +
      ":" +
      segundos.toString().padStart(2, "0")
    );
  }
  function eliminarRegistro(indiceRegistro) {
    regs.splice(indiceRegistro, 1);
    guardar();
    crearDivRegistros();
  }
}
function crearDivRegistros() {
  divRegistros.innerHTML = "";
  registroActual = null;
  dias = [];
  function getFechaString(fechaHora) {
    return `${fechaHora.getFullYear()}-${fechaHora.getMonth() + 1}-${fechaHora.getDate()}`;
  }
  //añadir los registros al html
  //este bucle recorre todos los registros y mete todas sus fechas diferentes en el array dias
  for (let i = 0; i < regs.length; i++) {
    let existe = false;
    for (let j = 0; j < dias.length && existe == false; j++) {
      if (dias[j] === getFechaString(regs[i].fecha)) {
        existe = true;
      }
    }
    if (!existe) {
      dias.push(getFechaString(regs[i].fecha));
    }
  }
  //recorro el array de días
  for (let i = 0; i < dias.length; i++) {
    //obtengo el objeto date del día en cuestion
    let diaObj = new Date(dias[i]);
    //creo un div para el día
    let dia = document.createElement("div");
    divRegistros.appendChild(dia);
    //creo un h2 para mostrar qué día es y lo añado dentro del div del día
    let tituloDia = document.createElement("h2");
    dia.appendChild(tituloDia);
    //añado la clase tituloDia al h2
    tituloDia.classList.add("tituloDia");
    //coloco el texto dentro del h2
    tituloDia.innerHTML = `${nombresDias[diaObj.getDay()]} ${diaObj.getDate()}-${
      diaObj.getMonth() + 1
    }`;
    //asigno la clase día al div que contiene el día
    dia.classList.add("dia");
    //asigno al día una clase con el nombre del día de la semana correspondiente
    dia.classList.add(clasesDias[diaObj.getDay()]);
    //añado un atributo fecha con la fecha
    dia.classList.add(dias[i]);
  }
  //recorro todos los registros y los meto en su día correspondiente
  for (let i = 0; i < regs.length; i++) {
    //obtener el elemento día correpondiente
    let diaHtml = document.getElementsByClassName(getFechaString(regs[i].fecha));
    //añadir el registro al día
    let registro = document.createElement("div");
    diaHtml[0].appendChild(registro);
    //construir el registro
    registro.classList.add("registro");

    registro.innerHTML = `${regs[i].fecha.getHours().toString().padStart(2, "0")}:${regs[i].fecha
      .getMinutes()
      .toString()
      .padStart(2, "0")}: ${regs[i].texto}`;
    registro.addEventListener("click", function () {
      divRegistros.innerHTML = "";
      crearDivDetallado(i);
    });
  }
}
function duplicados() {
  const uniqueArr = [];
  const uniqueObj = {};

  for (let i = 0; i < regs.length; i++) {
    const key = `${regs[i].fecha}_${regs[i].texto}`;

    if (!uniqueObj[key]) {
      uniqueObj[key] = true;
      uniqueArr.unshift(regs[i]);
    }
  }
  regs = uniqueArr;
  ordenar();
  function ordenar() {
    regs = regs.sort(function (a, b) {
      return b.fecha - a.fecha;
    });
  }
}

function comprobarJSON(entrada) {
  try {
    JSON.parse(entrada);
    return true;
  } catch (error) {
    return false;
  }
}
function iniciar() {
  if (cargar()) {
    console.log("se ha cargado desde iniciar");
    crearDivMenu();
    crearDivRegistrar();
    crearDivFavoritos();
    crearDivRegistros();
  } else {
    console.log("crear div descifrar");
    crearDivDescifrar();
  }
}
function comprobarPass(p) {
  if (
    Decrypt(localStorage.getItem("favoritos"), p) &&
    Decrypt(localStorage.getItem("registros"), p)
  ) {
    console.log("la contraseña está bien");
    return true;
  } else {
    console.log("la contraseña está mal :(");
    return false;
  }
}
function cargar() {
  if (comprobarPass(pass)) {
    regs = JSON.parse(Decrypt(localStorage.getItem("registros"), pass));
    favs = JSON.parse(Decrypt(localStorage.getItem("favoritos"), pass));
    for (let i = 0; i < regs.length; i++) {
      regs[i].fecha = new Date(regs[i].fecha);
    }
    console.log("se ha cargado");
    return true;
  } else {
    return false;
  }
}
function guardar() {
  if (pass == "") {
    localStorage.setItem("favoritos", JSON.stringify(favs));
    localStorage.setItem("registros", JSON.stringify(regs));
    console.log("guardado en texto plano");
  } else {
    localStorage.setItem("favoritos", Encrypt(JSON.stringify(favs), pass));
    localStorage.setItem("registros", Encrypt(JSON.stringify(regs), pass));
    console.log("guardado cifrado");
  }
}

function Encrypt(text, key = "") {
  if (text === "") {
    console.log("es una cadena vacía");
    return false;
  }
  if (text === null) {
    console.log("es null");
    return false;
  }
  if (!text) {
    console.log("no hay texto lmao");
    return false;
  }
  if (comprobarJSON(text)) {
    let encJson = CryptoJS.AES.encrypt(text, key).toString();
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
    return encData;
  } else {
    console.log("no es un json");
    return false;
  }
}

function Decrypt(ciphertext, key = "") {
  let salida;
  if (ciphertext == null) {
    console.log("igual a null");
    return "[]";
  }
  if (!ciphertext || ciphertext == "") {
    console.log("no texto o vacío");
    return "[]";
  }
  if (comprobarJSON(ciphertext)) {
    //si detecta que está descifrando un json lo devuelve
    console.log("es un json");
    return ciphertext;
  }
  try {
    let decData = CryptoJS.enc.Base64.parse(ciphertext).toString(CryptoJS.enc.Utf8);
    let bytes = CryptoJS.AES.decrypt(decData, key);
    if (bytes.sigBytes >= 0) {
      console.log("lo ha descifrado");
      salida = bytes.toString(CryptoJS.enc.Utf8);
      if (salida == "") {
        console.log(
          "dice que es una cadena vacía y eso es imposible que lo haya cifrado la otra función, toma un array vacío"
        );
        return "[]";
      }
      return salida;
    } else {
      console.log("la contraseña está mal no me jodas");
      return false;
    }
  } catch (error) {
    //si el texto introducido no está cifrado lo devuelve si es json
    //aunque esta regla no tiene sentido y si no es texto cifrado ni un json que devuelva un array vacio
    console.log("esto que me has metido no concuerda");
    return "[]";
  }
}
function portapapeles(elemento) {
  const range = document.createRange();
  range.selectNodeContents(elemento);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  document.execCommand("copy");
  sel.removeAllRanges();
}

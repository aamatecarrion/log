let regs = [];
let favs = [];
let colores = ["#7d8aff", "#fbff00", "#ff6161", "#ffc800", "#fc7474", "#5ff378", "#ff8080"];
let pass = "";
let editarFavoritos = false;
let registroActual = null;
let relojDivDetallado;
const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const clasesDias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const root = document.getElementById("root");
iniciar();
function crearDivMenu() {
	crearElemento("divMenu", root, "div", undefined, ["divmenu"]);
	crearElemento("botonMenu", divMenu, "button", "Menu", ["botonmenu"], toggleMenu);
	crearElemento("contenidoMenu", divMenu, "div", undefined, ["oculto", "contenidomenu"]);
	function toggleMenu() {
		contenidoMenu.classList.toggle("oculto");
	}
	crearElemento("opcionCifrar", contenidoMenu, "button", "Cifrar", ["opcion"], crearDivCifrar);
	crearElemento("opcionExportar", contenidoMenu, "button", "Exportar", ["opcion"], crearDivExportar);
	crearElemento("opcionImportar", contenidoMenu, "button", "Importar", ["opcion"], crearDivImportar);
	crearElemento("opcionPersonalizar", contenidoMenu, "button", "Personalizar", ["opcion"], crearDivPersonalizar);
}
function crearDivPersonalizar() {
	//este código es una chapuza pero hará el trabajo

	root.innerHTML = "";

	//crear boton de volver
	crearElemento("volver", root, "button", "Volver", ["boton", "volver"], function () {
		inicio();
	});
	crearElemento("labellunes", root, "div", "lunes", ["divtitulocolordiasemana"]);
	crearElemento("colorlunes", root, "input", undefined, ["inputcolor"]);
	colorlunes.type = "color";
	colorlunes.value = colores[1];
	labellunes.style = "background-color: " + colores[1];
	colorlunes.addEventListener("change", () => {
		colores[1] = colorlunes.value;
		labellunes.style = "background-color: " + colores[1];
		guardar();
	});

	crearElemento("labelmartes", root, "div", "martes", ["divtitulocolordiasemana"]);
	crearElemento("colormartes", root, "input", undefined, ["inputcolor"]);
	colormartes.type = "color";
	colormartes.value = colores[2];
	labelmartes.style = "background-color: " + colores[2];
	colormartes.addEventListener("change", () => {
		colores[2] = colormartes.value;
		labelmartes.style = "background-color: " + colores[2];
		guardar();
	});

	crearElemento("labelmiercoles", root, "div", "miercoles", ["divtitulocolordiasemana"]);
	crearElemento("colormiercoles", root, "input", undefined, ["inputcolor"]);
	colormiercoles.type = "color";
	colormiercoles.value = colores[3];
	labelmiercoles.style = "background-color: " + colores[3];
	colormiercoles.addEventListener("change", () => {
		colores[3] = colormiercoles.value;
		labelmiercoles.style = "background-color: " + colores[3];
		guardar();
	});

	crearElemento("labeljueves", root, "div", "jueves", ["divtitulocolordiasemana"]);
	crearElemento("colorjueves", root, "input", undefined, ["inputcolor"]);
	colorjueves.type = "color";
	colorjueves.value = colores[4];
	labeljueves.style = "background-color: " + colores[4];
	colorjueves.addEventListener("change", () => {
		colores[4] = colorjueves.value;
		labeljueves.style = "background-color: " + colores[4];
		guardar();
	});

	crearElemento("labelviernes", root, "div", "viernes", ["divtitulocolordiasemana"]);
	crearElemento("colorviernes", root, "input", undefined, ["inputcolor"]);
	colorviernes.type = "color";
	colorviernes.value = colores[5];
	labelviernes.style = "background-color: " + colores[5];
	colorviernes.addEventListener("change", () => {
		colores[5] = colorviernes.value;
		labelviernes.style = "background-color: " + colores[5];
		guardar();
	});

	crearElemento("labelsabado", root, "div", "sabado", ["divtitulocolordiasemana"]);
	crearElemento("colorsabado", root, "input", undefined, ["inputcolor"]);
	colorsabado.type = "color";
	colorsabado.value = colores[6];
	labelsabado.style = "background-color: " + colores[6];
	colorsabado.addEventListener("change", () => {
		colores[6] = colorsabado.value;
		labelsabado.style = "background-color: " + colores[6];
		guardar();
	});

	crearElemento("labeldomingo", root, "div", "domingo", ["divtitulocolordiasemana"]);
	crearElemento("colordomingo", root, "input", undefined, ["inputcolor"]);
	colordomingo.type = "color";
	colordomingo.value = colores[0];
	labeldomingo.style = "background-color: " + colores[0];
	colordomingo.addEventListener("change", () => {
		colores[0] = colordomingo.value;
		labeldomingo.style = "background-color: " + colores[0];
		guardar();
	});

	crearElemento("agradecimientos", root, "div", "Agradecimientos a Arturo porque inspiró está sección porque decía que él veía los colores de la semana de otra manera, lo cual me obligó a modificar la aplicación haciendo que sean personalizables para que cada persona vea las semanas del color que quiera");
}
function crearDivImportar() {
	root.innerHTML = "";
	crearElemento("divImportar", root, "div", undefined, ["divimportar"]);
	//crear boton de volver
	crearElemento("volver", divImportar, "button", "Volver", ["boton", "volver"], function () {
		inicio();
	});
	crearElemento("botonImportar", divImportar, "div", "Importar", ["boton", "importar"], importar);
	function importar() {
		if (comprobarJSON(textoImportar.value)) {
			let importar = JSON.parse(textoImportar.value);
			console.log(importar);
			for (let i = 0; i < importar.registros.length; i++) {
				importar.registros[i].fecha = new Date(importar.registros[i].fecha);
			}
			regs = regs.concat(importar.registros);
			favs = favs.concat(importar.favoritos);
			colores = importar.colores;
			duplicados();
			guardar();
			alert("Datos importados");
		} else if (textoImportar.value == "") {
			console.log("vacio");
		} else {
			alert("Los datos no están bien formados");
		}
	}
	crearElemento("textoImportar", divImportar, "textarea", "Pega aquí tus datos", ["textoimportar"]);
	textoImportar.addEventListener("input", function () {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + 5 + "px";
	});
}
function crearDivExportar() {
	root.innerHTML = "";
	crearElemento("divExportar", root, "div", undefined, ["divexportar"]);
	crearElemento("volver", divExportar, "div", "Volver", ["boton", "volver"], inicio);
	const exportar = {};
	exportar.registros = regs;
	exportar.favoritos = favs;
	exportar.colores = colores;
	crearElemento("botonCopiar", divExportar, "div", "Copiar", ["boton", "copiar"], function () {
		portapapeles(textoExportar);
		alert("Datos copiados al portapapeles");
		inicio();
	});
	crearElemento("textoExportar", divExportar, "div", JSON.stringify(exportar), ["textoexportar"]);
}
function crearDivDescifrar() {
	root.innerHTML = "";
	crearElemento("divDescifrar", root, "div", undefined, ["divdescifrar"]);
	crearElemento("textoDescifrar", divDescifrar, "input", undefined, ["textodescifrar"], descifrar);
	crearElemento("botonDescifrar", divDescifrar, "div", "Descifrar", ["botondescifrar", "boton"], descifrar);
	crearElemento("mensajeDescifrar", divDescifrar, "div", undefined, ["mensajedescifrar"]);
	function descifrar() {
		pass = textoDescifrar.value;
		if (cargar()) {
			divDescifrar.querySelectorAll("*").forEach((elemento) => {
				elemento.classList.remove("error");
				elemento.classList.add("correcto");
			});
			mensajeDescifrar.innerHTML = "Contraseña correcta :)";
			console.log("se ha cargado desde descifrar");
			inicio();
		} else {
			mensajeDescifrar.innerHTML = "La contraseña está mal :(";
			divDescifrar.querySelectorAll("*").forEach((elemento) => {
				elemento.classList.remove("correcto");
				elemento.classList.add("error");
			});
		}
	}
}
function crearDivCifrar() {
	root.innerHTML = "";
	crearElemento("divCifrar", root, "div", undefined, ["divcifrar"]);
	//crear input cifrar
	crearElemento("inputCifrar", divCifrar, "div", undefined, ["inputcifrar"]);
	crearElemento("textoCifrar", inputCifrar, "input", undefined, ["textocifrar"], cifrar);
	crearElemento("botonCifrar", inputCifrar, "div", "Cifrar", ["botoncifrar", "boton"], cifrar);
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
		guardar();
		inicio();
	}
}
function crearDivRegistrar() {
	crearElemento("divRegistrar", root, "div", undefined, ["divregistrar"]);
	//crear input registrar
	crearElemento("textoRegistrar", divRegistrar, "input", "texto", ["textoregistrar"], nuevoRegistro);
	crearElemento("botonDesplegarCuadro", divRegistrar, "button", undefined, ["fa", "fa-chevron-down", "boton"], function () {
		cuadroTextoLargo.classList.toggle("oculto");
	});
	crearElemento("botonRegistrar", divRegistrar, "button", "Registrar", ["botonregistrar", "boton"], nuevoRegistro);
	crearElemento("cuadroTextoLargo", divRegistrar, "textarea", "texto largo", ["cuadrotextolargo", "oculto"]);
	cuadroTextoLargo.addEventListener("input", function () {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + 5 + "px";
	});

	function nuevoRegistro() {
		if (textoRegistrar.value) {
			let regNuevo = {};
			regNuevo.fecha = new Date();
			regNuevo.texto = textoRegistrar.value;
			regNuevo.textoLargo = cuadroTextoLargo.value;
			do {
				if ("geolocation" in navigator) {
					navigator.geolocation.getCurrentPosition(
						function (position) {
							let latitud = position.coords.latitude;
							let longitud = position.coords.longitude;
							regNuevo.latitud = latitud;
							regNuevo.longitud = longitud;
						},
						function (error) {
							console.log("error");
						}
					);
				}
			}
			while (regNuevo.latitud === undefined)
			if (regs) {
				regs.unshift(regNuevo);
			}
			guardar();
			inicio();
			registroActual = null;
			cuadroTextoLargo.value="";
		}
	}
}
function crearDivFavoritos() {
	crearElemento("divFavoritos", root, "div", undefined, ["divfavoritos"]);
	crearElemento("editarFavs", divFavoritos, "button", "Editar", ["editarfavs", "boton"], function () {
		editarFavoritos = true;
		inicio();
	});
	//botones de favoritos guardados
	for (let i = 0; i < favs.length; i++) {
		//añadir un botón al cuadro
		crearElemento("favHtml", divFavoritos, "div", favs[i], ["fav", "boton"], function (e) {
			console.log(e.srcElement.innerText);
			textoRegistrar.value = e.srcElement.innerText;
		});
	}
}
function crearEditarFavs() {
	crearElemento("divEditarFavoritos", root, "div", undefined, ["divfavoritos"]);
	crearElemento("noEditarFavs", divEditarFavoritos, "button", "No editar", ["boton", "noeditarfavs"], function () {
		editarFavoritos = false;
		inicio();
	});
	//botones de favoritos guardados
	for (let i = 0; i < favs.length; i++) {
		crearElemento("favHtml", divEditarFavoritos, "button", favs[i], ["faveliminar", "boton"], function () {
			eliminarFav(i);
		});
	}
	function eliminarFav(indiceFav) {
		favs.splice(indiceFav, 1);
		guardar();
		inicio();
	}
	crearElemento("inputNuevoFav", divEditarFavoritos, "div", undefined, ["inputnuevofav"]);
	crearElemento("textoNuevoFav", inputNuevoFav, "input", "Añadir", ["textonuevofav"], nuevoFav);
	crearElemento("botonNuevoFav", inputNuevoFav, "button", "Ok", ["submitfav", "boton"], nuevoFav);
	function nuevoFav() {
		if (textoNuevoFav.value) {
			favs.unshift(textoNuevoFav.value);
			duplicados();
			guardar();
			inicio();
		}
	}
}
function crearDivDetallado(i) {
	crearElemento("divDetallado", root, "div", undefined, ["divdetallado"]);
	registroActual = i;
	//crear div de la información del registro
	crearElemento("tituloRegistro", divDetallado, "h3", `Registro: ${regs[i].texto}`, ["tituloregistro"]);
	crearElemento(
		"fechaHoraRegistro",
		divDetallado,
		"div",
		`${nombresDias[regs[i].fecha.getDay()]} ${regs[i].fecha.getFullYear()}-${regs[i].fecha.getMonth() + 1}-${regs[i].fecha.getDate()}
    ${regs[i].fecha.getHours().toString().padStart(2, "0")}:${regs[i].fecha.getMinutes().toString().padStart(2, "0")}:${regs[i].fecha.getSeconds().toString().padStart(2, "0")}`,
		["fecha"]
	);
	//crear un contador de tiempo
	crearElemento("contadorTiempo", divDetallado, "div", mostrarTiempo(i), ["contadorTiempo"]);

	relojDivDetallado = setInterval(function () {
		contadorTiempo.innerHTML = mostrarTiempo(i);
	}, 200);
	crearElemento("coordenadas", divDetallado, "div", regs[i].latitud + ", " + regs[i].longitud, ["coordenadas"]);

	//div texto largo
	let modoEdicion = false;
	crearElemento("divTextoLargo", divDetallado, "div");
	crearDivTextoLargo();
	function crearDivTextoLargo() {
		divTextoLargo.innerHTML = "";
		crearElemento("textoEditable", divTextoLargo, "div", regs[i].textoLargo, ["textolargo"]);
		let textoOriginal = textoEditable.textContent;
		let vacio = textoOriginal == "";
		console.log("textoOriginal asignado");

		if (modoEdicion == false) {
			if (vacio) {
				textoEditable.classList.add("oculto");
			}
			crearElemento("botonEditarTexto", divTextoLargo, "div", vacio ? "Añadir texto largo" : "Editar", ["boton", "botoneditartexto"], function () {
				modoEdicion = true;
				crearDivTextoLargo();
			});
		} else {
			textoEditable.contentEditable = true;
			textoEditable.classList.add("textoeditable");
			crearElemento("divBotonesEditar", divTextoLargo, "div");
			crearBotonesEditar();
			textoEditable.addEventListener("input", crearBotonesEditar);
			function crearBotonesEditar() {
				console.log("crear botones editar");
				divBotonesEditar.innerHTML = "";
				if (textoOriginal == textoEditable.textContent) {
					crearElemento("botonNoEditarTexto", divBotonesEditar, "div", "No editar", ["botonnoeditartexto", "boton"], function () {
						modoEdicion = false;
						crearDivTextoLargo();
					});
				} else {
					console.log("ha cambiado");
					crearElemento("botonGuardarTexto", divBotonesEditar, "div", "Guardar", ["boton", "botonguardartexto"], function () {
						regs[i].textoLargo = textoEditable.textContent;
						guardar();
						modoEdicion = false;
						crearDivTextoLargo();
					});
					crearElemento("botonNoGuardarTexto", divBotonesEditar, "div", "No guardar", ["boton", "botonnoguardartexto"], function () {
						textoEditable.textContent = textoOriginal;
						modoEdicion = false;
						crearDivTextoLargo();
					});
				}
			}
		}
	}
	//div boton volver
	crearElemento("volver", divDetallado, "button", "Volver", ["boton", "volver"], () => {
		registroActual = null;
		inicio();
	});
	//div boton favoritos
	let esFav = false;
	for (let f = 0; f < favs.length && esFav == false; f++) {
		if (regs[i].texto == favs[f]) {
			esFav = true;
			indiceFav = f;
		}
	}
	crearElemento("toggleFav", divDetallado, "button", esFav ? "Favorito" : "Añadir", ["boton", esFav ? "esfav" : "noesfav"], function () {
		esFav ? favs.splice(indiceFav, 1) : favs.unshift(regs[i].texto);
		guardar();
		inicio();
	});
	//div boton eliminar
	crearElemento("eliminar", divDetallado, "button", "Eliminar", ["eliminar", "boton"], function () {
		if (window.confirm('Eliminar el registro "' + regs[i].texto + '"?')) {
			eliminarRegistro(i);
		}
	});
	// Crear el elemento <div> que servirá como el contenedor del mapa
	crearElemento("divMapa", divDetallado, "div", undefined, "mapa");

	// Configurar el estilo del elemento <div>
	let mapDiv = document.querySelector(".mapa"); // Selecciona el elemento por clase

	// Crear el mapa Leaflet utilizando el elemento <div> como contenedor
	let map = L.map(mapDiv).setView([regs[i].latitud, regs[i].longitud], 13);

	// Agregar la capa de mapeo de OpenStreetMap al mapa
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	// Agregar un marcador al mapa (asegúrate de que regs[i].latitud y regs[i].longitud estén definidos)
	let marker = L.marker([regs[i].latitud, regs[i].longitud]).addTo(map);
	const fecha = regs[i].fecha // Puedes reemplazar esto con tu objeto Date

	// Obtenemos los componentes de fecha y hora
	const año = fecha.getFullYear();
	const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes ya que los meses se indexan desde 0
	const dia = String(fecha.getDate()).padStart(2, "0");
	const hora = String(fecha.getHours()).padStart(2, "0");
	const minutos = String(fecha.getMinutes()).padStart(2, "0");
	const segundos = String(fecha.getSeconds()).padStart(2, "0");

	// Construimos la cadena en el formato deseado
	const fechaHoraFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

	// Crear el contenido del popup (asegúrate de que evento.nombre y evento.fechaHora estén definidos)
	let popupContent = `
    <h3>${regs[i].texto}</h3>
    <p>${fechaHoraFormateada}</p>
`;

	// Vincular el contenido del popup al marcador y abrir el popup
	marker.bindPopup(popupContent);
	marker.openPopup();

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
		return "Hace " + dias + (dias == 1 ? " día " : " días ") + horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
	}
	function eliminarRegistro(indiceRegistro) {
		regs.splice(indiceRegistro, 1);
		guardar();
		inicio();
		registroActual = null;
	}
}
function crearDivRegistros() {
	crearElemento("divRegistros", root, "div");
	let dias = [];
	function getFechaString(fechaHora) {
		return `${fechaHora.getFullYear()}-${fechaHora.getMonth() + 1}-${fechaHora.getDate()}`;
	}
	//añadir los registros al html
	//este bucle recorre todos los registros y mete todas sus fechas diferentes en el array dias
	/* for (let i = 0; i < regs.length; i++) {
	let existe = false;
	for (let j = 0; j < dias.length && existe == false; j++) {
	  if (dias[j] === getFechaString(regs[i].fecha)) {
		existe = true;
	  }
	}
	if (!existe) {
	  dias.push(getFechaString(regs[i].fecha));
	}
  } */

	//voy a hacerlo a lo loco y en vez de obtener solo los días que tienen registros
	// o un calendario desde el primer registro hasta hoy voy a hacerlo en plan hard code
	// para que se muestre un calendario de colores desde 2022 por ejemplo

	let diaInicio = new Date("2022");
	let diaFin = new Date();
	let diaBucle = diaFin;
	while (diaBucle >= diaInicio) {
		dias.push(getFechaString(diaBucle));
		diaBucle.setDate(diaBucle.getDate() - 1);
	}

	//recorro el array de días
	for (let i = 0; i < dias.length; i++) {
		//obtengo el objeto date del día en cuestion
		let diaObj = new Date(dias[i]);
		crearElemento("dia", divRegistros, "div", undefined, ["dia", clasesDias[diaObj.getDay()], dias[i]]);
		dia.style = "background-color:" + colores[diaObj.getDay()];
		crearElemento("tituloDia", dia, "h2", `${nombresDias[diaObj.getDay()]} ${diaObj.getDate()}-${diaObj.getMonth() + 1}`, ["tituloDia"]);
	}
	//recorro todos los registros y los meto en su día correspondiente
	for (let i = 0; i < regs.length; i++) {
		//obtener el elemento día correpondiente
		let diaHtml = document.getElementsByClassName(getFechaString(regs[i].fecha));
		//añadir el registro al día
		crearElemento("registro", diaHtml[0], "div", `${regs[i].fecha.getHours().toString().padStart(2, "0")}:${regs[i].fecha.getMinutes().toString().padStart(2, "0")}: ${regs[i].texto}`, ["registro"], function () {
			registroActual = i;
			inicio();
		});
		crearElemento("textoLargoRegistro", registro, "span", typeof regs[i].textoLargo == "undefined" || regs[i].textoLargo == "" ? "" : ` - ${regs[i].textoLargo}`, ["textolargoregistros"]);
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

	const uniqueArrF = [];
	const uniqueObjF = {};

	for (let i = 0; i < favs.length; i++) {
		const key = favs[i];

		if (!uniqueObjF[key]) {
			uniqueObjF[key] = true;
			uniqueArrF.unshift(favs[i]);
		}
	}

	favs = uniqueArrF;

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
		inicio();
	} else {
		console.log("crear div descifrar");
		crearDivDescifrar();
	}
}
function comprobarPass(p) {
	if (Decrypt(localStorage.getItem("favoritos"), p) && Decrypt(localStorage.getItem("registros"), p)) {
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
		if (Decrypt(localStorage.getItem("colores"), pass) !== "[]" && Decrypt(localStorage.getItem("colores"), pass) !== false) {
			colores = JSON.parse(Decrypt(localStorage.getItem("colores"), pass));
		}
		if (regs) {
			for (let i = 0; i < regs.length; i++) {
				regs[i].fecha = new Date(regs[i].fecha);
			}
			console.log("se ha cargado");
			return true;
		}
	} else {
		return false;
	}
}
function guardar() {
	if (pass == "") {
		localStorage.setItem("favoritos", JSON.stringify(favs));
		localStorage.setItem("registros", JSON.stringify(regs));
		localStorage.setItem("colores", JSON.stringify(colores));
		console.log("guardado en texto plano");
	} else {
		localStorage.setItem("favoritos", Encrypt(JSON.stringify(favs), pass));
		localStorage.setItem("registros", Encrypt(JSON.stringify(regs), pass));
		localStorage.setItem("colores", Encrypt(JSON.stringify(colores), pass));
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
				console.log("dice que es una cadena vacía y eso es imposible que lo haya cifrado la otra función, toma un array vacío");
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
function crearElemento(nombreVariable, padre, tipoElemento, texto, clases, funcionElemento) {
	const newElement = document.createElement(tipoElemento);

	if (tipoElemento === "input" || tipoElemento === "textarea") {
		if (texto !== undefined) {
			newElement.placeholder = texto;
		}
		if (typeof funcionElemento === "function") {
			newElement.addEventListener("keypress", function (e) {
				if (e.key === "Enter") {
					funcionElemento();
				}
			});
		}
	} else {
		if (texto !== undefined) {
			newElement.textContent = texto;
		}
		if (typeof funcionElemento === "function") {
			newElement.addEventListener("click", funcionElemento);
		}
	}

	if (clases !== undefined) {
		if (!Array.isArray(clases)) {
			clases = [clases];
		}
		newElement.classList.add(...clases);
	}
	padre.appendChild(newElement);

	window[nombreVariable] = newElement;
}
function inicio() {
	clearInterval(relojDivDetallado);
	root.innerHTML = "";
	crearDivMenu();
	crearDivRegistrar();
	if (editarFavoritos) {
		crearEditarFavs();
	} else {
		crearDivFavoritos();
	}
	if (registroActual !== null) {
		crearDivDetallado(registroActual);
	} else {
		crearDivRegistros();
	}
}

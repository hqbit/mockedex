var obj = JSON.parse(pokemons);


//Global variables, color codes by Pokémon type
var colores = ["#6890F0","#B8B8D0","#A8B820","#7038F8","#F8D030",
"#705898","#F08030","#EE99AC","#98D8D8","#C03028","#C03028",
"#78C850","#F85888","#B8A038","#705848","#785223","#A040A0","#A890F0"];
var colorNames = ["Ag","Ac","Bi","Dr","El","Fa","Fu","Ha","Hi","Lu","No","Pl","Ps","Ro","Si","Ti","Ve","Vo"];

// Event boolean variables
var controlPulsado = false;
var capturado = false;

// Event keypress, when control is pressed, it will show the detailed stats of a Pokémon.
document.onkeydown = function (e) {
	if (e.ctrlKey) {
  		controlPulsado=true;
	}
	if(!capturado)
      	controlPulsado=false;     				
}

// Event keypress, when key is up, remove the current Pokémon.
document.onkeyup = function (e) { 

	while (document.getElementById("stats"))
      	document.getElementById("stats").parentNode.removeChild(document.getElementById("stats"));

  	controlPulsado=false;
}

// When on hover over a Pokémon, get its ID to pass it to the detailed stats Pokémon.
function captura (id){

	if(controlPulsado) {
		cartaGrande(id);
	}

	capturado = true;

}

// When the mouse hovers over another Pokémon.
function borrado (){

	while (document.getElementById("stats"))
      	document.getElementById("stats").parentNode.removeChild(document.getElementById("stats"));

      capturado = false;
}


// Filter and order the Pokémons
function script(){


	/// Datos de usuario

	var filtro = getData();		//Creamos el filtro con los tipos elegidos por el usuario
		

	/// Filtramos por tipo 

	var filtrado = filt_tipo(filtro);	//Nos devuelve un array con los pokemons que cumplen el filtro de tipos


	///Filtraremos por nombre

	filtrado = filt_nombre(filtrado);	//Nos devuelve un array con los pokemons que cumplen el filtro de nombres


	///Filtraremos por número 

	filtrado = filt_numero(filtrado);	//Nos devuelve un array con los pokemons que cumplen el filtro de número


	///Ordenamos

	filtrado = ordenar(filtrado);


	/// Ya tenemos el filtro creado y ordenado, ahora imprimimos los pokemon resultantes


	imprimir(filtrado);
		
}


function getData(){	//Captura que checkbox de tipos están seleccionados

	var filtro = []; p = 0;

	if(document.getElementById("Agua").checked == true){filtro[p] = "Agua"; p++;}
	if(document.getElementById("Dragon").checked == true){filtro[p] = "Dragón"; p++;}
	if(document.getElementById("Fuego").checked == true){filtro[p] = "Fuego"; p++;}
	if(document.getElementById("Volador").checked == true){filtro[p] = "Volador"; p++;}
	if(document.getElementById("Normal").checked == true){filtro[p] = "Normal"; p++;}
	if(document.getElementById("Hada").checked == true){filtro[p] = "Hada"; p++;}
	if(document.getElementById("Tierra").checked == true){filtro[p] = "Tierra"; p++;}
	if(document.getElementById("Roca").checked == true){filtro[p] = "Roca"; p++;}
	if(document.getElementById("Electrico").checked == true){filtro[p] = "Eléctrico"; p++;}
	if(document.getElementById("Planta").checked == true){filtro[p] = "Planta"; p++;}
	if(document.getElementById("Siniestro").checked == true){filtro[p] = "Siniestro"; p++;}
	if(document.getElementById("Fantasma").checked == true){filtro[p] = "Fantasma"; p++;}
	if(document.getElementById("Bicho").checked == true){filtro[p] = "Bicho"; p++;}
	if(document.getElementById("Hielo").checked == true){filtro[p] = "Hielo"; p++;}
	if(document.getElementById("Psiquico").checked == true){filtro[p] = "Psíquico"; p++;}
	if(document.getElementById("Lucha").checked == true){filtro[p] = "Lucha"; p++;}
	if(document.getElementById("Acero").checked == true){filtro[p] = "Acero"; p++;}
	if(document.getElementById("Veneno").checked == true){filtro[p] = "Veneno"; p++;}

	return filtro;

}

//Aplicamos el filtro de tipos
function filt_tipo(filtro){
	n = 0;
	var filtrado = [];

		for(i=0 ; i < obj.length; i++){

			switch(filtro.length){

				case 0: //Todos los numeros
					if(i == 0) 
						filtrado = todos();
					break;

				case 1:
					for(var t = 0; t < obj[i].tipo.length; t++)
						if(obj[i].tipo[t] == filtro[0]){
							filtrado[n] = obj[i].numero;
							n++; 
						}break;

				case 2:
					if(filtro.length == 2 && obj[i].tipo.length == 2)
						if((obj[i].tipo[0] == filtro[0] && obj[i].tipo[1] == filtro[1]) || (obj[i].tipo[0] == filtro[1] && obj[i].tipo[1] == filtro[0])){
							filtrado[n] = obj[i].numero;
							n++;
						}break;

				default:
					//No tiene un numero valido de filtros
			}
		}

		return filtrado;

}


function filt_nombre(filtrado){	//Aplicamos el filtro de nombres

	var filtrar_nombre = document.getElementById("filtrar_nombre").value;
	n = 0; var filtrado_texto = [];

	for(i=0 ; i < filtrado.length; i++)
		if(obj[parseInt(filtrado[i])-1].nombre.toLowerCase().includes(filtrar_nombre.toLowerCase(), 0)){
			filtrado_texto[n] = obj[parseInt(filtrado[i])-1].numero;
			n++;
		}
			
	return filtrado_texto;

}


function filt_numero(filtrado){	//Aplicamos el filtro de números

	var filtrar_numero = document.getElementById("filtrar_numero").value;
	n = 0; 
	var filtrado_numero = [];

	for(i=0 ; i < filtrado.length; i++)
		if(obj[parseInt(filtrado[i])-1].numero == parseInt(filtrar_numero) || filtrar_numero == ""){
			filtrado_numero[n] = obj[parseInt(filtrado[i])-1].numero;
			n++;
		}
		
	return filtrado_numero;

}

function ordenar(filtrado){

	var select = document.getElementsByTagName('select')[0];
	var selectedValue = select.options[select.selectedIndex].value;

	/// Ordenamos por nombre
	if(selectedValue == "1")
		filtrado = ord_numero(filtrado);

	///Ordenamos por tipo
	if(selectedValue == "3") 
		filtrado = ord_tipo(filtrado);
	
	/// Ordenamos por nombre
	if(selectedValue == "2")
		filtrado = ord_nombre(filtrado);

	return filtrado;
	
}


function ord_numero(filtrado){

	return filtrado.sort(function(a, b){return a-b});

}


function ord_nombre(filtrado){

	for(var y = 0; y < filtrado.length; y++)	//Pasamos de ID a nombre
		filtrado[y] = obj[parseInt(filtrado[y])-1].nombre;
		filtrado = filtrado.sort();		//Ordenar por abc	

	for(var y = 0; y < filtrado.length; y++)	//Pasa de nombre a ID
		for(var o = 0; o < obj.length; o++)
			if(filtrado[y] == obj[o].nombre)
				filtrado[y] = obj[o].numero;

	return filtrado;
}


function ord_tipo(filtrado){


			var n = 0; var filtrado_tipos = [];

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Acero"){	//Solo tendremos en cuenta el tipo principal
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Agua"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Bicho"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Dragón"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)	
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Eléctrico"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Fantasma"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Fuego"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Hada"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Hielo"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}
					
			for(var y = 0; y < filtrado.length; y++)	
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Lucha"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)	
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Normal"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Planta"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Psíquico"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Roca"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)			
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Siniestro"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)		
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Tierra"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}
					
			for(var y = 0; y < filtrado.length; y++)	
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Veneno"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			for(var y = 0; y < filtrado.length; y++)	
				if(obj[parseInt(filtrado[y])-1].tipo[0] == "Volador"){
					filtrado_tipos[n] = obj[parseInt(filtrado[y])-1].numero; n++;}

			return filtrado_tipos;	//Guardamos el vector con su nombre inicial

}


function todos(){	//Creamos un array con todos los numeros (pokemon) del 1-150

	var filtrado = [];

	for (var q = 0; q < 150; q++) {
		filtrado[q] = q + 1;
	}

	return filtrado;
}


//Función para imprimir todas las cartas
function imprimir(filtrado){

	var myNode = document.getElementById("lista");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}

	var miNodo = document.getElementsByTagName('article')[0];
	while(miNodo.firstChild){
		miNodo.removeChild(miNodo.firstChild)
	}

	for (var m = 0; m < filtrado.length; m++) {

		//En el índice de cada Pokémon
			var numero = parseInt(filtrado[m]) - 1;

		//Crea la carta con su respectivo id que es el número del Pokémon y clase
			var carta = document.createElement("SECTION");
			carta.id = obj[numero].numero;
			carta.className = "carta";
			carta.setAttribute("onmouseout","borrado()");
			carta.setAttribute("onmouseenter","captura(this.id)");
			carta.setAttribute("onmouseover","captura(this.id)");
			//onmouseout = 'borrado()' onmouseover = 'captura(this.id)'
		
		//Nombre y número de la carta
		var name = document.createElement("DIV");
		name.className = "name";
		name.textContent = obj[numero].nombre;

		var number = document.createElement("DIV");
		number.className = "number";
		number.textContent = obj[numero].numero;

		carta.appendChild(name);
		carta.appendChild(number);


		//Eligiendo los colores para el fondo de las cartas
			var fondo = ""; var tipo2 = "";
			var tipo1 = obj[numero].tipo[0].substring(0,2);
			var colorIndex = colorNames.indexOf(tipo1);
			var color1 = "rgba(0, 0, 0, 0)";
			var color2 = colores[colorIndex];
			
			if (obj[numero].tipo[1] !== undefined){
				var tipo2 = obj[numero].tipo[1].substring(0,2);
				var colorIndex = colorNames.indexOf(tipo2);
				var color1 = colores[colorIndex];
			}
			var fondo = "radial-gradient(ellipse ,"+color1+", "+color2+")";

			carta.style.background = fondo;
		///Insertar la carta mediana
			var mediano = document.createElement("DIV");
			mediano.className = "mediano"
			//mediano.style.background = fondo;
			var img = document.createElement("IMG");
			img.src = "./recursos/img/mediana/"+obj[numero].numero+".png";
			mediano.appendChild(img);
			carta.appendChild(mediano); 


		///Las preevoluciones
		if (typeof(obj[numero].prev_evolucion) != "undefined"){
			for(var j = 0 ; j < obj[numero].prev_evolucion.length; j++){
				
				//Crear preevoluciones
				var evol = document.createElement("DIV");
				evol.className = "evol";
				
				var img_evol = document.createElement("IMG");
				img_evol.className = "imgevol";
				img_evol.src = "./recursos/img/peque/"+obj[numero].prev_evolucion[j].num+".png";
				
				var parra = document.createElement("P");
				parra.className = "texto";
				var texto = document.createTextNode(obj[numero].prev_evolucion[j].name);
				

				parra.appendChild(texto);
				evol.appendChild(img_evol);
				evol.appendChild(parra);

				carta.appendChild(evol);

			}

		}

		//Crear el actual
			var actual = document.createElement("DIV");
			actual.className = "actual";	
			var img_actual = document.createElement("IMG");
			img_actual.className = "imgactual";
			img_actual.src = "./recursos/img/peque/"+obj[numero].numero+".png";
			var parra = document.createElement("P");
			parra.className = "texto";
			var texto = document.createTextNode(obj[numero].nombre);
			

			parra.appendChild(texto);
			actual.appendChild(img_actual);
			actual.appendChild(parra);
			carta.appendChild(actual);


		//Las evoluciones
		if (typeof(obj[numero].post_evolucion) != "undefined"){
			for(var j=0; j < obj[numero].post_evolucion.length; j++){


				//Crear evoluciones
				var evol = document.createElement("DIV");
				evol.className = "evol";
				
				var img_evol = document.createElement("IMG");
				img_evol.className = "imgevol";
				img_evol.src = "./recursos/img/peque/"+obj[numero].post_evolucion[j].num+".png";
				
				var parra = document.createElement("P");
				parra.className = "texto";
				var texto = document.createTextNode(obj[numero].post_evolucion[j].name);
				

				parra.appendChild(texto);
				evol.appendChild(img_evol);
				evol.appendChild(parra);
				carta.appendChild(evol);

			}
		}

		var myNode = document.getElementsByTagName("article")[0];

		document.getElementsByTagName('article')[0].appendChild(carta);
		//PARA LAS OPCIONES
			opcion = document.createElement('option');
			///al tag option le estoy metiendo atributo value con valor el nombredelpokemon en formato string
			opcion.value = obj[numero].nombre;
			//opcion.setAttribute("value",obj[numero].nombre);
			
			//En este caso estoy identificando la sección adonde voy a imprimir el pokemon en cuestion
		    document.getElementById("lista").appendChild(opcion);
	}

	if(filtrado.length == 0)	document.getElementsByTagName('article')[0].innerHTML = "No existe ningún pokemon con estas características";

}

//Funcion para generar el popup
function cartaGrande(id){

	if(!document.getElementById("stats")){	//Si existe no lo creamos de nuevo
	ventana = document.createElement("DIV");
	ventana.id = "stats";
	document.getElementsByTagName("article")[0].appendChild(ventana);

	//Definición de máximas estadísticas para la carta y las características
	//han sido obtenidas con otro script externo a esta aplicación.
	var maxs = [134,180, 250, 154, 125, 140]
	var caract = ["Ataque","Defensa","Puntos de vida","Ataque especial","Defensa especial","Velocidad"];

	//Creación de la sección de la carta
	var secc = document.createElement("DIV");
	secc.id = "popup";
	identificador = parseInt(id)-1;
	secc.style.fontFamily ="Verdana";

	//Apéndice de la imagen
	var imagen = document.createElement("IMG");
	imagen.src = "./recursos/img/grande/"+id+".png";
	secc.appendChild(imagen);

	//Generación y apéndice de la carta en cuestión
	for (i=0; i < maxs.length; i++) {	

		//Texto de la característica
		var texto = document.createTextNode(caract[i]);
		secc.appendChild(texto);

		//El llenado y el recipiente
		var lleno = document.createElement("DIV");
		var llenado = document.createElement("DIV");
		
		//Estilando y definiendo a longitud del div
		llenado.style.width = "100%";
		llenado.style.backgroundColor ="#E4E4E4";
		lleno.style.width = (parseInt(obj[identificador].estadisticas[caract[i]])/maxs[i])*100 + "%";
		lleno.style.backgroundColor = "#4CAF50";
		lleno.style.height = "18px";

		//Apéndice desde los hijos hasta el padre
		llenado.appendChild(lleno);
		secc.appendChild(llenado);


	
	}

	document.getElementById("stats").appendChild(secc);}

	///Posicionar el elemento
	var elemento = document.getElementById(id);
	var posicion = elemento.getBoundingClientRect();

	datos = document.getElementById("popup");
 

	if(elemento.offsetTop > window.pageYOffset + screen.height/2 - 40)	//Calculamos donde se encuentra el elemento y decidimos la altura
		var x = +100;
	else
		var x = +100;
				

	if(elemento.offsetLeft > screen.width/2)	//Calculamos donde se encuentra el elemento y decidimos derecha-izquierda
		var y = elemento.offsetLeft - 510;
	else
		var y = elemento.offsetLeft + 175;

	datos.style.top = parseInt(x)+"px";	//Aplicamos la posición
	datos.style.left = parseInt(y)+"px";



}


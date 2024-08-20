window.onload = function() {
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET","bios.xml");
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState==4 && xhttp.status==200) {
			crearImagenes(xhttp.responseXML);
		}
	}
}

function crearImagenes(xmlDoc) {
	let mate = xmlDoc.documentElement.childNodes;
	let datos = [];
	let paises = [];

	for (var i = 0; i < mate.length; i++) {
		if(mate[i].nodeType==1){
			m = mate[i].childNodes;
			datos.push({
				apellido:m[1].childNodes[0].nodeValue,
				nombre:m[3].childNodes[0].nodeValue,
				pais:m[5].childNodes[0].nodeValue,
				nacimiento:parseInt(m[7].childNodes[0].nodeValue),
				fallecimiento:parseInt(m[9].childNodes[0].nodeValue),
				imagen:m[11].childNodes[0].nodeValue,
				bio:m[13].childNodes[0].nodeValue
			});
			if (paises.includes(m[5].childNodes[0].nodeValue)==false) {
				paises.push(m[5].childNodes[0].nodeValue);
			}
		}
	}
	delete xmlDoc, mate;
	datos.sort(function(a, b) {
		if (a.nacimiento > b.nacimiento) { return 1; }
		if (a.nacimiento < b.nacimiento) { return -1; }
		return 0;
	})
	console.log(paises.sort());
	let tabs = document.getElementById("tab");
	let contenido = document.getElementById("contenido");

	paises.forEach(p=>{
		let boton = document.createElement("button");
		boton.setAttribute("class","tablinks");
		boton.innerHTML = p;
		tabs.appendChild(boton);

		boton.addEventListener("click",function(e) {
			pais = this.innerText;
			let i, tabcontenidos, tablinks;
			tabcontenidos = document.getElementsByClassName("tabcontenido");
			for (i = 0; i < tabcontenidos.length; i++) {
				tabcontenidos[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablinks");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" activa","");
			}
			document.getElementById(pais).style.display = "block";
			e.currentTarget.className += " activa";
		});
		//
		//Crear contenedores
		//
		let tab = document.createElement("div");
		tab.setAttribute("class","tabcontenido");
		tab.setAttribute("id",p);
		tab.innerHTML = "<h3>"+p+"</h3>";
		contenido.appendChild(tab);
	});

	datos.forEach(a=>{
		let pais = a.pais;
		let tab = document.getElementById(pais);
		let contenedor = document.createElement("div");
		contenedor.setAttribute("class","contenedor");
		let n = a.nombre+" "+a.apellido;
		let f = "("+a.nacimiento+"-"+a.fallecimiento+")";
		imagen = "<img src='img/"+a.imagen+"' alt='"+f+n+"' title='"+f+n+"' style='height:250px;'>";
		contenedor.innerHTML = imagen;
		tab.appendChild(contenedor);
	});
}
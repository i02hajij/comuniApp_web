function buscarPorCIF(cif) {
  const url = "http://localhost:4000/api/v1/comunidades/ver/CIF/" + cif.value;
  console.log("url = ", url);
  axios
    .get(url, {
      responseType: "json",
    })
    .then(function (res) {
      if (res.status == 200) {
        generarTabla(res);
      }
      //console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function generarTabla(res) {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

  const literales = [
    "Nombre",
    "CIF",
    "Portales",
    "Premium",
    "Dirección",
    "Localidad",
    "Ciudad",
    "Código Postal",
  ];
  // Crea las celdas
  for (var i = 0; i < literales.length; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
    for (var j = 0; j < 2; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = "";
      if (j === 0) {
        textoCelda = document.createTextNode(literales[i]);
      } else {
        var texto = "";
        switch (i) {
          case 0:
            texto = res.data.data.nombre;
            break;
          case 1:
            texto = res.data.data.cif;
            break;
          case 2:
            res.data.data.portales.forEach((element) => {
              texto += element.numero + " ";
            });
            break;
          case 3:
            texto = res.data.data.esPremium ? "Sí" : "No";
            break;
          case 4:
            texto = res.data.data.direccion;
            break;
          case 5:
            texto = res.data.data.localidad;
            break;
          case 6:
            texto = res.data.data.ciudad;
            break;
          case 7:
            texto = res.data.data.codigoPostal;
            break;
        }
        textoCelda = document.createTextNode(texto);
      }
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}

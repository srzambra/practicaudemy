function getFilePath(file) {
  // este va a recibir un fichero de los que llegan po HTTTP
  const filePath = file.path; // aca obtenemos la ruta pero toda la ruta
  const fileSplit = filePath.split("\\"); // este lo que hace es divivir el camino el path y envia un arrglo con el camino separado uploars/avatar/djasdjais y me llega [uploads, avatar, jasjsa] todo separado

  return `${fileSplit[1]}/${fileSplit[2]}`; // por ejemplo el camino ahora es [uploads,avatar,slajsa.jpg] tomo avatar y jajsaj.jpg
}

module.exports = { getFilePath };

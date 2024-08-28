function determinarInput() {
    document.getElementById("textoCifrado").addEventListener("input", function() {
        let texto = this.value.toLowerCase();
        
        texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        this.value = texto;
    });
}

function cargarConDOMListo(callback) {
    document.addEventListener("DOMContentLoaded", callback);
}

function encriptarTexto() {
    const textarea = document.getElementById('textoCifrado');
    let texto = textarea.value;

    texto = texto.toLowerCase();

    texto = texto.replace(/e/g, 'enter');
    texto = texto.replace(/i/g, 'imes');
    texto = texto.replace(/a/g, 'ai');
    texto = texto.replace(/o/g, 'ober');
    texto = texto.replace(/u/g, 'ufat');

    const resultadoDiv = document.querySelector('.resultado-cifrado');
    resultadoDiv.innerHTML = `
        <h5>${texto}</h5>
        <button class="btn btn-light text-primary mt-2" id="copiar">Copiar</button>
    `;

    resultadoDiv.querySelector('img').style.display = 'none';
    resultadoDiv.querySelector('h3').style.display = 'none';
    resultadoDiv.querySelector('h5').style.display = 'block';
    document.getElementById('copiar').addEventListener('click', copiarAlPortapapeles);
}

function desencriptarTexto() {
    const textarea = document.getElementById('textoCifrado');
    let texto = textarea.value;

    texto = texto.toLowerCase();

    texto = texto.replace(/enter/g, 'e');
    texto = texto.replace(/imes/g, 'i');
    texto = texto.replace(/ai/g, 'a');
    texto = texto.replace(/ober/g, 'o');
    texto = texto.replace(/ufat/g, 'u');

    const resultadoDiv = document.querySelector('.resultado-cifrado');
    resultadoDiv.innerHTML = `
        <h5>${texto}</h5>
        <button class="btn btn-light text-primary mt-2" id="copiar">Copiar</button>
    `;

    resultadoDiv.querySelector('img').style.display = 'none';
    resultadoDiv.querySelector('h3').style.display = 'none';
    resultadoDiv.querySelector('h5').style.display = 'block';
    document.getElementById('copiar').addEventListener('click', copiarAlPortapapeles);
}

function copiarAlPortapapeles() {
    const texto = document.querySelector('.resultado-cifrado h5').textContent;
    navigator.clipboard.writeText(texto)
        .then(() => {
            mostrarSnackbar('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles: ', err);
        });
}

function mostrarSnackbar(mensaje) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = mensaje;
    snackbar.className = 'show';
    setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
    }, 3000);
}

function determinarBoton() {
    document.getElementById('encriptar').addEventListener('click', encriptarTexto);
    document.getElementById('desencriptar').addEventListener('click', desencriptarTexto);
    document.querySelector('.resultado-cifrado').addEventListener('click', function(event) {
        if (event.target && event.target.id === 'copiar') {
            copiarAlPortapapeles();
        }
    });
}
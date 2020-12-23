var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// Referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var buscarContacto = $('#buscarContacto');
var header = $('#chat-main-header');
var buscarDiv = $('#buscarDiv');
var atras = $('#atras');


// Funciones para renderizar usuarios
function renderizarUsuarios(personas = []) { // [{}, {}, {}]

    var html = '';
    if (personas.length === 0) {
        html += '<li>';
        html += '   <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
        html += '</li>';

    } else {
        html += '<li>';
        html += '   <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
        html += '</li>';
        for (var i = 0; i < personas.length; i++) {
            html += '<li>';
            html += '   <a  data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
            html += '</li>';
        }
    }

    divUsuarios.html(html);
}


function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '    <h5>' + mensaje.nombre + '</h5>';
        html += '    <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {
        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '    <div class="chat-content">';
        html += '    <h5>' + mensaje.nombre + '</h5>';
        html += '    <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}


function renderTitulo(titulo) {
    var html = '';

    html += '   <div class="p-20 b-b">';
    html += '       <h3 class="box-title">Sala de chat <small>' + titulo + '</small></h3>';
    html += '   </div>';

    header.html(html);
}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}



// Listeners de jQuery
divUsuarios.on('click', 'a', function() {
    // $(this) hace referencia en este caso a 'a'
    // y accedo al atributo data
    var id = $(this).data('id');

    if (id) {
        console.log(id);
        // socket.emit('enviarMensajePrivado', {
        //     para: id,
        //     mensaje: 'hola mundo'
        // });
    }
});



formEnviar.on('submit', function(e) {
    // Esto me evita de que el submit me recargue el browser
    e.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        usuario: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});


buscarContacto.on('change', function() {

    socket.emit('buscarPersonas', {
        usuario: buscarContacto.val().toLowerCase(),
        sala
    }, function(personasEncontradas) {
        if (personasEncontradas.length !== 0) {
            renderizarUsuarios(personasEncontradas);
        } else {
            renderizarUsuarios();
        }

    });
});
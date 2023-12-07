const socket = io('http://localhost:8000', { transports: ['websocket'] });
const form = document.querySelector('.send-container');
const msg_input = document.querySelector('.form-control');
const msg_container = document.querySelector('.message-container');
const audio_play = new Audio('Ting sound effect.mp3')
const append = (msg, position) => {
    const msgdiv = document.createElement("div");
    msgdiv.innerText = msg;
    msgdiv.classList.add('message');
    msgdiv.classList.add(position);
    msg_container.append(msgdiv);
    if (position == 'left') {
        audio_play.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msg_input.value;
    append(`You:${message}`, 'right')
    socket.emit('send', message);
    msg_input.value = '';
})
const username = prompt('Enter Your Name');
socket.emit('newone-joined', username);
socket.on('user-joined', data => {
    console.log(data);
    append(`${username} joined the chat`, 'right')
})
socket.on('receive', data => {
    console.log(data);
    append(`${data.name}:${data.message}`, 'left')
})
socket.on('leave', name => {
    append(`${name}left the chat`, 'left')
})
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

const ejs = require('ejs');

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    ejs.renderFile('./views/template.ejs', { }, (err, data) => {
        if(err){
            return res.send('Erro na leitura do arquivo')
        }
        
        return res.send(data)
    })
})

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', {msg, socket: socket.id});
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



http.listen(port, error => {
    if(error) {
        console.log(error);
    } else {
        console.log('[server] started')
        console.log(`[port] ${port}`)
    }

})
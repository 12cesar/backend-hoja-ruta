const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/database');
const http = require('http');
const socketIO = require('socket.io');
const { conectarCliente } = require('../sockets/usuario-socket');
const sequelize = require('../database/database');
class Server{
    static _intance=Server;
    io=socketIO.Server;
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            /* auth: '/api/auth',
            usuario: '/api/usuario',
            uploads: '/api/uploads' */
            rol:'/api/roles',
            area:'/api/area',
            usuario: '/api/usuario',
            auth: '/api/auth',
            tramiteinterno:'/api/tramite-interno',
            rutainterna:'/api/ruta-interna',
            prioridad:'/api/prioridad'
        }
        //Connect to socket
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors:{
                origin:true,
                credentials:true
            }
        })
        // Connect to database
        this.connectDB();
        //  listen Sockets
        this.listenSockets();
        // Middlewares
        this.middlewares();
        // Routes application
        this.routes();
    }
    static get instance(){
        return this._intance || (this._intance=new this());
    }
    async connectDB(){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    listenSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente=>{
            console.log('Cliente conectado');
            conectarCliente(cliente, this.io);
        })
    }
    middlewares(){
        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        
    }
    routes(){
        this.app.use(this.paths.rol, require('../routes/roles'));
        this.app.use(this.paths.area, require('../routes/areas'));
        this.app.use(this.paths.usuario, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.tramiteinterno, require('../routes/tramite-internos'));
        this.app.use(this.paths.rutainterna, require('../routes/ruta-internas'));
        this.app.use(this.paths.prioridad, require('../routes/prioridades'));
        /* this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuario, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads')); */
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
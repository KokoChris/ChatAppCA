'use strict';
const h = require('../helpers')

module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;
    
    io.of('/roomslist').on('connection', socket => {
        socket.on('getChatrooms', () => {

            socket.emit('chatRoomsList', JSON.stringify(allrooms))


        });

        socket.on('createNew', newRoomInput => {

        	if(!h.findRoomByName(allrooms,newRoomInput)) {
        		

                allrooms.push({
        			room: newRoomInput,
        			roomID: h.randomHex(),
        			users:[]
        		});

        		socket.emit('chatRoomsList' , JSON.stringify(allrooms));
        		
        		socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
        	}
        });
    });


    io.of('/chatter').on('connection',socket => {

        socket.on('join', data => {

             let usersList  = h.addUserToRoom(allrooms, data , socket);
             console.log("userlist: " , usersList );

        });

    });
}

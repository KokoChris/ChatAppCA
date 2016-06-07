'use strict';


module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;
    allrooms.push({
        room: 'Good Food',
        roomID: '0001',
        users: []
    });
    allrooms.push({
        room: "Papa",
        roomID: '0002',
        users: []
    });
    io.of('/roomslist').on('connection', socket => {
        socket.on('getChatrooms', () => {

            socket.emit('chatRoomsList', JSON.stringify(allrooms))

        });
    });

}

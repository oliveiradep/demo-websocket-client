window.onload = function () {
    //page elements
    var form = document.getElementById("message-form");
    var messageField = document.getElementById("message");
    var messagesList = document.getElementById("messages");
    var socketStatus = document.getElementById("status");
    var closeBtn = document.getElementById("close");

    //create a new socket
    var socket = new WebSocket("wss://echo.websocket.org/");

    //error handling
    socket.onerror = function (error) {
        console.log("WebSocket Error: ", error);
    };

    //connection client x server
    socket.onopen = function (event) {
        socketStatus.innerHTML =
            "Connected to the server: " + event.currentTarget.url;
        socketStatus.className = "open";
    };

    //receive messages after 5 seconds
    socket.onmessage = async function (event) {
        var message = event.data;
        await new Promise(r => setTimeout(r, 5000));
        messagesList.innerHTML +=
            '<li class="received"><span>Received:</span>' + message + "</li>";
    };

    //disconnection client x server
    socket.onclose = function (event) {
        socketStatus.innerHTML = "WebSocket disconnected.";
        socketStatus.className = "closed";
    };

    //send messages
    form.onsubmit = function (e) {
        e.preventDefault();

        //get message field value
        var message = messageField.value;

        //send message
        socket.send(message);

        //concat message
        messagesList.innerHTML +=
            '<li class="sent"><span>Sent:</span>' + message + "</li>";

        //clean message field value
        messageField.value = "";

        return false;
    };

    //close connection
    closeBtn.onclick = function (e) {
        e.preventDefault();

        socket.close();

        return false;
    };
};
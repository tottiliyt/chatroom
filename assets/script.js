document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");

  //send welcome message
  appendWelcome(username);
  socket.emit("uname", username);
  socket.emit("connected", username);
  
  form.addEventListener("submit", (event) => {
    socket.emit("message", {
      user: username,
      message: messageToSend.value,
    });
    messageToSend.value = "";
    event.preventDefault();
  });

  //append online users message
  socket.on("online", users =>{
    const container = document.createElement('li');
    const badge = document.createElement("span")
    badge.classList.add("green");
    badge.classList.add("badge");
    badge.innerText = "BlooChatApp";
    container.appendChild(badge);
    const message = document.createElement("span");
    message.classList.add("green");
    var userlist = '';
    // if there is no one else in chatroom
    if(users.length<=1){
      userlist = 'Unfortunately no one is online at this momnent';
    }
    //loop over all users
    else{
      userlist = 'online users: '
      for(let i = 0; i<users.length; i++){
        if(users[i]!=username){
          userlist+=users[i];
          userlist+=" ";
        }
      }
    }
    message.innerHTML = userlist;
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });

  //append the join room message
  socket.on("connected-message", username =>{
    const container = document.createElement('li');
    const badge = document.createElement("span")
    badge.classList.add("green");
    badge.classList.add("badge");
    badge.innerText = "BlooChatApp";
    container.appendChild(badge);
    const message = document.createElement("span");
    message.classList.add("green");
    message.innerHTML = username +' joined the room!';
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });

  // append the chat text message
  socket.on("message", (msg) => {
    const container = document.createElement('li');
    const badge = document.createElement("span")
    badge.classList.add("badge");
    badge.innerText = msg.user;
    container.appendChild(badge);
    const message = document.createElement("span");
    message.innerHTML = msg.message;
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });
  
  // append the leave room message
  socket.on("disconnect-message", username =>{
    const container = document.createElement('li');
    const badge = document.createElement("span")
    badge.classList.add("red");
    badge.classList.add("badge");
    badge.innerText = "BlooChatApp";
    container.appendChild(badge);
    const message = document.createElement("span");
    message.classList.add("red");
    message.innerHTML = username +' left the room!';
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });

  // append the welcome message
  function appendWelcome(username){

    const container = document.createElement('li');
    const badge = document.createElement("span")
    badge.classList.add("green");
    badge.classList.add("badge");
    badge.innerText = "BlooChatApp";
    container.appendChild(badge);
    const message = document.createElement("span");
    message.classList.add("green");
    message.innerHTML = `Welcome ` + username +'!';
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  }

  function autoscroll(){
    var xH = messages.scrollHeight; 
    messages.scrollTo(0, xH);
  }
});

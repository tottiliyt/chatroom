# Bloo Chat

A simple realtime messaging application build with Node, Express, and Socket.io.

After cloning the application, run `npm install` to install the dependencies. 

To run the application, use the command `npm run dev`.

This app uses Socket.io to manage real time web socket connections to a Node.js server(deploy on index.js) that will allow users to send chat messages to all clients(deploy on script.js) connected to a single server. When user run index.js, our html page, which adopt template engine that allows dynamically update and inheritance, collect information like username and text message then emit them to server via Socket.io. When server recieve these information, it boardcast them to all clients and display on their html page.

The application is deployed on [Heroku](https://thawing-retreat-40076.herokuapp.com/).
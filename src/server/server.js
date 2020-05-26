import Path from 'path';
import Http from 'http';
import Express from 'express';

const app = Express();
const server = Http.Server(app);
const port = process.env.PORT || 3000;

// Add static file middleware (to serve static files).
app.use('/public', Express.static(Path.join(__dirname, '../public')));

// When a request is made from the server, deliver the client.
app.get('/', function(request, response) {
  response.sendFile(Path.join(__dirname, '../public/index.html'));
})

// Tell server to start listening for connections.
server.listen(port, () => {
  console.log('\n🌏 server init complete, listening for connections on port ' + port + ' 🌏\n');
});

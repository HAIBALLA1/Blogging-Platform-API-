const http = require('http');
const app= require('./app');

app.set('port', process.env.PORT || 3012);

const server = http.createServer(app);


server.listen(3012) ;
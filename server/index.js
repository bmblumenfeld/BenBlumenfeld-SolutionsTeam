const express = require('express');

const app = express();
app.set('port',3003);
app.use(express.static(__dirname + '/../client/dist'))



app.listen(app.get('port'),()=> console.log(`listening on port ${app.get('port')}`))
var express    = require('express');
var enforce    = require('express-sslify');
var fallback   = require('express-history-api-fallback');

var port  = process.env.PORT ? JSON.parse(process.env.PORT) : 8080;

console.log('-- port:  ' + port);

var app  = express();
var root = __dirname + '/build';

// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
// a load balancer (e.g. Heroku). See further comments below
if (process.env.PORT) {
  console.log('-- enforce SSL');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

app.listen(port, function () {
  console.log('App Server is running on port ' + port + '!');
});

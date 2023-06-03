const http = require('http');

const routes = require('./routes');
const bodyParse = require('./helpers/bodyParse');

const { URL } = require('url');

const server = http.createServer((request, response) => {
  const parseUrl = new URL(`http://localhost:3000${request.url}`)
  console.log(`Request method: ${request.method} | Endpoint: ${parseUrl.pathname}`);

  let { pathname } = parseUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.enpoint == pathname && routeObj.method == request.method
  ));

  if (route) {
    request.query = Object.fromEntries(parseUrl.searchParams)
    request.params = { id }
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'aplication/json'});
      response.end(JSON.stringify(body));
    };

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParse(request, () => route.handler(request, response))
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html'});
    response.end(`Cannot ${request.method} ${parseUrl.pathname}`);
  }
});

server.listen(3000, () => console.log('Server started at http://localhost:3000'))
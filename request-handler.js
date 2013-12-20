var statusCode;

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};



var actionListener = {
  'POST': saveMessage,
  'GET': sendMessages,
  'OPTIONS': sendOptions
};



var saveMessage = function(request, response){
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });


  request.on('end', function(chunk){
    var temp = JSON.parse(data);
    temp['createdAt'] = new Date();
    temp = JSON.stringify(temp);
    exports.storage.storeData(temp);
    statusCode = 201;
    response.writeHead(statusCode, headers);
    response.end('[' + exports.storage.getData() + ']');
  });

};

var sendMessages = function(request, response){
  statusCode = 200;
  response.writeHead(statusCode, headers);
  response.end('[' + exports.storage.getData() + ']');
};

var sendOptions = function(request, response){
  statusCode = 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(null));
};




exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  request.setEncoding('utf8');

  response.writeHead(statusCode, headers);

  actionListener[request.method](request, response);
  
};











Status API Training Shop Blog About
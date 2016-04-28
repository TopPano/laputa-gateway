var http = require('http');
    httpProxy = require('http-proxy'),
    config = require('./config.json');

var proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
    
    proxy.on("error", function(e){console.log(e);});
    if(req.headers['user-agent.match'] !== 'ELB-HealthChecker\/1.0')
    {
        if(req.headers['x-forwarded-proto']=== 'http'){
            res.writeHead(301,{
                'Location': 'https://www.verpix.me'+req.url
                        });
            res.end();
        }
        else
        {
            if(req.url.match(/\/api\/(.*)/g)) 
            {
                proxy.web(req, res, 
                          { target: config.apiProxy }, 
                          function(e){console.log(e)});
            }
            else
            {
                proxy.web(req, res, { target: config.viewerProxy},
                         function(e){console.log(e)});
            }
        }
    }
}).listen(config.port);

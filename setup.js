require('shelljs/global');
var fs = require('fs');


if (!which('node')) {
    echo('Sorry, this script requires node');
    exit(1);
}

var pwd = exec('pwd').replace(/\n/g, "");

var laputa_conf_file = fs.readFile('./laputa-gateway.conf', 'utf8', 
                    function(err, data)
                    {
                         var result = data.replace(/(export APP_PATH).*(?:\r?\n|\r|$)/, 
                                                   'export APP_PATH=\"'+pwd+'/app.js\"\n');
                         fs.writeFile('./laputa-gateway.conf', result, 'utf8', 
                                     function (err) {
                                        if (err) return console.log(err);
                                        exec('sudo cp laputa-gateway.conf /etc/init/');
                                        exec('sudo start laputa-gateway');
                                      });
                    });



import * as express from 'express'
import fetch from 'node-fetch'

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// curl -u a706cc2fdb8e4ce89f00aed30a6fc2a0: https://storage.scrapinghub.com/items/142200/3/14

fetch('https://a706cc2fdb8e4ce89f00aed30a6fc2a0:@storage.scrapinghub.com/items/142200/3/14')
  .then(response => response.text())
  .then(body => console.log(body));

/*http.get(
  {
    hostname: 'storage.scrapinghub.com',
    port: 80,
    path: '/items/142200/3/14',
    method: 'GET',
    auth: 'a706cc2fdb8e4ce89f00aed30a6fc2a0:'
  },
  response => {
    console.log(response.statusCode);
  }
)*/
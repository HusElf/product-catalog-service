'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::product.product');
//const redis = require('redis');
//const { Client } = require('ssh2');


    // const redisConfig = {
    //   host: '127.0.0.1',
    //   port: 6379,
    //   db: 'db0',
    // };

    // const cacheKey = 'products';
    //
    // const ssh = new Client();

    // ssh.on('ready', () => {
    //   console.log('Client :: ready');
    //   ssh.forwardIn('127.0.0.1', 6379, (err) => {
    //     console.log(err);
    //     if (err) throw err;
    //     console.log('Listening for connections on server on port 6379!');
    //   });
    // }).on('tcp connection', (info, accept, reject) => {
    //   console.log('TCP :: INCOMING CONNECTION:');
    //   console.dir(info);
    //   accept().on('close', () => {
    //     console.log('TCP :: CLOSED');
    //   }).on('data', (data) => {
    //     console.log('TCP :: DATA: ' + data);
    //   }).end([
    //     'HTTP/1.1 404 Not Found',
    //     'Date: Thu, 15 Nov 2012 02:07:58 GMT',
    //     'Server: ForwardedConnection',
    //     'Content-Length: 0',
    //     'Connection: close',
    //     '',
    //     ''
    //   ].join('\r\n'));
    // });

    // ssh.on('ready', () => {
    //   console.log('Client :: ready');
    //   ssh.forwardOut(
    //     sshConfig.host,
    //     sshConfig.port,
    //     redisConfig.host,
    //     redisConfig.port, (err, stream) => {
    //
    //     console.log(err);
    //     if (err) throw err;
    //
    //       stream.on('close', () => {
    //         console.log('Stream :: close');
    //         ssh.end();
    //       }).on('data', (data) => {
    //         console.log('OUTPUT: ' + data);
    //       });
    //       stream.end('ls -l\nexit\n');
    //
    //     // stream.on('close', () => {
    //     //   console.log('TCP :: CLOSED');
    //     //   ssh.end();
    //     // }).on('data', () => {
    //     //   console.log('TCP :: DATA: ');
    //     //
    //     // }).end([
    //     //   'HEAD / HTTP/1.1',
    //     //   'User-Agent: curl/7.27.0',
    //     //   'Host: 127.0.0.1',
    //     //   'Accept: */*',
    //     //   'Connection: close',
    //     //   '',
    //     //   ''
    //     // ].join('\r\n'));
    //   });
    // })

    // ssh.connect({
    //   host: sshConfig.host,
    //   port: sshConfig.port,
    //   username: sshConfig.username,
    //   password: sshConfig.password
    // })


    // ssh.on('ready', () => {
    //   console.log('Client :: ready');
    //   ssh.shell((err, stream) => {
    //     if (err) throw err;
    //     stream.on('close', () => {
    //       console.log('Stream :: close');
    //       ssh.end();
    //     }).on('data', (data) => {
    //       console.log('OUTPUT: ' + data);
    //       // Check if the output indicates that the redis-cli command has been executed successfully
    //       if (data.includes('redis-cli')) {
    //         // Open a Redis connection using the redis-cli command
    //
    //         // Handle the response from the Redis server
    //         stream.on('data', (redisData) => {
    //           console.log('REDIS OUTPUT: ' + redisData);
    //           stream.end('ping\n');
    //
    //           // Perform any necessary operations with the Redis data
    //           // ...
    //
    //           // Close the stream when done
    //           stream.end();
    //         });
    //       }
    //     });
    //
    //     stream.end('redis-cli\n');
    //   });
    // });

    // ssh.connect({
    //   host: sshConfig.host,
    //   port: sshConfig.port,
    //   username: sshConfig.username,
    //   password: sshConfig.password
    // })
//module.exports = createCoreController('api::product.product', {
  // async find(ctx) {
  //   const sshConfig = {
  //     host: '185.202.239.21',
  //     port: 22,
  //     username: 'root',
  //     password: 'eBWAIIsVF2qTqS47q9I',
  //   };
  //   const redisConfig = {
  //     host: '127.0.0.1',
  //     port: 6379, // Redis port
  //     db: 'db0',
  //   };
  //   const ssh = new Client();
  //
  //   ssh.on('ready', () => {
  //     console.log('Client :: ready');
  //     ssh.forwardIn('127.0.0.1', 6379, (err) => {
  //       console.log(err);
  //       if (err) throw err;
  //       console.log('Listening for connections on server on port 6379!');
  //     });
  //   }).on('tcp connection', (info, accept, reject) => {
  //     console.log('TCP :: INCOMING CONNECTION:');
  //     console.dir(info);
  //     accept().on('close', () => {
  //       console.log('TCP :: CLOSED');
  //     }).on('data', (data) => {
  //       console.log('TCP :: DATA: ' + data);
  //     }).end([
  //       'HTTP/1.1 404 Not Found',
  //       'Date: Thu, 15 Nov 2012 02:07:58 GMT',
  //       'Server: ForwardedConnection',
  //       'Content-Length: 0',
  //       'Connection: close',
  //       '',
  //       ''
  //     ].join('\r\n'));
  //   });
    // const cacheKey = 'products';
    //
    // const ssh = new Client();
    //
    // ssh.on('ready', () => {
    //   ssh.forwardOut(
    //     sshConfig.host,
    //     sshConfig.port,
    //     redisConfig.host,
    //     redisConfig.port,
    //     (err, stream) => {
    //       if (err) throw err;
    //       console.log('err')
    //       const client = redis.createClient(redisConfig.port, redisConfig.host, {
    //       });
    //
    //       client.on('connect', async () => {
    //         console.log('Connected to Redis server via SSH tunnel');
    //
    //         client.get(cacheKey, async (err, data) => {
    //           if (err || !data) {
    //             const products = await strapi.query('product').find();
    //             client.setex(cacheKey, 3600, JSON.stringify(products));
    //             return products;
    //           } else {
    //             return JSON.parse(data);
    //           }
    //         });
    //       });
    //
    //       client.on('error', (err) => {
    //         console.error('Redis connection error:', err);
    //         client.quit();
    //       });
    //
    //       client.stream = stream;
    //     }
    //   );
    // });

import { Service }from 'node-windows';

// Create a new service object
var svc = new Service({
  name:'task-app',
  description: 'tasks-app',
  script: 'C:\\Users\\User\\Documents\\Marcello\\IT\\to-do-app\\server\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
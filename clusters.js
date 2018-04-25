import cluster, { worker } from 'cluster';
import os from 'os';

const CPUS = os.cpus();

if (cluster.isMaster) {
	// console.log(`Master ${process.id} is running`);
	CPUS.forEach(() => cluster.fork());
	cluster.on('listening', worker => {
		console.log('Cluster %d connected', worker.process.pid);
	});
	cluster.on('exit', worker => {
		console.log('Cluster %d is dead', worker.process.pid);
		cluster.fork(); //Ensure starts of a new cluster if an old one dies
	})
} else {
	require('./index.js');
}
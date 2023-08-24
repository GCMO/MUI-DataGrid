import { server } from './service/server';
import { bootstrapData } from './util/bootstrapData';

async function run() {
  await bootstrapData();
  await server();
}

run().catch(console.error);

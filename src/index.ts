import dotenv from 'dotenv';
import Debug from 'debug';
import prisma from './extensions/prisma_ext';
import server from './server';
import QueueExt from './extensions/queues_ext';
import constants from './constants/constants';
import myWorker from './worker';
dotenv.config();
const port = parseInt(process.env.PORT || '5000', 10);

const main = async () => {
  await prisma.$connect();
  // await QueueExt.AppQueue.add(constants.jobName.defaulterJob, {}, {
  //   repeat: { cron: '10 3 * * *', limit: 1 }, // s m h d m w
  //   jobId: constants.jobName.trainModel,
  //   attempts: 1,
  // });
  server.listen(port);
};

main()
  .then(() => console.log('App started on port: '+ port))
  .catch((error) => {
    console.log(error);
    console.log('Server crashed on startup with error ', error.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await QueueExt.AppQueue.close();
    await QueueExt.SearchFacesQueue.close();
    await myWorker.TrainModelWorker.close();
    await myWorker.SearchFacesWorker.close();
  });

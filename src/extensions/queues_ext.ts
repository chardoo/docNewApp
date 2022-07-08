import { Queue, QueueScheduler } from 'bullmq';
import IoRedis from 'ioredis';
import constants from '../constants/constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AppQueueScheduler = new QueueScheduler(constants.queueName.ModelQueue,
  {
    connection: new IoRedis(process.env.REDIS_URL,
      { enableReadyCheck: false, maxRetriesPerRequest: null }),
  });

const AppQueue = new Queue(
  constants.queueName.ModelQueue,
  {
    connection: new IoRedis(process.env.REDIS_URL,
      { enableReadyCheck: false, maxRetriesPerRequest: null }),
  },
);
const SearchFacesQueueScheduler = new QueueScheduler(constants.queueName.SeachFaceQueue,
  {
    connection: new IoRedis(process.env.REDIS_URL,
      { enableReadyCheck: false, maxRetriesPerRequest: null }),
  });

const SearchFacesQueue = new Queue(
  constants.queueName.SeachFaceQueue,
  {
    connection: new IoRedis(process.env.REDIS_URL,
      { enableReadyCheck: false, maxRetriesPerRequest: null }),
  },
);

export default { AppQueue, AppQueueScheduler, SearchFacesQueueScheduler,SearchFacesQueue };

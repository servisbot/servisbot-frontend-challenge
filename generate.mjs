import fs from 'fs'
import { faker } from '@faker-js/faker';
import moment from 'moment';

const botNames = [
  'Bot One',
  'Bot Two',
  'Bot Three'
];
const botIds = [
  '04140c19-0c46-43c6-8e78-f459cd3b3370',
  '22526dec-4e04-4815-a641-ee6c71cbc5a9',
  '44700aa2-cba6-43d2-9ad4-8d8a499bd356'
];

const workerNames = [
  'Worker One',
  'Worker Two',
  'Worker Three',
  'Worker Four',
  'Worker Five',
  'Worker Six',
  'Worker Seven',
  'Worker Eight',
  'Worker Nine',
  'Worker Ten',
  'Worker Eleven',
  'Worker Twelve'
];
const workerIds = [
  '6f4fdfd9-da33-4711-9386-579e8101dc43',
  '98f2b3cd-53dc-42b3-b327-935113e2b105',
  '9844fd23-415b-4d2f-9fa1-78571036cd96',
  '318c5907-40b4-4353-9f2d-93c1355a1b83',
  'bf991cbe-e671-4ae6-9538-353d754f0eff',
  'f1c02ccd-270a-4db1-85d9-97dbdea535fa',
  '0fb5c514-eeaf-4cc2-b23a-20cdc04cbe17',
  'bc5cc0b1-26ea-49a0-b49b-20757a93a227',
  '374bef68-e278-4b1e-810b-83eccbdf3eaf',
  'e5d7874c-fd2d-41b8-abc1-2e311964ae8c',
  'dea6c463-95e9-4c11-9207-89cfc6c101e8',
  'c41a527e-0b14-4f56-bc0d-b1c77833d50a'
];

const createBot = () => ({
  id: faker.string.uuid(),
  created: faker.number.int({ min: moment().startOf('day').unix() * 1000, max: moment().endOf('day').unix() * 1000 }),
});

const createWorker = () => ({
  id: faker.string.uuid(),
  created: faker.number.int({ min: moment().startOf('day').unix() * 1000, max: moment().endOf('day').unix() * 1000 }),
});

const createLogs = () => ({
  id: faker.string.uuid(),
  created: faker.date.between({ from: moment(moment().startOf('day').unix() * 1000, "X").format(), to: moment(moment().endOf('day').unix() * 1000, "X").format() }),
  message: faker.string.alpha({ length: { min: 12, max: 400 } }),
  bot: faker.helpers.arrayElement(botIds),
  worker: faker.helpers.arrayElement(workerIds)
});

const writeBots = () => {  
  const bots = faker.helpers.multiple(createBot, { count: 3 });
  const jsonString = JSON.stringify(bots, null, 2);
  fs.writeFile('bots.json', jsonString, () => console.log('Bots Written'));
}

const writeWorkers = () => {
  const workers = faker.helpers.multiple(createWorker, { count: 12 });
  const jsonString = JSON.stringify(workers, null, 2);
  fs.writeFile('workers.json', jsonString, () => console.log('Workers Written'));
}

const writeLogs = () => {
  const logs = faker.helpers.multiple(createLogs, { count: 2000 });
  const jsonString = JSON.stringify(logs, null, 2);
  fs.writeFile('logs.json', jsonString, () => console.log('Logs Written'));
}
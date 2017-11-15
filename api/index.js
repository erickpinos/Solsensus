const CoinHive = require('coin-hive');
(async () => {
  const miner = await CoinHive('49ndCJKt7q1iFAwYx8S9uVCCEmZBjC1WdTVL66bfY3D7BFvzWHKEJ3218G8bAD4XrtJpnVEMqoxPmgFP4q78ComZ6uSxcaa', {
    pool: {
      host: 'la01.supportxmr.com',
      port: 3333,
      pass: 'x' // default 'x' if not provided 
    }
  });
  await miner.start();
  miner.on('found', () => console.log('Found!'))
  miner.on('accepted', () => console.log('Accepted!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));
})();

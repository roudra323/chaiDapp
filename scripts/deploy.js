const hre = require("hardhat");

async function getBalances(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

async function consoleBalances(addressess) {
  let counter = 0;
  for (const address of addressess) {
    console.log(
      `Address ${counter}: ${address} - ${await getBalances(address)}`
    );
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const message = memo.message;
    const name = memo.name;
    const from = memo.from;
    const sentEth = hre.ethers.utils.formatEther(memo.value);
    console.log(
      `At Timestamp: ${timestamp} - Message: ${message} - Name: ${name} - From: ${from} - Amount: ${sentEth}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("Chai");
  const chaiContract = await chai.deploy();
  await chaiContract.deployed();
  console.log("Chai deployed to:", chaiContract.address);

  const addressess = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];

  console.log("Balances before sending memos");
  await consoleBalances(addressess);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await chaiContract.connect(from1).buyChai("from1", "Very nice chai", amount);
  await chaiContract
    .connect(from2)
    .buyChai("from2", "Very nice course", amount);
  await chaiContract
    .connect(from3)
    .buyChai("from3", "Very nice information", amount);

  console.log("After buying chai");
  await consoleBalances(addressess);

  const memos = await chaiContract.getMemos();
  consoleMemos(memos);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

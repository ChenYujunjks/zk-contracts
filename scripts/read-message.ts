import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  // 替换成 deploy.ts 输出的 MyContract 地址
  const myContractAddress = "PASTE_MYCONTRACT_ADDRESS_HERE";

  const myContract = await ethers.getContractAt(
    "MyContract",
    myContractAddress,
  );

  // 本地 hardhat node 的第二个账户
  const receiver = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  const [contents, timestamps] =
    await myContract.receiveMessagesContent(receiver);

  console.log("receiver:", receiver);
  console.log("message count:", contents.length);

  for (let i = 0; i < contents.length; i++) {
    console.log("---------------");
    console.log(`message ${i + 1}`);
    console.log("content:", contents[i]);
    console.log("timestamp:", timestamps[i].toString());
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

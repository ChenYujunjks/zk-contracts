import { network } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const { ethers } = await network.getOrCreate();

  const deploymentPath = path.join(
    process.cwd(),
    "deployments",
    "localhost.json",
  );

  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  const myContractAddress = deployment.myContract;

  const [, receiver] = await ethers.getSigners();
  const receiverAddress = await receiver.getAddress();

  const myContract = await ethers.getContractAt(
    "MyContract",
    myContractAddress,
  );

  const [contents, timestamps] =
    await myContract.receiveMessagesContent(receiverAddress);

  console.log("contract:", myContractAddress);
  console.log("receiver:", receiverAddress);
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

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

  const myContract = await ethers.getContractAt(
    "MyContract",
    myContractAddress,
  );

  const receiver = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  const [contents, timestamps] =
    await myContract.receiveMessagesContent(receiver);

  console.log("contract:", myContractAddress);
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

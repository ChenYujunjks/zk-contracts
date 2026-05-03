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

  const owner = await myContract.owner();
  const merkleRoot = await myContract.merkleRoot();
  const verifier = await myContract.verifier();

  console.log("MyContract:", myContractAddress);
  console.log("owner:", owner);
  console.log("merkleRoot:", merkleRoot.toString());
  console.log("verifier:", verifier);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  // 替换成 deploy.ts 输出的 MyContract 地址
  const myContractAddress = "PASTE_MYCONTRACT_ADDRESS_HERE";

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

import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  // 替换成 deploy.ts 输出的 MyContract 地址
  const myContractAddress = "PASTE_MYCONTRACT_ADDRESS_HERE";

  const myContract = await ethers.getContractAt(
    "MyContract",
    myContractAddress,
  );

  // 替换成新的 Merkle root
  const newMerkleRoot = BigInt(
    "20114032203026812992970109384137920290697703658836938679631117804875272340113",
  );

  const oldRoot = await myContract.merkleRoot();

  console.log("old root:", oldRoot.toString());
  console.log("new root:", newMerkleRoot.toString());

  const tx = await myContract.updateMerkleRoot(newMerkleRoot);
  console.log("tx hash:", tx.hash);

  const receipt = await tx.wait();
  console.log("confirmed in block:", receipt?.blockNumber);

  const currentRoot = await myContract.merkleRoot();
  console.log("current root:", currentRoot.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

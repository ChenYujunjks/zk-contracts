import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  const myContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const myContract = await ethers.getContractAt(
    "MyContract",
    myContractAddress,
  );

  const owner = await myContract.owner();
  const merkleRoot = await myContract.merkleRoot();
  const verifier = await myContract.verifier();

  console.log("owner:", owner);
  console.log("merkleRoot:", merkleRoot.toString());
  console.log("verifier:", verifier);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

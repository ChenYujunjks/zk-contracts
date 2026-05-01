import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  const myContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

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

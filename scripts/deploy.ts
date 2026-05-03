import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  const Verifier = await ethers.getContractFactory("Groth16Verifier");
  const verifier = await Verifier.deploy();
  await verifier.waitForDeployment();

  const verifierAddress = await verifier.getAddress();
  console.log("Groth16Verifier deployed to:", verifierAddress);

  // 必须替换成你 input.json 里的 root
  const initialMerkleRoot = BigInt(
    "20114032203026812992970109384137920290697703658836938679631117804875272340113",
  );

  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy(
    verifierAddress,
    initialMerkleRoot,
  );
  await myContract.waitForDeployment();

  const myContractAddress = await myContract.getAddress();

  console.log("MyContract deployed to:", myContractAddress);
  console.log("initialMerkleRoot:", initialMerkleRoot.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

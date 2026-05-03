import { network } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const { ethers } = await network.getOrCreate();

  const Verifier = await ethers.getContractFactory("Groth16Verifier");
  const verifier = await Verifier.deploy();
  await verifier.waitForDeployment();

  const verifierAddress = await verifier.getAddress();
  console.log("Groth16Verifier deployed to:", verifierAddress);

  const initialMerkleRoot = BigInt(
    "14737772644499278991679208581299162238634650254224536719371112806579116642370",
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

  const deploymentsDir = path.join(process.cwd(), "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  fs.writeFileSync(
    path.join(deploymentsDir, "localhost.json"),
    JSON.stringify(
      {
        network: "localhost",
        groth16Verifier: verifierAddress,
        myContract: myContractAddress,
        initialMerkleRoot: initialMerkleRoot.toString(),
      },
      null,
      2,
    ),
  );

  console.log("Saved deployment addresses to deployments/localhost.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

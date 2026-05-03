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

  const [sender, receiver] = await ethers.getSigners();

  const myContract = await ethers.getContractAt(
    "MyContract",
    myContractAddress,
    sender,
  );

  const to = await receiver.getAddress();

  // 必须和生成 proof 时绑定的 content 完全一致
  const content = "hello from chicago";

  const pA: [string, string] = [
    "12986384957402791222534502726088834997878282543239705190716956436958058392169",
    "1782762740684970345865123298642477337624074368406617805779219242614322381612",
  ];

  const pB: [[string, string], [string, string]] = [
    [
      "20035031087283678829342389427758443599960632155203863594038922942897923634957",
      "2928372071554438152509792257499190772595423431807217213710535298787448835079",
    ],
    [
      "17728789512270192777995700354442507142985480211212476514431229831411418577244",
      "9871364341206790752598516258861719371829990986510393812995161658338785732865",
    ],
  ];

  const pC: [string, string] = [
    "3651840806315302233853103008972496313796239756063832885635815061494143327360",
    "2937111596903046127805786938094608560186562881038570880530426735143438867648",
  ];

  const nullifierHash =
    "19644245879130516689976096579795637345100827725973490672273424472125551569761";

  console.log("Sending anonymous whitelist message...");
  console.log("contract:", myContractAddress);
  console.log("from:", await sender.getAddress());
  console.log("to:", to);
  console.log("content:", content);
  console.log("nullifierHash:", nullifierHash);

  const messageHash = await myContract.computeMessageHash(content);
  console.log("on-chain computed messageHash:", messageHash.toString());

  const tx = await myContract.sendMessageWithProof(
    to,
    content,
    pA,
    pB,
    pC,
    nullifierHash,
  );

  console.log("tx hash:", tx.hash);

  const receipt = await tx.wait();

  console.log("confirmed in block:", receipt?.blockNumber);
  console.log("status:", receipt?.status);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

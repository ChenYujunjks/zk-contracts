import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  const myContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  const myContract = await ethers.getContractAt(
    "MyContract",
    myContractAddress,
  );

  const to = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const content = "hello from chicago";

  const pA: [string, string] = [
    "20965586098112829222813556016915087669954542751189854935782333862984480858735",
    "18368298985014105313316995069356994593258734829228957831262821238493317685976",
  ];

  const pB: [[string, string], [string, string]] = [
    [
      "16049434530403789619423892044526000299632576986278687744307622158928690815657",
      "8743257093532365470531791157593929903223492150704204584369206366594139763222",
    ],
    [
      "14077960722110484596331914592496219764198024781762895287616221774505208734995",
      "9405577086340361005005954366547866874657501059381643513552587264836412412006",
    ],
  ];

  const pC: [string, string] = [
    "21173078143984286623367580474842414893823272226284227647146281581041479621808",
    "21797116690911420189159398884716680028985026228083968692773196953338076689984",
  ];

  const nullifierHash =
    "1107508453626026628353350456432000344348342707812347227977620133814349151904";

  console.log("Sending message...");
  console.log("contract:", myContractAddress);
  console.log("to:", to);
  console.log("content:", content);
  console.log("nullifierHash:", nullifierHash);

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

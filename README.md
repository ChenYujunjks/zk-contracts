# 🧠 ZK Message App (Hardhat + Circom + Groth16)

A decentralized messaging system that leverages Zero-Knowledge Proofs to enable **anonymous but permissioned communication**.

---

## 🚀 What This Project Is

This project is **not just a messaging dApp**.

It demonstrates a more advanced paradigm:

> ❌ Not "who sent the message"
> ✅ But "whether the sender is allowed to send it"

This system uses:

- **Hardhat** → smart contract development & local testing
- **Circom** → circuit definition
- **snarkjs** → proof generation
- **Merkle Tree** → membership verification
- **Groth16** → on-chain verification

---

## 🔥 Core Idea

Instead of:

```txt
0x123 sends a message
```

We have:

```txt
Someone sends a message, and proves:

✔ They belong to an authorized group
✔ The message is valid
✔ They haven’t sent before
❌ But we don’t know who they are
```

---

## 🧩 ZK Design Philosophy

### 1️⃣ Identity → Proof

Traditional systems:

```txt
address → identity → permission
```

This system:

```txt
proof → permission
```

👉 The contract verifies **validity**, not identity.

---

### 2️⃣ Anonymous but Permissioned

Anyone **cannot** send messages.

Users must:

- Be part of a **Merkle Tree whitelist**
- Generate a valid zk proof

👉 This creates:

> **Anonymous but controlled communication system**

Use cases:

- DAO anonymous voting
- Private communities
- Whistleblowing systems

---

### 3️⃣ One-time Identity (Nullifier)

Each user:

```txt
leaf → nullifier → nullifierHash
```

The contract enforces:

```solidity
require(!usedNullifierHashes[nullifierHash]);
```

👉 Meaning:

- Anonymous
- But cannot spam
- Cannot reuse identity

---

### 4️⃣ Message Binding (Critical)

Proof is tied to:

```txt
messageHash = hash(content)
```

👉 This guarantees:

- You cannot reuse proof with different content
- Proof = authorization for **this exact message**

---

## 🏗 Architecture

```txt
User Input
   ↓
Compute messageHash
   ↓
Generate zk proof (Circom + snarkjs)
   ↓
Send to Smart Contract
   ↓
Contract verifies:
   - Merkle root
   - messageHash
   - nullifierHash uniqueness
   ↓
Store message
```

---

## 📁 Project Structure

```txt
contracts/
  Groth16Verifier.sol
  MyContract.sol

scripts/
  deploy.ts
  send.ts

circuits/
  merkle_message.circom

test/
  (optional)
```

---

## ⚙️ Local Setup

### 1. Install dependencies

```bash
pnpm install
```

---

### 2. Compile contracts

```bash
pnpm hardhat compile
```

---

### 3. Start local blockchain

```bash
pnpm hardhat node
```

---

### 4. Deploy contracts

```bash
pnpm hardhat run scripts/deploy.ts --network localhost
```

You will get:

```txt
Groth16Verifier deployed to: 0x...
MyContract deployed to: 0x...
```

---

### 5. Update contract address

In your `send.ts`:

```ts
const myContractAddress = "PASTE_DEPLOYED_ADDRESS_HERE";
```

---

### 6. Send a message

```bash
pnpm hardhat run scripts/send.ts --network localhost
```

---

## 🧪 ZK Proof Flow

Proof generation includes:

- Merkle path
- leaf
- nullifier
- messageHash

Outputs:

```ts
pA;
pB;
pC;
publicSignals;
```

Contract verifies:

```solidity
verifier.verifyProof(...)
```

---

## ⚠️ Important Notes

### 1. Hardhat Node Reset

Every time you restart:

```txt
pnpm hardhat node
```

👉 All contracts are wiped
👉 You must redeploy

---

### 2. Proof Must Match Contract Inputs

If transaction fails, likely causes:

- ❌ Wrong merkleRoot
- ❌ messageHash mismatch
- ❌ nullifier reuse
- ❌ incorrect publicSignals order

---

### 3. This Is Not Just Messaging

Without ZK:

```txt
on-chain chat app
```

With ZK:

```txt
privacy-preserving permission system
```

👉 That’s the real upgrade.

---

## 🧠 What This Project Demonstrates

This project showcases:

- zk-SNARK integration with Solidity
- Anonymous identity systems
- Merkle-based membership verification
- Anti-spam cryptographic design (nullifier)
- Message integrity via proof binding

---

## 🚀 Future Improvements

- Dynamic Merkle Tree updates
- Frontend integration (Next.js)
- Multi-message support per user (rate-limited nullifiers)
- Off-chain storage + on-chain verification
- zk-based access control systems

---

## 🧠 Final Insight

> ZK is not about hiding data.
> It’s about proving **validity without revealing truth**.

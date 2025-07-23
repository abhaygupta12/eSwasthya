# eSwasthya: Decentralized Electronic Health Records (EHR) DApp

![eSwasthya Interface](https://github.com/abhaygupta12/eSwasthya/assets/71281005/7e986239-87cc-4b67-b7ae-d4d7d9c906bb)

## Overview

**eSwasthya** is a decentralized application (DApp) developed as a final year college project to revolutionize health record management by leveraging Blockchain (Ethereum) and the Interplanetary File System (IPFS).

### Key Objectives

- **Secure, Tamper-Proof EHR Storage:** Encrypt and store patient health records in a decentralized, distributed network eliminating single points of failure.
- **Transparent & Auditable:** Use of public key cryptography and blockchain ensures auditability and prevents unauthorized data access.
- **Scalability & Flexibility:** Designed to allow seamless system expansion and integration of new user roles and modules.

---

## Features

- **Decentralized EHR Storage:** Store, manage, and share health records securely using Ethereum and IPFS.
- **Access Control:** Fine-grained, cryptographically secure access control for multiple healthcare stakeholder types.
- **Audit Log:** Every access and modification is logged on-chain to enable trust and compliance.
- **Role-Based Interface:** Supports current roles like Patient and Doctor; future extensions for Nominee, Lab Technician, Academic Researchers planned.
- **Appointment Scheduling** (Planned): Upcoming module for patients to book healthcare appointments.
- **Cloud Compatibility Assessment:** Ongoing evaluation for integrating or migrating components to cloud-based infrastructure for additional scaling and efficiency.

---

## Development Environment

| Technology     | Purpose                                                  |
|----------------|----------------------------------------------------------|
| **Angular**    | User interface/front-end web application                |
| **Metamask**   | Ethereum wallet & web3 login for blockchain interaction |
| **Node.js**    | Backend, server-side scripts & API logic                |
| **Solidity**   | Smart contracts for secure on-chain transactions        |
| **Ganache**    | Local blockchain for testing and development            |
| **IPFS**       | Distributed, decentralized storage of EHR files         |

---

## Architecture

1. **User Access:** Patients and health professionals log in using Metamask (public key authentication).
2. **Smart Contract Interaction:** User actions trigger Solidity smart contracts on the Ethereum blockchain (via web3.js).
3. **EHR Storage:** Health records are encrypted and pushed to IPFS for storage; associated hashes are securely referenced on the blockchain.
4. **Record Retrieval:** Only authorized users with valid credentials can retrieve and decrypt records as permitted via grant logic in smart contracts.
5. **Auditability:** Every access, grant, or update event is immutably recorded on chain.

---

## Getting Started

### Requirements

- Node.js (latest LTS version)
- Angular CLI
- Metamask Browser Extension
- Ganache (for local blockchain dev)
- IPFS installation or access to Infura IPFS gateway

### Setup Instructions

1. **Clone repo**

2. **Backend & Smart Contracts**
- Install Node dependencies:
  ```
  npm install
  ```
- Start Ganache and deploy contracts (see `/contracts` and deployment scripts).

3. **Frontend**
- Install Angular dependencies:
  ```
  cd client
  npm install
  ```
- Run Angular app:
  ```
  ng serve
  ```

4. **Metamask & IPFS**
- Import test accounts from Ganache into Metamask.
- For IPFS, either run a local daemon or set Infura IPFS as the gateway in the code.

---

## Future Roadmap

- **Additional User Roles:** Nominee, Lab Technician, Researcher.
- **Appointment Module:** Integrated appointment scheduling from the DApp.
- **Cloud Integration:** Evaluation of hybrid cloud-blockchain architectures for performance, compliance, and resilience improvements.

---

## Contributions

Open to feedback, suggestions, and collaborations for enhancing eSwasthya’s reach and robustness!

---

## License

This repository is for academic and educational use. For production deployments or research collaborations, please contact the author.

---

> For demo, documentation, and technical details, please see the [eSwasthya GitHub repository](https://github.com/abhaygupta12/eSwasthya).

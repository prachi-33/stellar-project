
# 🌌 PropChain: A Decentralized Real Estate NFT Marketplace

> **A full-stack dApp combining Soroban smart contracts, escrow, and a modern backend for trustless property transactions.**


## 📖 Table of Contents

- [🎯 Problem Statement](#-problem-statement)
- [💡 Our Solution](#-our-solution)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [🚀 Getting Started](#-getting-started)
- [📁 Folder Structure](#-folder-structure)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🎯 Problem Statement

Centralized real estate platforms are prone to fraud, lack transparency, and introduce single points of failure. Digital payments between buyers and sellers are often insecure, requiring costly intermediaries. Verifying property ownership and maintaining a transparent transaction history are significant challenges in the traditional market.

## 💡 Our Solution

**PropChain** leverages the power of the Stellar Soroban blockchain, a robust backend, and a secure smart contract escrow system to create a **trustless, transparent, and efficient property marketplace.**

-   **Immutable Ownership:** Properties are minted as NFTs on the Soroban network, creating an undeniable and publicly verifiable record of ownership.
-   **Fraud-Proof Transactions:** Buyers deposit funds into a smart contract escrow, which only releases payment to the seller upon the confirmed transfer of the property NFT.
-   **Reliable Audit Trail:** Our backend, built with Express.js, Prisma, and PostgreSQL, maintains a detailed history of users, property listings, and escrow statuses for full auditability.
-   **User-Controlled Security:** With Freighter wallet integration, users always remain in full control of their assets and private keys.

---

## ✨ Key Features

### Blockchain & Smart Contracts
-   **Wallet Integration:** Seamlessly connect with the Freighter wallet to interact with the Soroban testnet.
-   **Property NFT Minting:** Create unique NFTs for each property with rich metadata (location, price, images, amenities, etc.).
-   **Smart Contract Escrow:** An on-chain escrow contract holds buyer funds securely, guaranteeing a fair exchange.
-   **Transaction Simulation:** All blockchain interactions are pre-simulated to prevent failed transactions and wasted fees.

### Backend Powerhouse (Express.js, Prisma, PostgreSQL)
-   **User Authentication:** Secure user registration and login using JWTs.
-   **Property Management:** Full CRUD APIs for managing property listings and their metadata.
-   **Escrow Tracking:** The backend monitors and records the status of each escrow transaction (e.g., `funded`, `released`, `cancelled`).
-   **Transaction History:** A persistent record of all minting and sale activities is stored in a PostgreSQL database.

### Frontend Experience (React.js)
-   **Real-time Escrow Status:** The UI clearly displays the current state of each property's escrow account.
-   **User Notifications:** Get instant feedback on transaction success or failure using `react-hot-toast`.
-   **Interactive Property Listings:** Browse, view details, and interact with properties listed on the marketplace.

---

## 🛠️ Tech Stack

| Category   | Technologies                                                                                                                                                                                                                                                                                                                                                                                                         |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend** | [![React][React.js]][React-url] [![Tailwind][Tailwind-CSS]][Tailwind-url]                                                                                                                                                                                                                                                                                                                                              |
| **Backend** | [![Node.js][Node.js]][Node-url] [![Express.js][Express.js]][Express-url] [![PostgreSQL][PostgreSQL]][PostgreSQL-url] [![Prisma][Prisma]][Prisma-url]                                                                                                                                                                                                                                                                    |
| **Blockchain** | [![Stellar][Stellar]][Stellar-url] [![Rust][Rust]][Rust-url]                                                                                                                                                                                                                                                                                                                                                          |

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Stellar]: https://img.shields.io/badge/Stellar_Soroban-000000?style=for-the-badge&logo=stellar&logoColor=white
[Stellar-url]: https://soroban.stellar.org/
[Rust]: https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white
[Rust-url]: https://www.rust-lang.org/

---

## 🏗️ System Architecture

The application is designed with a clear separation of concerns between the frontend, backend, and the blockchain.

#### Architecture Diagram
(https://drive.google.com/file/d/1OahdKu4gKDGhivi3tfh99RF2EoQW-0DO/view?usp=sharing)

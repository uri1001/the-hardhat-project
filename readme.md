<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/uri1001/tgp-hardhat">
    <img src="assets/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Hardhat Environment Template</h3>

  <p align="center">
    Hardhat Environment Template with a Professional Basic Setup
    <br />
    <a href="https://github.com/uri1001/tgp-hardhat"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/uri1001/tgp-hardhat/issues">Report Bug</a>
    ·
    <a href="https://github.com/uri1001/tgp-hardhat/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#about-the-project">About The Project</a>
        <ul>
            <li><a href="#features">Features</a></li>
        </ul>
    </li>
    <li>
        <a href="#project-initialization">Project Initialization</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
        </ul>
    </li>
    <li>
        <a href="#documentation">Documentation</a>      
        <ul>
            <li><a href="#hardhat-tasks">Hardhat Tasks</a></li>
            <li><a href="#compilation-deployment-&-verification">Compilation, Deployment & Verification</a></li>
            <li><a href="#linting-&-formatting">Linting & Formatting</a></li>
        </ul>
    </li>
    <li>
        <a href="#resources">Resources</a>
        <ul>
            <li><a href="#solidity-documentation">Hardhat Tasks</a></li>
            <li><a href="#typescript-documentation">TypeScript Documentation</a></li>
            <li><a href="#ethers-documentation">Ethers Documentation</a></li>
            <li><a href="#hardhat-documentation">Hardhat Documentation</a></li>
            <li><a href="#lint-tool">Lint Tool</a></li>
            <li><a href="#format-tool">Format Tool</a></li>
        </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## 1. About The Project

Hardhat Environment Template with a Professional Basic & Customized Setup

The goal is to create a Hardhat basic enviroment setup that reduces the amount of time needed to create
a new Solidity project. Achieved by implementing complex processes with tasks & scripts.
Includes formatting, linting and source control tools with their respective rules.
<br />

### 1.1. Features

-   [ ] Custom Scripts
    -   [ ] Deploy - Contract Deployment Generic Script
-   [ ] Custom Tasks
    -   [ ] Accounts
    -   [ ] Extend Accounts
    -   [ ] Info
    -   [ ] Network
-   [ ] Wide Network Support
    -   [ ] Ethereum - mainnet & goerli
    -   [ ] Polygon - polygon & polygonMumbai
    -   [ ] Arbitrum - arbitrumOne & arbitrumGoerli
    -   [ ] BSC - bsc & bscTestnet
    -   [ ] Cronos - cronos & cronosTestnet
-   [ ] Solidity Linting with Solhint
-   [ ] Code Formatting with Prettier
-   [ ] Code Formatting Enforcement with Husky

See the [open issues](https://github.com/uri1001/tgp-hardhat/issues) for a full list of proposed features (and known issues).

<!-- PROJECT INITIALIZATION -->

## 2. Project Initialization

### 2.1. Prerequisites

Package manager installation (npm)

-   npm
    ```sh
    npm install npm@latest -g
    ```
    <br />

### 2.2. Installation

1. Clone the repo
    ```sh
    git clone https://github.com/uri1001/tgp-hardhat.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Rename `.env.sample` file to `.env`
    ```sh
    mv ./.env.sample ./.env
    ```
4. Introduce to `.env` the wallet & API keys

    ```js
    masterPrivateKey = 'wallet-private-key'
    backupPrivateKey = 'wallet-private-key'

    infuraAPIKey = 'API-key'
    alchemyAPIKey = 'API-key'

    .
    .
    .
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DOCUMENTATION -->

## 3. Documentation

### 3.1. Hardhat Tasks

Get Information
`sh
    npx hardhat
    `

Usage: hardhat [GLOBAL OPTIONS] <TASK> [TASK OPTIONS]

    GLOBAL OPTIONS:

    --config              A Hardhat config file.
    --emoji               Use emoji in messages.
    --help                Shows this message, or a task's help if its name is provided
    --max-memory          The maximum amount of memory that Hardhat can use.
    --network             The network to connect to.
    --show-stack-traces   Show stack traces.
    --tsconfig            A TypeScript config file.
    --verbose             Enables Hardhat verbose logging
    --version             Shows hardhat's version.

    AVAILABLE TASKS:

    check         Check whatever you need
    clean         Clears the cache and deletes all artifacts
    compile       Compiles the entire project, building all artifacts
    console       Opens a hardhat console
    flatten       Flattens and prints contracts and their dependencies
    help          Prints this message
    node          Starts a JSON-RPC server on top of Hardhat Network
    run           Runs a user-defined script after compiling the project
    test          Runs mocha tests

To get help for a specific task run: npx hardhat help <task>
<br />

### 3.2. Compilation, Deployment & Verification

Compile Contracts
`sh
    npx hardhat compile
    `

Deploy Contracts
`sh
    npx hardhat run --network <network> scripts/<deploy_script>.ts
    `

Verify Contracts
`sh
    npx hardhat verify --network <network> <contract-address> <constructor-arguments>
    `
<br />

### 3.3. Linting & Formatting

Lint All Contracts
`sh
    npm run solhint
    `

Format All Code
`sh
    npm run prettier:solidity
    `

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- RESOURCES -->

## 4. Resources

#### 4.1. Solidity Documentation

Solidity Official Documentation: [Documentation](https://docs.soliditylang.org/en/v0.8.19/)

Solidity Official Security Considerations: [Security](https://docs.soliditylang.org/en/v0.8.19/security-considerations.html)

Solidity Official NatSpec: [NatSpec](https://docs.soliditylang.org/en/v0.8.19/natspec-format.html)

Solidity Official Style Guide: [Style](https://docs.soliditylang.org/en/v0.8.19/style-guide.html)
<br />

#### 4.2. TypeScript Documentation

TypeScript Official Documentation: [Documentation](https://www.typescriptlang.org/docs/)
<br />

#### 4.3. Ethers Documentation

Ethers Official Documentation: [Documentation](https://docs.ethers.org/v5/)
<br />

#### 4.4. Hardhat Documentation

Hardhat Official Documentation: [Documentation](https://hardhat.org/docs)
<br />

#### 4.5. Lint Tool

Hardhat Official Documentation: [Documentation](https://protofire.github.io/solhint/)

Solhint Supported Rules: [Rules](https://github.com/protofire/solhint/blob/master/docs/rules.md)
<br />

#### 4.6. Format Tool

Prettier Official Documentation: [Documentation](https://prettier.io/docs/en/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 5. License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/uri1001/tgp-hardhat.svg?style=for-the-badge
[contributors-url]: https://github.com/uri1001/tgp-hardhat/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/uri1001/tgp-hardhat.svg?style=for-the-badge
[forks-url]: https://github.com/uri1001/tgp-hardhat/network/members
[issues-shield]: https://img.shields.io/github/issues/uri1001/tgp-hardhat.svg?style=for-the-badge
[issues-url]: https://github.com/uri1001/tgp-hardhat/issues
[license-shield]: https://img.shields.io/github/license/uri1001/tgp-hardhat.svg?style=for-the-badge
[license-url]: https://github.com/uri1001/tgp-hardhat/blob/master/LICENSE.txt

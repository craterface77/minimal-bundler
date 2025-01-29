# minimal-bundler

This project is a minimal bundler node capable of accepting ERC-4337 UserOperations, executing them on the Ethereum Sepolia testnet, and returning the transaction hash in response. The bundler node is stateless and does not require any database or persistent storage.

## Features

- Accepts ERC-4337 UserOperations via a JSON-RPC API.
- Executes UserOperations on the Ethereum Sepolia testnet.
- Returns the transaction hash in response.
- Uses two different EOAs for sending transactions to avoid stuck or failed transactions.
- Follows JSON-RPC 2.0 specifications.

## Prerequisites

- Node.js
- Bun (JavaScript runtime)
- Ethereum Sepolia testnet account with native tokens

## Installation

1. Clone the repository:

```bash
git clone https://github.com/craterface77/minimal-bundler.git
cd minimal-bundler
```

2. Install dependencies:

```bash
bun install
```

3. Create a

.env

file based on the

.env.example

file and fill in the required environment variables:

```example
PRIVATE_KEY_1=YOUR_PRIVATE_KEY_1
PRIVATE_KEY_2=YOUR_PRIVATE_KEY_2
RPC_URL=YOUR_RPC_URL
```

## Running the Project

To run the project, use the following command:

```bash
bun run index.ts
```

The server will start and listen on

http://localhost:3000

## API

### Execute UserOperation API

- **Endpoint:** `POST /`
- **Method:** `eth_sendUserOperation`
- **Description:** Executes the incoming UserOperation on the Ethereum Sepolia testnet and returns the transaction hash.

#### Request Body

```json
{
  "jsonrpc": "2.0",
  "method": "eth_sendUserOperation",
  "params": [
    {
      "sender": "0x...",
      "nonce": "0x...",
      "initCode": "0x...",
      "callData": "0x...",
      "signature": "0x...",
      "paymasterAndData": "0x",
      "maxFeePerGas": "0x...",
      "maxPriorityFeePerGas": "0x...",
      "verificationGasLimit": "0x...",
      "callGasLimit": "0x...",
      "preVerificationGas": "0x..."
    },
    "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789"
  ],
  "id": 1
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "transactionHash": "0x..."
  }
}
```

## Error Handling

The API returns proper error responses to clients and handles unexpected errors and network-related errors that might occur while making blockchain RPC calls.

## Testing

### On-chain Test

To test the project, you can run the `nativeTransfer` script. Ensure that the settings in `config.json` are correctly configured. You can execute the test using the following command:

```bash
bun run transfer
```

This command will start the bundler and execute the nativeTransfer script to verify the functionality of the bundler. After executing the script, you can check the transaction hash on the Sepolia testnet.

#### Past Transactions:

- [TX](https://sepolia.etherscan.io/tx/0x1762c378594b06e0c7878a2d85cf06872a2b7c71f53169d072ab8f02692f7584)
- [TX](https://sepolia.etherscan.io/tx/0x88b6faf181847551f8e8eafec2ce319df53236d2d6476304e9bdebce3b9d976f)
- [TX](https://sepolia.etherscan.io/tx/0x9c1ea4795525bb571761f1b7816617fdb74f9541dbc5c1ddb0951376b6adc853)

## Resources

- [ERC-4337 RPC Specification](https://eips.ethereum.org/EIPS/eip-4337#rpc-methods-eth-namespace)
- [Biconomy SDK Examples](https://github.com/bcnmy/sdk-examples/tree/master)
- [Bundler Documentation](https://www.erc4337.io/docs/bundlers/introduction)
- [Reference Bundler Implementation](https://github.com/eth-infinitism/bundler)

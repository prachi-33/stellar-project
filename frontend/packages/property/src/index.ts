import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAQOMGBI6XWD53ZB6WJFIMR5GB7D2UY7FCFOJLPF2NBWSCU3D7RJDAJT",
  }
} as const

export type DataKey = {tag: "Owner", values: void} | {tag: "Property", values: readonly [u32]} | {tag: "TotalSupply", values: void} | {tag: "TokenOwner", values: readonly [u32]} | {tag: "OwnerTokens", values: readonly [string]} | {tag: "TokenExists", values: readonly [u32]};

export enum Errors {
  NotInitialized = 1,
  TokenNotFound = 2,
  NotOwner = 3,
  AlreadyExists = 4,
}


export interface Property {
  document: string;
  id: u32;
  location: string;
  owner: string;
  price: u32;
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initialize the contract with an owner
   */
  initialize: ({owner}: {owner: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a mint_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Mint a new property NFT
   */
  mint_property: ({to, location, price, document}: {to: string, location: string, price: u32, document: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get property details by token ID
   */
  get_property: ({token_id}: {token_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Property>>

  /**
   * Construct and simulate a owner_of transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get token owner
   */
  owner_of: ({token_id}: {token_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a tokens_of transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get all tokens owned by an address
   */
  tokens_of: ({owner}: {owner: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<u32>>>

  /**
   * Construct and simulate a total_supply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get total supply of tokens
   */
  total_supply: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a token_exists transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Check if token exists
   */
  token_exists: ({token_id}: {token_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Transfer token (simplified - you might want to add approval logic)
   */
  transfer: ({from, to, token_id}: {from: string, to: string, token_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABgAAAAAAAAAAAAAABU93bmVyAAAAAAAAAQAAAAAAAAAIUHJvcGVydHkAAAABAAAABAAAAAAAAAAAAAAAC1RvdGFsU3VwcGx5AAAAAAEAAAAAAAAAClRva2VuT3duZXIAAAAAAAEAAAAEAAAAAQAAAAAAAAALT3duZXJUb2tlbnMAAAAAAQAAABMAAAABAAAAAAAAAAtUb2tlbkV4aXN0cwAAAAABAAAABA==",
        "AAAAAwAAAAAAAAAAAAAABUVycm9yAAAAAAAABAAAAAAAAAAOTm90SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAADVRva2VuTm90Rm91bmQAAAAAAAACAAAAAAAAAAhOb3RPd25lcgAAAAMAAAAAAAAADUFscmVhZHlFeGlzdHMAAAAAAAAE",
        "AAAAAQAAAAAAAAAAAAAACFByb3BlcnR5AAAABQAAAAAAAAAIZG9jdW1lbnQAAAAQAAAAAAAAAAJpZAAAAAAABAAAAAAAAAAIbG9jYXRpb24AAAAQAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAABXByaWNlAAAAAAAABA==",
        "AAAAAAAAACVJbml0aWFsaXplIHRoZSBjb250cmFjdCB3aXRoIGFuIG93bmVyAAAAAAAACmluaXRpYWxpemUAAAAAAAEAAAAAAAAABW93bmVyAAAAAAAAEwAAAAA=",
        "AAAAAAAAABdNaW50IGEgbmV3IHByb3BlcnR5IE5GVAAAAAANbWludF9wcm9wZXJ0eQAAAAAAAAQAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAhsb2NhdGlvbgAAABAAAAAAAAAABXByaWNlAAAAAAAABAAAAAAAAAAIZG9jdW1lbnQAAAAQAAAAAQAAAAQ=",
        "AAAAAAAAACBHZXQgcHJvcGVydHkgZGV0YWlscyBieSB0b2tlbiBJRAAAAAxnZXRfcHJvcGVydHkAAAABAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAABAAAH0AAAAAhQcm9wZXJ0eQ==",
        "AAAAAAAAAA9HZXQgdG9rZW4gb3duZXIAAAAACG93bmVyX29mAAAAAQAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAQAAABM=",
        "AAAAAAAAACJHZXQgYWxsIHRva2VucyBvd25lZCBieSBhbiBhZGRyZXNzAAAAAAAJdG9rZW5zX29mAAAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAQAAA+oAAAAE",
        "AAAAAAAAABpHZXQgdG90YWwgc3VwcGx5IG9mIHRva2VucwAAAAAADHRvdGFsX3N1cHBseQAAAAAAAAABAAAABA==",
        "AAAAAAAAABVDaGVjayBpZiB0b2tlbiBleGlzdHMAAAAAAAAMdG9rZW5fZXhpc3RzAAAAAQAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAQAAAAE=",
        "AAAAAAAAAEJUcmFuc2ZlciB0b2tlbiAoc2ltcGxpZmllZCAtIHlvdSBtaWdodCB3YW50IHRvIGFkZCBhcHByb3ZhbCBsb2dpYykAAAAAAAh0cmFuc2ZlcgAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        mint_property: this.txFromJSON<u32>,
        get_property: this.txFromJSON<Property>,
        owner_of: this.txFromJSON<string>,
        tokens_of: this.txFromJSON<Array<u32>>,
        total_supply: this.txFromJSON<u32>,
        token_exists: this.txFromJSON<boolean>,
        transfer: this.txFromJSON<null>
  }
}
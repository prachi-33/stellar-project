use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Symbol, symbol_short};
use stellar_macros::default_impl;
use stellar_tokens::non_fungible::{burnable::NonFungibleBurnable, Base, NonFungibleToken};

const PROPERTY: Symbol = symbol_short!("PROPERTY");

#[contract]
pub struct PropertyNFT;

#[contracttype]
pub enum DataKey {
    Owner,
    Property(u32), // store property details by token_id
    TotalSupply,   // track number of minted NFTs
}

#[contracttype]
#[derive(Clone)]
pub struct Property {
    pub id: u32,
    pub owner: Address,
    pub location: String,
    pub price: u32,
    pub document: String,
}

#[contractimpl]
impl PropertyNFT {
    // Constructor to set contract owner and metadata
    pub fn __constructor(e: &Env, owner: Address) {
        e.storage().instance().set(&DataKey::Owner, &owner);
        
        Base::set_metadata(
            e,
            String::from_str(e, "www.mytoken.com"),
            String::from_str(e, "My Property"),
            String::from_str(e, "PROP"),
        );
    }

    // Simplified mint function
    pub fn mint_property(
        e: &Env,
        to: Address,
        location: String,
        price: u32,
        document: String,
    ) -> u32 {
        // Mint the NFT token
        let token_id = Base::sequential_mint(e, &to);

        // Create property struct
        let property = Property {
            id: token_id,
            owner: to.clone(),
            location,
            price,
            document,
        };

        // Store property details
        e.storage().instance().set(&DataKey::Property(token_id), &property);

        token_id
    }
        
    pub fn get_property(e: &Env, token_id: u32) -> Property {
        e.storage()
            .instance()
            .get(&DataKey::Property(token_id))
            .expect("Property not found")
    }
}

// Use default implementations for NFT and burnable behavior
#[default_impl]
#[contractimpl]
impl NonFungibleToken for PropertyNFT {
    type ContractType = Base;
}

#[default_impl]
#[contractimpl]
impl NonFungibleBurnable for PropertyNFT {}

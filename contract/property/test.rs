#[cfg(test)]
mod test {
    extern crate std;
    
    use soroban_sdk::{testutils::Address as _, Address, Env, String};
    use crate::contract::{PropertyNFT, PropertyNFTClient};

    fn create_client<'a>(e: &Env, owner: &Address) -> PropertyNFTClient<'a> {
        let address = e.register(PropertyNFT, (owner,));
        PropertyNFTClient::new(e, &address)
    }

    #[test]
    fn test_mint_property() {
        let e = Env::default();
        let owner = Address::generate(&e);
        let client = create_client(&e, &owner);

        e.mock_all_auths();

        // Mint a property
        let location = String::from_str(&e, "Mumbai");
        let document = String::from_str(&e, "Doc1");
        let token_id = client.mint_property(&owner, &location, &1000, &document);

        // Retrieve the property
        let prop = client.get_property(&token_id);

        // Compare properties
        assert_eq!(prop.owner, owner);
        assert_eq!(prop.location, String::from_str(&e, "Mumbai"));
        assert_eq!(prop.price, 1000);
        assert_eq!(prop.document, String::from_str(&e, "Doc1"));
    }

    #[test]
    fn test_multiple_properties() {
        let e = Env::default();
        let owner = Address::generate(&e);
        let client = create_client(&e, &owner);

        e.mock_all_auths();

        let location1 = String::from_str(&e, "Mumbai");
        let document1 = String::from_str(&e, "Doc1");
        let token_id1 = client.mint_property(&owner, &location1, &1000, &document1);

        let location2 = String::from_str(&e, "Bangalore");
        let document2 = String::from_str(&e, "DocB");
        let token_id2 = client.mint_property(&owner, &location2, &1500, &document2);

        let prop1 = client.get_property(&token_id1);
        let prop2 = client.get_property(&token_id2);

        assert_eq!(prop1.location, String::from_str(&e, "Mumbai"));
        assert_eq!(prop1.price, 1000);
        assert_eq!(prop1.document, String::from_str(&e, "Doc1"));

        assert_eq!(prop2.location, String::from_str(&e, "Bangalore"));
        assert_eq!(prop2.price, 1500);
        assert_eq!(prop2.document, String::from_str(&e, "DocB"));
    }
}
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import FeaturedProperties from "../components/featured";
import SecureEscrowTransactions from "../components/transaction";
export default function Home(){
    return (
         <div>
            <Navbar />
            <Hero />
            <FeaturedProperties/>
            <SecureEscrowTransactions/>
            

        </div>
    );
}
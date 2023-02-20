
import { User } from "./users.entity";
import { Category } from "./categories.entity";
import { Country } from "./countries.entity";
import { PaymentDetails } from "./payment_details.entity";
import { ProductPurchase } from "./products_purchase.entity";
import { Product } from "./products.entity";
import { Purchase } from "./purchases.entity";
import { Role } from "./roles.entity";
import { Vendor } from "./vendors.entity";


const entities = [User, Category, Country, PaymentDetails, ProductPurchase, Product, Purchase, Role, Vendor];

export {User, Category, Country, PaymentDetails, Product, ProductPurchase, Purchase, Role, Vendor};
export default entities;


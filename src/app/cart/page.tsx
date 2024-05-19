import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/db/format";

export const metadata = {
    title: "Ваш кошик"
};

export default async function CartPage() {
    const cart = await getCart();

    return(
        <div>
            <h1 className="mb-6 text-3xl font-bold">Кошик</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            ))}
            {!cart?.items.length && <p>Ваш кошик пустий.</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Сума: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Перевірити</button>
            </div>
        </div>
    );
    
}
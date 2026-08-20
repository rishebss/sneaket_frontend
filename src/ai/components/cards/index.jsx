import CartCard from "./CartCard";
import OrdersCard from "./OrdersCard";
import OrderDetailCard from "./OrderDetailCard";
import ProductsCard from "./ProductsCard";
import WalletCard from "./WalletCard";
import CartAddedCard from "./CartAddedCard";
import CheckoutResultCard from "./CheckoutResultCard";
import RazorpayCard from "./RazorpayCard";
import StockErrorCard from "./StockErrorCard";

// Maps a backend `ui.type` to its renderer. Each card receives
// { data, onClose } and renders full-width inside the chat drawer.
export const UI_COMPONENTS = {
  cart: CartCard,
  orders: OrdersCard,
  order_detail: OrderDetailCard,
  products: ProductsCard,
  wallet: WalletCard,
  cart_added: CartAddedCard,
  checkout_result: CheckoutResultCard,
  razorpay: RazorpayCard,
  stock_error: StockErrorCard,
};

export function renderUi(ui, onClose, onUpdateData) {
  if (!ui || !ui.type) return null;
  const Comp = UI_COMPONENTS[ui.type];
  if (!Comp) return null;
  return <Comp data={ui.data} onClose={onClose} onUpdateData={onUpdateData} />;
}

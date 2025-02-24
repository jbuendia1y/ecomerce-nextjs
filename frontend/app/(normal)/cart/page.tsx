import CartList from "./_components/CartList";
import CartSummary from "./_components/CartSummary";

export default function CartPage() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row gap-4 justify-center py-12 max-w-5xl mx-auto">
        <CartList />
        <CartSummary />
      </div>
    </main>
  );
}

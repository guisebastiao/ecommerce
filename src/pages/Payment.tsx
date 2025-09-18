import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Edit3 } from "lucide-react";
import { findAllAddresses } from "@/hooks/useAddress";
import type { OrderDTO } from "@/types/orderTypes";
import { confirmPayment } from "@/hooks/useOrder";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as OrderDTO;

  const stripe = useStripe();
  const elements = useElements();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);

  const { data: addresses, isLoading: addressesLoading } = findAllAddresses();
  const { mutate: confirmPaymentMutate, isPending: confirmPaymentPending, isSuccess } = confirmPayment();

  useEffect(() => {
    if (!addressesLoading && addresses && addresses.data.length <= 0) {
      navigate("/create-address?redirect=/payment", { state });
    }
  }, [addressesLoading, addresses]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/orders");
    }
  }, [isSuccess]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !selectedAddress) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setStripeLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address: {
          line1: selectedAddress,
        },
      },
    });

    setStripeLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    confirmPaymentMutate({ orderId: state.orderId, stripePaymentId: paymentMethod.id });
  };

  return (
    <div className="w-full flex flex-col gap-3 py-4 md:px-6 px-4 min-h-[calc(100vh-80px)]">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Pagamento</h2>
      </header>
      <form onSubmit={handlePayment} className="space-y-8">
        <div className="rounded-md border overflow-hidden">
          <div className="p-3 border-b">
            <div className="flex items-center gap-4">
              <div className="size-8 bg-zinc-50 rounded-full flex items-center justify-center border">
                <MapPin className="size-4 text-zinc-900" />
              </div>
              <h2 className="text-base font-medium">Endereço de Entrega</h2>
            </div>
          </div>
          <div className="p-4">
            {addressesLoading ? (
              <div className="flex justify-center py-8">
                <Spinner className="w-6 h-6 border-t-gray-900" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {addresses?.data.map((address) => (
                    <label key={address.addressId} className="flex items-start gap-3 p-3 rounded-md border hover:border-zinc-300 hover:bg-zinc-50/80 transition-all duration-200 cursor-pointer group">
                      <input type="radio" name="address" className="peer sr-only" onChange={() => setSelectedAddress(address.street)} />
                      <div className="size-4.5 mt-1 border border-zinc-400 rounded-full flex items-center justify-center peer-checked:border-zinc-900 peer-checked:bg-zinc-900 transition-all">
                        <div className="size-2.5 bg-white rounded-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">{address.neighborhood}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {address.street} {address.number} {address.complement && `${address.complement} - `}
                          {address.neighborhood}, {address.city}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          CEP {address.zip.slice(0, 5)}-{address.zip.slice(5)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                <button type="button" onClick={() => navigate("/settings?tab=my-addresses")} className="flex items-center gap-2 text-[15px] text-zinc-600 hover:text-gray-900 transition-colors mt-6 cursor-pointer">
                  <Edit3 className="size-4" />
                  <span>Gerenciar endereços</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-md border overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-zinc-50 rounded-full flex items-center justify-center border">
                <CreditCard className="size-4 text-gray-600" />
              </div>
              <h2 className="text-base font-medium">Informações do Cartão</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-zinc-50/80 rounded-md p-4 border">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      color: "#111827",
                      fontFamily: "Inter, -apple-system, sans-serif",
                      "::placeholder": {
                        color: "#9CA3AF",
                      },
                    },
                    invalid: {
                      color: "#EF4444",
                    },
                  },
                  hidePostalCode: true,
                  disableLink: true,
                }}
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={confirmPaymentPending || !stripe || !elements || !selectedAddress}
          className="w-full bg-primary-theme hover:bg-primary-theme-hover transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed">
          {(confirmPaymentPending || stripeLoading) && <Spinner className="size-4 border-t-white" />}
          <span>Confirmar Pagamento</span>
        </Button>
      </form>
    </div>
  );
};

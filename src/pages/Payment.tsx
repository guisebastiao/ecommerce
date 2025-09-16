import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { findAllAddresses } from "@/hooks/useAddress";
import type { OrderDTO } from "@/types/orderTypes";
import { confirmPayment } from "@/hooks/useOrder";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Address } from "@/components/Address";
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
      navigate("/create-address?redirect=/cart");
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
    <section className="w-full flex justify-center py-4 px-3 md:px-6">
      <div className="max-w-2xl w-full flex flex-col gap-6">
        <header className="flex justify-between items-center py-5">
          <h2 className="font-medium text-lg">Pagamento</h2>
        </header>
        <form
          onSubmit={handlePayment}
          className="flex flex-col gap-10"
        >
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-medium">Selecione o endereço</h3>
            {addressesLoading ? (
              <Spinner className="size-5 border-t-black" />
            ) : (
              addresses?.data.map((address) => (
                <Address
                  key={address.addressId}
                  address={address}
                  setSelectedAddress={setSelectedAddress}
                />
              ))
            )}
          </div>
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-medium">Pagamento com cartão</h3>
            <div className="border rounded p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                  hidePostalCode: true,
                  disableLink: true,
                }}
              />
            </div>
            <Button
              type="submit"
              disabled={confirmPaymentPending || !stripe || !elements}
              className="w-full mt-4 bg-primary-theme hover:bg-primary-theme-hover"
            >
              {(confirmPaymentPending || stripeLoading) && <Spinner className="size-4 border-t-white" />}
              <span>Confirmar pagamento</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

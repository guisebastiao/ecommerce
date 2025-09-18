import { findAllAddresses } from "@/hooks/useAddress";
import { Spinner } from "../Spinner";
import { Address } from "../Address";

export const MyAddresses = () => {
  const { data, isLoading } = findAllAddresses();

  return (
    <div className="p-1.5 space-y-4">
      <h1 className="font-medium">Meus Endereços</h1>
      <div>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spinner className="size-5 border-t-black" />
          </div>
        ) : (
          <div className="space-y-2">
            {data?.data.map((address) => (
              <Address key={address.addressId} address={address} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

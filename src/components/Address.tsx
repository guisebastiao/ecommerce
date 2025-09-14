import type { AddressDTO } from "@/types/addressTypes";
import { Button } from "./ui/button";

interface AddressProps {
  address: AddressDTO;
  setSelectedAddress: (addressId: string) => void;
}

export const Address = ({ address, setSelectedAddress }: AddressProps) => {
  return (
    <label key={address.addressId} className="flex border rounded p-3 cursor-pointer hover:bg-gray-50 transition">
      <input type="radio" name="address" className="peer hidden" onChange={() => setSelectedAddress(address.street)} />
      <div className="size-4 aspect-square mt-1 rounded-full border border-black flex items-center justify-center peer-checked:bg-black peer-checked:border-black">
        <span className="size-2 bg-white rounded-full" />
      </div>
      <div className="flex flex-col items-start gap-2 pl-3">
        <h3 className="text-base font-medium">{address.neighborhood}</h3>
        <p className="text-sm text-gray-600">
          {address.street} {address.number} {address.complement} - {address.neighborhood}, {address.city} - CEP {address.zip.slice(0, 5) + "-" + address.zip.slice(5)}
        </p>
        <Button type="button" variant="link" className="text-sm px-0 h-4 text-blue-800">
          Editar Endereço
        </Button>
      </div>
    </label>
  );
};

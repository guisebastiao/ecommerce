import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Edit2, EllipsisVertical, Plus, TicketPercent, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DiscountDTO } from "@/types/discountTypes";
import { findAllDiscounts } from "@/hooks/useDiscount";
import { CreateDiscount } from "./CreateDiscount";
import { UpdateDiscount } from "./UpdateDiscount";
import { DeleteDiscount } from "./DeleteDiscount";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useState } from "react";

export interface DialogProps {
  isOpen: boolean;
  discount: DiscountDTO | null;
}

export const ManageDiscount = () => {
  const [createDialog, setCreateDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState<DialogProps>({
    isOpen: false,
    discount: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<DialogProps>({
    isOpen: false,
    discount: null,
  });

  const { data, isLoading } = findAllDiscounts();

  const handleUpdateDiscount = (discount: DiscountDTO) => {
    setUpdateDialog({
      isOpen: true,
      discount,
    });
  };

  const handleDeleteDiscount = (discount: DiscountDTO) => {
    setDeleteDialog({
      isOpen: true,
      discount,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <TicketPercent className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Gerenciar Descontos</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Gerencie todos os descontos da sua loja</p>
              </div>
            </div>
            <Button
              onClick={() => setCreateDialog(true)}
              className="gap-2"
            >
              <Plus className="size-4" />
              Novo Desconto
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Card className="p-0">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="size-5 border-t-black" />
            </div>
          ) : !data || data.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="p-4 bg-muted rounded-full mb-4">
                <TicketPercent className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Nenhum desconto encontrado</h3>
              <p className="text-muted-foreground text-center max-w-md">Não há descontos cadastrados</p>
              <Button
                onClick={() => setCreateDialog(true)}
                className="mt-4 gap-2"
              >
                <Plus className="size-4" />
                Criar primeiro produto
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {data.data.map((discount) => (
                <div
                  key={discount.discountId}
                  className="p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg leading-tight text-foreground/80">{discount.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-bold">{discount.percent}% OFF</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-4" />
                          <span>Até {discount.endDate.split("-")[2] + "/" + discount.endDate.split("-")[1] + "/" + discount.endDate.split("-")[0]}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon">
                              <EllipsisVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Gerenciar Desconto</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdateDiscount(discount)}>
                              <Edit2 className="size-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteDiscount(discount)}>
                              <Trash2 className="size-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <CreateDiscount
        isOpen={createDialog}
        setIsOpen={setCreateDialog}
      />
      <UpdateDiscount
        discount={updateDialog.discount}
        isOpen={updateDialog.isOpen}
        setIsOpen={(isOpen) => setUpdateDialog({ isOpen, discount: isOpen ? updateDialog.discount : null })}
      />
      <DeleteDiscount
        discount={deleteDialog.discount}
        isOpen={deleteDialog.isOpen}
        setIsOpen={(isOpen) => setDeleteDialog({ isOpen, discount: isOpen ? deleteDialog.discount : null })}
      />
    </div>
  );
};

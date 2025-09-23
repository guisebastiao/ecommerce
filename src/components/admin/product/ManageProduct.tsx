import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit2, Package, Trash2, Plus, ImageIcon, DollarSign, Package2, Tag, EllipsisVertical, TicketPercent, TicketX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductDTO, ProductQueryParams } from "@/types/productTypes";
import { Pagination } from "@/components/Pagination";
import { findAllProducts } from "@/hooks/useProduct";
import { useSearchParams } from "react-router-dom";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./UpdateProduct";
import { DeleteProduct } from "./DeleteProduct";
import { ApplyDiscount } from "./ApplyDiscount";
import { RemoveDiscount } from "./RemoveDiscount";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface DialogProps {
  isOpen: boolean;
  product: ProductDTO | null;
}

export const ManageProduct = () => {
  const [searchParams] = useSearchParams({
    offset: "1",
    limit: "20",
  });

  const [createDialog, setCreateDialog] = useState(false);
  const [applyDiscountDialog, setApplyDiscountDialog] = useState<DialogProps>({
    isOpen: false,
    product: null,
  });
  const [removeDiscountDialog, setRemoveDiscountDialog] = useState<DialogProps>({
    isOpen: false,
    product: null,
  });
  const [updateDialog, setUpdateDialog] = useState<DialogProps>({
    isOpen: false,
    product: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<DialogProps>({
    isOpen: false,
    product: null,
  });

  const params = Object.fromEntries(searchParams.entries()) as {
    [K in keyof ProductQueryParams]: string;
  };

  const { data, isLoading } = findAllProducts(params);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "brl",
    }).format(value);
  };

  const getStockBadgeVariant = (stock: number) => {
    if (stock === 0) return "destructive";
    if (stock < 10) return "secondary";
    return "default";
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return "Sem estoque";
    if (stock < 10) return "Estoque baixo";
    return "Em estoque";
  };

  const handleUpdateProduct = (product: ProductDTO) => {
    setUpdateDialog({
      isOpen: true,
      product,
    });
  };

  const handleDeleteProduct = (product: ProductDTO) => {
    setDeleteDialog({
      isOpen: true,
      product,
    });
  };

  const handleApplyDiscount = (product: ProductDTO) => {
    setApplyDiscountDialog({
      isOpen: true,
      product,
    });
  };

  const handleRemoveDiscount = (product: ProductDTO) => {
    setRemoveDiscountDialog({
      isOpen: true,
      product,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Gerenciar Produtos</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Gerencie todos os produtos da sua loja</p>
              </div>
            </div>
            <Button
              onClick={() => setCreateDialog(true)}
              className="gap-2"
            >
              <Plus className="size-4" />
              Novo Produto
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="size-5 border-t-black" />
            </div>
          ) : !data || data.data.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Package2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground text-center max-w-md">Não há produtos cadastrados ou que correspondam aos critérios de busca.</p>
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
              {data.data.items.map((product) => (
                <div
                  key={product.productId}
                  className="p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={product.productPictures[0]?.url}
                        alt={product.name}
                        className="size-20 rounded-md object-cover border shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                        }}
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                          <Badge
                            variant="destructive"
                            className="text-xs"
                          >
                            Esgotado
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg leading-tight mb-1">{product.name}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon">
                                <EllipsisVertical />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Gerenciar Produto</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleApplyDiscount(product)}>
                                <TicketPercent className="size-4" />
                                <span>Aplicar Desconto</span>
                              </DropdownMenuItem>
                              {product.discount && (
                                <DropdownMenuItem onClick={() => handleRemoveDiscount(product)}>
                                  <TicketX className="size-4" />
                                  <span>Remover Desconto</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleUpdateProduct(product)}>
                                <Edit2 className="size-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteProduct(product)}>
                                <Trash2 className="size-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="size-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Preço</p>
                            <div className="flex items-center gap-2">
                              {product.price ? (
                                <>
                                  <span className="font-semibold text-primary">{formatCurrency(product.price)}</span>
                                  <span className="text-xs text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
                                </>
                              ) : (
                                <span className="font-semibold">{formatCurrency(product.originalPrice)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package2 className="size-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Estoque</p>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{product.stock}</span>
                              <Badge
                                variant={getStockBadgeVariant(product.stock)}
                                className="text-xs"
                              >
                                {getStockText(product.stock)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="size-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Categoria</p>
                            <span className="font-medium text-sm">{product.category.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ImageIcon className="size-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Imagens</p>
                            <span className="font-medium">{product.productPictures.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {!isLoading && data && data.data.paging.totalPages > 0 && (
        <div className="flex justify-center">
          <Pagination paging={data.data.paging} />
        </div>
      )}
      <CreateProduct
        isOpen={createDialog}
        setIsOpen={setCreateDialog}
      />
      <ApplyDiscount
        product={applyDiscountDialog.product}
        isOpen={applyDiscountDialog.isOpen}
        setIsOpen={(isOpen) => setApplyDiscountDialog({ isOpen, product: isOpen ? applyDiscountDialog.product : null })}
      />
      <RemoveDiscount
        product={removeDiscountDialog.product}
        isOpen={removeDiscountDialog.isOpen}
        setIsOpen={(isOpen) => setRemoveDiscountDialog({ isOpen, product: isOpen ? applyDiscountDialog.product : null })}
      />
      <UpdateProduct
        product={updateDialog.product}
        isOpen={updateDialog.isOpen}
        setIsOpen={(isOpen) => setUpdateDialog({ isOpen, product: isOpen ? updateDialog.product : null })}
      />
      <DeleteProduct
        product={deleteDialog.product}
        isOpen={deleteDialog.isOpen}
        setIsOpen={(isOpen) => setDeleteDialog({ isOpen, product: isOpen ? updateDialog.product : null })}
      />
    </div>
  );
};

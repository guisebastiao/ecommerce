import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit2, EllipsisVertical, Plus, TicketPercent, Trash2, ChartBarStacked } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryDTO } from "@/types/categoryTypes";
import { findAllCategories } from "@/hooks/useCategory";
import { CreateCategory } from "./CreateCategory";
import { UpdateCategory } from "./UpdateCategory";
import { DeleteCategory } from "./DeleteCategory";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useState } from "react";

export interface DialogProps {
  isOpen: boolean;
  category: CategoryDTO | null;
}

export const ManageCategory = () => {
  const [createDialog, setCreateDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState<DialogProps>({
    isOpen: false,
    category: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<DialogProps>({
    isOpen: false,
    category: null,
  });

  const { data, isLoading } = findAllCategories();

  const handleUpdateCategory = (category: CategoryDTO) => {
    setUpdateDialog({
      isOpen: true,
      category,
    });
  };

  const handleDeleteCategory = (category: CategoryDTO) => {
    setDeleteDialog({
      isOpen: true,
      category,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <ChartBarStacked className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Gerenciar Categorias</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Gerencie todos as categorias da sua loja</p>
              </div>
            </div>
            <Button
              onClick={() => setCreateDialog(true)}
              className="gap-2"
            >
              <Plus className="size-4" />
              Nova Categoria
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
              <h3 className="font-semibold text-lg mb-2">Nenhuma categoria encontrada</h3>
              <p className="text-muted-foreground text-center max-w-md">Não há categorias cadastradas</p>
              <Button
                onClick={() => setCreateDialog(true)}
                className="mt-4 gap-2"
              >
                <Plus className="size-4" />
                Criar primeiro desconto
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {data.data.map((category) => (
                <div
                  key={category.categoryId}
                  className="p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg leading-tight text-foreground/80 capitalize">{category.name.toLowerCase()}</h3>
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
                            <DropdownMenuLabel>Gerenciar Categoria</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdateCategory(category)}>
                              <Edit2 className="size-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteCategory(category)}>
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
      <CreateCategory
        isOpen={createDialog}
        setIsOpen={setCreateDialog}
      />
      <UpdateCategory
        category={updateDialog.category}
        isOpen={updateDialog.isOpen}
        setIsOpen={(isOpen) => setUpdateDialog({ isOpen, category: isOpen ? updateDialog.category : null })}
      />
      <DeleteCategory
        category={deleteDialog.category}
        isOpen={deleteDialog.isOpen}
        setIsOpen={(isOpen) => setDeleteDialog({ isOpen, category: isOpen ? deleteDialog.category : null })}
      />
    </div>
  );
};

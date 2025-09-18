import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { profilePictureSchema } from "@/schemas/clientSchema";
import { acceptMimetypes } from "@/utils/acceptMimetypes";
import { uploadProfilePicture } from "@/hooks/useClient";
import type { ActiveLoginDTO } from "@/types/authTypes";
import { useContextAuth } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Spinner } from "../Spinner";

export const ProfilePicture = () => {
  const { setClient, client } = useContextAuth();
  if (!client) return null;

  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending, isSuccess, data } = uploadProfilePicture();

  const uploadProfilePictureForm = useForm({
    resolver: zodResolver(profilePictureSchema),
    mode: "onChange",
    defaultValues: {
      file: undefined,
    },
  });

  const handleUploadProfilePicture = () => {
    mutate(uploadProfilePictureForm.getValues());
  };

  const file = uploadProfilePictureForm.watch("file");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  useEffect(() => {
    if (isSuccess) {
      const storage = localStorage.getItem("auth");
      const auth: ActiveLoginDTO = JSON.parse(storage!);

      auth.client.clientPicture = data.data;

      const newStorage = JSON.stringify(auth);
      localStorage.setItem("auth", newStorage);

      setClient(auth.client);
    }
  }, [isSuccess]);

  return (
    <Form {...uploadProfilePictureForm}>
      <form onSubmit={uploadProfilePictureForm.handleSubmit(handleUploadProfilePicture)} className="space-y-4 p-1.5">
        <h1 className="font-medium">Foto de Perfil</h1>
        <FormField
          control={uploadProfilePictureForm.control}
          name="file"
          render={() => (
            <FormItem>
              <FormDescription>
                Escolha uma foto clara e nítida que mostre você. O arquivo deve estar em JPEG ou PNG e dentro do tamanho máximo permitido. Assim, sua conta fica mais pessoal e fácil de reconhecer pelos outros.
              </FormDescription>
              <FormControl>
                <div className="w-full">
                  <input
                    type="file"
                    className="hidden"
                    id="file"
                    accept={acceptMimetypes.join(",")}
                    ref={inputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        uploadProfilePictureForm.setValue("file", file, { shouldValidate: true });
                      }
                    }}
                  />
                  <label htmlFor="file" className="w-full">
                    <Button type="button" className="w-full" onClick={() => inputRef.current?.click()}>
                      <Upload className="size-4" />
                      <span>Selecionar Imagem</span>
                    </Button>
                  </label>
                </div>
              </FormControl>
              {uploadProfilePictureForm.formState.errors.file?.message && <FormMessage>{uploadProfilePictureForm.formState.errors.file.message}</FormMessage>}
            </FormItem>
          )}
        />

        <div className="w-full flex justify-center py-4">
          <Avatar className="flex size-32 cursor-pointer">
            <AvatarImage src={preview ? preview : client.clientPicture?.url} />
            <AvatarFallback>
              <div className="size-32 flex items-center justify-center bg-primary-theme rounded-full">
                <User className="size-16 text-white" />
              </div>
            </AvatarFallback>
          </Avatar>
        </div>

        <Button type="submit" className="w-full bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={uploadProfilePictureForm.watch("file") === undefined || isPending}>
          {isPending && <Spinner className="size-4 border-t-white" />}
          <span>Enviar Foto de Perfil</span>
        </Button>
      </form>
    </Form>
  );
};

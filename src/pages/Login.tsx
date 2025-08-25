import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { loginFormSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SideImage from "@/assets/side_image.png";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export const Login = () => {
  const searchForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = () => {};

  return (
    <section className="w-full flex gap-6 py-4 md:px-6 px-3">
      <img
        src={SideImage}
        alt="side-img"
        className="max-w-xl rounded md:block hidden"
      />
      <Form {...searchForm}>
        <form
          onSubmit={searchForm.handleSubmit(handleLogin)}
          // className="max-w-lg w-full"
        >
          <FormField
            control={searchForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Email"
                    className="px-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={searchForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="off"
                    placeholder="Senha"
                    className="px-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
};

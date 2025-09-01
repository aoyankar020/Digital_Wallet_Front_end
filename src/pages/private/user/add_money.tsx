import InputN from "@/components/comp-13";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserAddMoneyMutation } from "@/redux/Api/userApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
const addMoneySchema = z.object({
  ammount: z.coerce.number(),
});
function AddMoney() {
  const data = {
    title: "Add money",
    description: "Enter ammount to add money to your account",
    button: "Add Money",
    label: "Ammount",
  };
  const [userAddMoney] = useUserAddMoneyMutation();

  const form = useForm<{ ammount: unknown }>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      ammount: "",
    },
  });
  const onSubmit = async (values: any) => {
    try {
      console.log("User Add Money Value", values);
      const result = await userAddMoney(values).unwrap();
      console.log("Add Money result", result);
      if (result.success) {
        toast.success(`${result.message} : ${result?.data?.ammount} TK`);
        form.reset();
      }
    } catch (error) {
      toast.error(String(error));
    }
  };
  return (
    <>
      <div className="p-4">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{data?.title}</CardTitle>
            <CardDescription>{data?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="f" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="ammount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                          <FormLabel>{data?.label}</FormLabel>
                          <FormControl>
                            <InputN {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your ammount Field
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button form="f" type="submit" className="w-full">
              {data?.button}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default AddMoney;

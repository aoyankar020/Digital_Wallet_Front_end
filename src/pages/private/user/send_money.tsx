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
import Phone from "@/components/ui/phone";

import { useSendMoneyMutation } from "@/redux/Api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
const SendMoneySchema = z.object({
  senderPhone: z.string(),
  receiverPhone: z.string(),
  ammount: z.coerce.number(),
});
function SendMoney() {
  const data = {
    title: "Send money",
    description: "Enter ammount & other details to send money",
    button: "Send Money",
    label: "Ammount",
  };
  const [sendMoney] = useSendMoneyMutation();
  // type FormValues = z.infer<typeof SendMoneySchema>;
  const form = useForm<{
    senderPhone: string;
    receiverPhone: string;
    ammount: unknown;
  }>({
    resolver: zodResolver(SendMoneySchema),
    defaultValues: {
      senderPhone: "",
      receiverPhone: "",
      ammount: undefined,
    },
  });
  // Handle Send Money
  const onSubmit = async (values: any) => {
    const { senderPhone, receiverPhone, ammount } = values;
    const newSenderPhone = senderPhone.substring(3);
    const newreceiverPhone = receiverPhone.substring(3);
    const userData = {
      phone: newSenderPhone,
      receiverphone: newreceiverPhone,
      ammount,
    };
    console.log("Values:", values);
    try {
      const result = await sendMoney(userData).unwrap();
      console.log("Sender Result", result);
      if (result.success) {
        toast.success(`${result.message} : ${result?.data?.ammount} TK`);
        form.reset();
      } else {
        toast.success(`${result.message} `);
      }
    } catch (error) {
      console.log("Error:", error);
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
                  name="senderPhone"
                  render={({ field }) => (
                    <FormItem className="py-2">
                      <FormLabel>Sender Phone Number</FormLabel>
                      <FormControl>
                        <Phone
                          {...field}
                          value={field.value} // controlled by react-hook-form
                          onChange={(value: string) => field.onChange(value)} // update RHF state
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex flex-col justify-center items-center py-2 gap-2">
                  <span className="w-full text-center text-muted-foreground font-semibold">
                    Transfer to
                  </span>
                  <ArrowDownUp className=" text-muted-foreground " />
                </div>

                <FormField
                  control={form.control}
                  name="receiverPhone"
                  render={({ field }) => (
                    <FormItem className="py-2">
                      <FormLabel>Receiver Phone Number</FormLabel>
                      <FormControl>
                        <Phone
                          {...field}
                          value={field.value} // controlled by react-hook-form
                          onChange={(value: string) => field.onChange(value)} // update RHF state
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ammount"
                  render={({ field }) => (
                    <FormItem className="py-2">
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

export default SendMoney;

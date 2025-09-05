import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Logo from "@/assets/icon/logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import Password from "../ui/password";
import Phone from "../ui/phone";
import {
  useLoginAgentMutation,
  useLoginUserMutation,
  useRegesterAgentMutation,
  useRegesterUserMutation,
} from "@/redux/Api/auth.api";
import { toast } from "sonner";

import { Switch } from "../ui/switch";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setUser } from "@/redux/slice/authslice";
const loginformSchema = z.object({
  email: z.email({
    message: "Please provide a valid email.",
  }),
  password: z.string({ message: "You should have to be provided password" }),

  AsAgent: z.boolean().optional(),
});
const signUpformSchema = z
  .object({
    name: z.string().min(3, { message: "Minimul length should be 3" }),
    email: z.email({
      message: "Please provide a valid email.",
    }),
    password: z
      .string({ error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),

    confirm_password: z
      .string({ error: "Confirm password is required" })
      .min(8, { message: "Confirm password must be at least 8 characters" }),
    phone: z
      .string()
      .min(11, {
        message: "Please provide 11 digit of Bangladeshi phone number",
      })
      .trim()
      .refine((value) => /^(?:\+?88)?01[3-9]\d{8}$/.test(value), {
        message:
          "(01XXXXXXXXX or +8801XXXXXXXXX, excluding the old 011 series)",
      }),
    AsAgent: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
    // <-- show error under confirm_password field
  });
export default function AuthModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const [view, setView] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const [regesterUser] = useRegesterUserMutation();
  const [regesterAgent] = useRegesterAgentMutation();
  const [loginUser] = useLoginUserMutation();
  const [loginAgent] = useLoginAgentMutation();

  const loginform = useForm<z.infer<typeof loginformSchema>>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      email: "",
      password: "",
      AsAgent: false,
    },
  });
  const signUpform = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
    defaultValues: {
      email: " ",
      password: "",
      name: "",
      phone: "",
      confirm_password: "",
      AsAgent: false,
    },
  });

  const loginSubmit = async (values: z.infer<typeof loginformSchema>) => {
    const { email, password, AsAgent } = values;

    const credentials = {
      email,
      password,
    };

    try {
      let result;
      if (AsAgent) {
        result = await loginAgent(credentials).unwrap();
      } else {
        result = await loginUser(credentials).unwrap();
      }
      if (result.success) {
        const role = result?.data?.data?.role;
        const email = result?.data?.data?.email;
        toast.success(`${result?.message}` || "Login successful");
        setOpen(false);
        dispatch(setUser({ role, email }));
        // delay before redirect
        setTimeout(() => {
          if (AsAgent) {
            navigate("/agent");
          } else if (role === "USER") {
            navigate("/user");
          } else {
            navigate("/admin");
          }
        }, 1000);
      }
    } catch (error: any) {
      toast.warning(error?.data?.message);
    } finally {
      loginform.reset();
    }
  };
  const signUpSubmit = async (values: z.infer<typeof signUpformSchema>) => {
    const { phone, name, email, password, AsAgent } = values;
    const newPhone = phone.substring(3);
    const userData = {
      password,
      email,
      phone: newPhone,
      name,
    };
    if (AsAgent) {
      try {
        const result = await regesterAgent(userData).unwrap();
        console.log("Result", result);
        if (result.success) {
          toast.success(`${result.message}`);
          signUpform.reset();
          setView("login");
        }
      } catch (error: any) {
        toast.error(`${error?.data?.message}`);
        console.log("Error:", error);
      }
    } else {
      try {
        const result = await regesterUser(userData).unwrap();
        console.log("Result", result);
        if (result.success) {
          toast.success(`${result.message}`);
          signUpform.reset();
          setView("login");
        }
      } catch (error: any) {
        toast.error(`${error?.data?.message}`);
        console.log("Error:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-20 py-10">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center  "
            aria-hidden="true"
          >
            <Logo />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {view === "login" ? "Welcome Back" : "Thanks For Regestration"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {view === "login"
                ? "Enter your credentials to login to your account."
                : "Enter your information to ceate new account."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {view === "login" && (
          <>
            <Form {...loginform}>
              <form
                className="space-y-6"
                onSubmit={loginform.handleSubmit(loginSubmit)}
              >
                {/* Email */}
                <FormField
                  control={loginform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="email"
                          placeholder="hi@yourcompany.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={loginform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Remember me + Forgot Password */}
                <div className="flex justify-between gap-2">
                  <FormField
                    control={loginform.control}
                    name="AsAgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-muted-foreground font-normal">
                          Login As Agent
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <a className="text-sm underline hover:no-underline" href="#">
                    Forgot password?
                  </a>
                </div>

                {/* Submit button */}
                <div className="flex justify-center w-full">
                  <Button type="submit" className="w-full cursor-pointer">
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>

            <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
              <span className="text-muted-foreground text-xs">Or</span>
            </div>
            <div className="flex justify-center w-full">
              <Button className="w-1/2 cursor-pointer" variant="outline">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Button
                className="cursor-pointer"
                variant="link"
                type="button"
                onClick={() => setView("signup")}
              >
                Sign up
              </Button>
            </div>
          </>
        )}
        {view === "signup" && (
          <>
            <Form {...signUpform}>
              <form
                className="space-y-6"
                onSubmit={signUpform.handleSubmit(signUpSubmit)}
              >
                {/* Name */}
                <FormField
                  control={signUpform.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={signUpform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@xyz.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone */}
                <FormField
                  control={signUpform.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
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
                {/* Password */}
                <FormField
                  control={signUpform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*Confirm Password */}
                <FormField
                  control={signUpform.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* as Agent */}
                <div className="flex justify-between gap-2">
                  <FormField
                    control={signUpform.control}
                    name="AsAgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-muted-foreground font-normal">
                          Regester As Agent
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <a className="text-sm underline hover:no-underline" href="#">
                    Forgot password?
                  </a>
                </div>
                {/* Submit button */}
                <div className="flex justify-center w-full">
                  <Button type="submit" className="w-full cursor-pointer">
                    Sign Up
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Button
                className="cursor-pointer"
                variant="link"
                type="button"
                onClick={() => setView("login")}
              >
                Sign in
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

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
import { useEffect } from "react";
import z from "zod";

import { useUpdateProfileMutation } from "@/redux/Api/agentAuth";
import { toast } from "sonner";
import { useGetMeAgentQuery, useGetMeQuery } from "@/redux/Api/auth.api";
import { useUpdateUserProfileMutation } from "@/redux/Api/userApi";
const profileDetailsSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  role: z.string(),
  wallet: z.string().optional(),
  isApproved: z.boolean(),
  isVarified: z.boolean(),
  password: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.string(),
});

export default function ProfileDetails({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  // Call hooks unconditionally
  const { data: agentProfile } = useGetMeAgentQuery(undefined);
  const { data: userProfile } = useGetMeQuery(undefined);

  const role = agentProfile?.data?.role || userProfile?.data?.role;
  const profile =
    role === "USER" || role === "ADMIN"
      ? userProfile?.data
      : agentProfile?.data;

  const [updateProfile] = useUpdateProfileMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const profileform = useForm<z.infer<typeof profileDetailsSchema>>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      wallet: profile?.wallet,
      role: profile?.role,
      isApproved: profile?.isApproved,
      isActive: profile?.isActive,
      createdAt: profile?.createdAt,
      isVarified: profile?.isVarified,
      updatedAt: profile?.updatedAt,
      password: "",
    },
  });
  // ⬇️ Reset values whenever `data` changes
  useEffect(() => {
    if (profile) {
      profileform.reset({
        ...profile,
        password: "", // keep empty if you don’t want to show password
      });
    }
  }, [profile, profileform]);

  const detailsHandller = async (
    values: z.infer<typeof profileDetailsSchema>
  ) => {
    let save;
    try {
      if (role === "USER" || role === "ADMIN") {
        save = await updateUserProfile(values).unwrap();
      } else {
        save = await updateProfile(values).unwrap();
      }
      if (save.success) {
        toast.success(`${save.message}`);
        setOpen(false);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl px-8 sm:px-10 md:px-16 py-6 ">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center  "
            aria-hidden="true"
          >
            <Logo />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              PROFILE DETAILS
              {/* {view === "login" ? "Welcome Back" : "Thanks For Regestration"} */}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Don't share your details with anyone
              {/* {view === "login"
                ? "Enter your credentials to login to your account."
                : "Enter your information to ceate new account."} */}
            </DialogDescription>
          </DialogHeader>
        </div>

        <>
          <Form {...profileform}>
            <form
              id="profile"
              className="space-y-6 grid grid-cols-2 gap-4"
              onSubmit={profileform.handleSubmit(detailsHandller)}
            >
              {/* Name */}
              <FormField
                control={profileform.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={profileform.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* phone */}
              <FormField
                control={profileform.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Wallet */}
              <FormField
                control={profileform.control}
                name="wallet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* User Type */}
              <FormField
                control={profileform.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Approved? */}
              <FormField
                control={profileform.control}
                name="isApproved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Approval Status</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={field.value ? "Approved" : "Not Approved"}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Verifies? */}
              <FormField
                control={profileform.control}
                name="isVarified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Verified Status</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={field.value ? "Varified" : "Not Varified"}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* active? */}
              <FormField
                control={profileform.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Status</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Created ? */}
              <FormField
                control={profileform.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creation Date</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Updated ? */}
              <FormField
                control={profileform.control}
                name="updatedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Update Date</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* Submit button */}
          <div className="flex justify-center w-full">
            <Button
              form="profile"
              type="submit"
              className="w-1/2 mx-auto cursor-pointer"
            >
              Save
            </Button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}

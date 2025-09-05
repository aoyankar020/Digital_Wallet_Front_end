import ProfileDetails from "@/components/modal/profileDetals";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useGetMeAgentQuery } from "@/redux/Api/agentAuth";
import { useGetMeQuery } from "@/redux/Api/userApi";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

function Profile() {
  const [open, setOpen] = useState(false);

  // Call hooks unconditionally
  const { data: agentProfile, isLoading: isAgentLoading } =
    useGetMeAgentQuery(undefined);
  const { data: userProfile, isLoading: isUserLoading } =
    useGetMeQuery(undefined);
  const role = agentProfile?.data?.role || userProfile?.data?.role;
  if (isAgentLoading || isUserLoading)
    return (
      <div className="flex justify-center items-center h-64 sweet-loading">
        <PulseLoader color={"#FF7917"} size={15} speedMultiplier={1} />
      </div>
    );
  const profile =
    role === "USER" || role === "ADMIN"
      ? userProfile?.data
      : agentProfile?.data;

  return (
    <div className="py-6">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Profile of {profile?.name}</CardTitle>
          <CardDescription>
            Don't share your details with anyone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="w-[100px]">Email</TableHead>
                <TableCell className="text-left" key={profile?._id}>
                  {profile?.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>

                <TableCell className="text-left" key={profile?._id}>
                  {profile?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]">Phone</TableHead>

                <TableCell className="text-left" key={profile?._id}>
                  {profile?.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]">Wallet Created At </TableHead>

                <TableCell className="text-left" key={profile?._id}>
                  {new Date(profile?.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() => setOpen(true)}
          >
            View Details
          </Button>

          <ProfileDetails open={open} setOpen={setOpen} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;

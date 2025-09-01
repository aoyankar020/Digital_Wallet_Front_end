import CommonModal from "@/components/modal/commonModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsersQuery } from "@/redux/Api/adminApi";
import type { IProfile } from "@/types";
import { useState } from "react";

function Users() {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] =
    useState<Partial<IProfile> | null>(null);
  const { data } = useGetUsersQuery(undefined);
  const profiles = data?.data ?? [];
  console.log("profiles", profiles);
  return (
    <div className="">
      <p className="text-xl font-semibold py-6 w-full ">
        <u>USERS</u>
      </p>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone </TableHead>
            <TableHead>Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile: any) => (
            <TableRow key={profile._id}>
              <TableCell className="font-medium text-left">
                {profile.name}
              </TableCell>
              {/* {/* <TableCell>{profile}</TableCell> */}
              <TableCell className="text-left">{profile.email}</TableCell>
              <TableCell className="text-left">{profile.phone}</TableCell>

              <TableCell className="text-right">
                <Button
                  className="cursor-pointer"
                  size={"sm"}
                  onClick={() => {
                    setSelectedProfile(profile);
                    setOpen(true);
                  }}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* Modal Here */}
        {selectedProfile && (
          <CommonModal data={selectedProfile} open={open} setOpen={setOpen} />
        )}
      </Table>
    </div>
  );
}
export default Users;

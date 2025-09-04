import CommonModal from "@/components/modal/commonModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBlockAgentMutation, useGetAgentsQuery } from "@/redux/Api/adminApi";
import type { IProfile } from "@/types";
import { useState } from "react";
interface IApprove {
  phone: string;
  activeStatus: string;
  approveStatus?: boolean;
  varifiedStatus?: boolean;
}
function Agents() {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] =
    useState<Partial<IProfile> | null>(null);
  const [status, setStatus] = useState(true);

  const { data } = useGetAgentsQuery(undefined);
  const [blockAgent] = useBlockAgentMutation();
  const profiles = data?.data ?? [];
  console.log("profiles", profiles);
  let payload;
  const handleBlock = async (data: IApprove) => {
    if (data?.activeStatus === "ACTIVE") {
      payload = {
        phone: data.phone,
        activeStatus: "BLOCKED",
        approveStatus: false,
        varifiedStatus: false,
      };
      const result = await blockAgent(payload).unwrap();
      console.log("Result:", result);
    } else if (data?.activeStatus === "BLOCKED") {
      payload = {
        phone: data.phone,
        activeStatus: "ACTIVE",
      };
      const result = await blockAgent(payload).unwrap();
      console.log("Result:", result);
    }

    // if (data.activeStatus) {
    //   payload = {
    //     phone: data.phone,
    //     activeStatus: "BLOCKED",
    //     approveStatus: false,
    //     varifiedStatus: false,
    //   };
    //   const result = await blockAgent(payload).unwrap();
    //   setStatus(false);
    //   console.log("R", result);
    // } else {
    //   payload = {
    //     phone: data.phone,
    //     activeStatus: "ACTIVE",
    //   };
    //   const result = await blockAgent(payload).unwrap();
    //   setStatus(true);

    //   console.log("Unblock res :", result);
    // }
  };
  const handleApprove = async (data: IApprove) => {
    if (data.approveStatus) {
      payload = {
        phone: data.phone,
        approveStatus: !data?.approveStatus,
      };
      const result = await blockAgent(payload).unwrap();
      setStatus(false);
      console.log("Approve res", result);
    } else {
      payload = {
        phone: data.phone,
        approveStatus: !data.approveStatus,
      };
      const result = await blockAgent(payload).unwrap();
      setStatus(true);

      console.log("Approve res :", result);
    }
  };
  return (
    <div className="">
      <p className="text-xl font-semibold py-6 w-full ">
        <u>Agents</u>
      </p>
      {profiles.length <= 0 ? (
        "No agent Available"
      ) : (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone </TableHead>
              <TableHead className="text-end">Actions </TableHead>
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

                <TableCell className="text-right flex justify-end gap-2">
                  <Button
                    onClick={() =>
                      handleApprove({
                        phone: profile?.phone,
                        activeStatus: profile?.isActive,
                        approveStatus: profile?.isApproved,
                      })
                    }
                    className="cursor-pointer"
                    size={"sm"}
                  >
                    {profile.isApproved ? "Unapprove" : "Approve"}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedProfile(profile);
                      setOpen(true);
                    }}
                    className="cursor-pointer"
                    size={"sm"}
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() =>
                      handleBlock({
                        phone: profile.phone,
                        activeStatus: profile.isActive,
                      })
                    }
                    className="cursor-pointer"
                    size={"sm"}
                  >
                    {profile.isActive === "BLOCKED" ? "UNBLOCK" : "BLOCK"}
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
      )}
    </div>
  );
}
export default Agents;

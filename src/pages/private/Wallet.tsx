import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import cardImg from "@/assets/images/de.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useGetWalletQuery } from "@/redux/Api/agentAuth";
import { useGetMeQuery } from "@/redux/Api/auth.api";
import { useGetuserWalletQuery } from "@/redux/Api/userApi";
import { PulseLoader } from "react-spinners";

function Wallet() {
  const { data: user, isLoading: userLoading } = useGetMeQuery(undefined);
  const role = user?.data?.role;

  // Call hooks unconditionally
  const { data: agentWallet, isLoading: agentLoading } =
    useGetWalletQuery(undefined);
  const { data: userWallet, isLoading: uLoading } =
    useGetuserWalletQuery(undefined);
  const loading = userLoading || agentLoading || uLoading;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 sweet-loading">
        <PulseLoader color={"#FF7917"} size={15} speedMultiplier={1} />
      </div>
    );
  }
  // Choose wallet data based on role
  const wallet =
    role === "USER" || role === "ADMIN" ? userWallet?.data : agentWallet?.data;

  return (
    <div className="py-4">
      <p className="text-xl font-semibold py-6 w-full ">
        <u>Wallet </u>
      </p>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className=" flex justify-center  ">
          <img
            src={cardImg}
            alt="Card Background"
            className="w-fit p-4 h-56 object-contain "
          />
          {/* <CreditCard className="w-full " size={60} /> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="w-[100px]">Wallet</TableHead>
                <TableCell className="text-left">{wallet?._id}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]">Ballance</TableHead>

                <TableCell className="text-left">
                  {wallet?.balance} TK
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]">Wallet Status</TableHead>

                <TableCell className="text-left">{wallet?.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]">Wallet Created At </TableHead>

                <TableCell className="text-left">
                  {new Date(wallet?.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Wallet;

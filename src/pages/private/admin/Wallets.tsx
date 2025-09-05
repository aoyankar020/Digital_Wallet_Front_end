import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetWalletsQuery } from "@/redux/Api/adminApi";
import cardImg from "@/assets/images/de.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

function Wallets() {
  const { data } = useGetWalletsQuery(undefined);
  const wallets = data?.data ?? [];
  console.log("wallets", data);

  return (
    <div className="grid grid-cols-2 gap-4 py-6">
      {wallets.map((wallet: any) => (
        <Card className="w-full max-w-lg">
          <CardHeader className=" ">
            <img
              src={cardImg}
              alt="Card Background"
              className="w-fit h-56  object-contain"
            />
            {/* <CreditCard className="w-full " size={60} /> */}
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-[100px]">Wallet</TableHead>
                  <TableCell key={wallet._id}>{wallet._id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[100px]">Ballance</TableHead>

                  <TableCell className="text-left" key={wallet._id}>
                    {wallet.balance}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[100px]">Wallet Status</TableHead>

                  <TableCell className="text-left" key={wallet._id}>
                    {wallet.status}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[100px]">
                    Wallet Created At{" "}
                  </TableHead>

                  <TableCell className="text-left" key={wallet._id}>
                    {new Date(wallet.createdAt).toLocaleDateString("en-GB")}
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
      ))}
    </div>
  );
}

export default Wallets;

import {
  useGetTransactionQuery,
  useGetuserWalletQuery,
} from "@/redux/Api/userApi";
import Transaction from "../Transaction";
import { PulseLoader } from "react-spinners";

function userOverview() {
  const { data: wallet, isLoading: walletIsloading } =
    useGetuserWalletQuery(undefined);
  const { data: tran, isLoading: tranIsLoading } =
    useGetTransactionQuery(undefined);
  const loading = walletIsloading || tranIsLoading;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 sweet-loading">
        <PulseLoader color={"#FF7917"} size={15} speedMultiplier={1} />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-center items-center p-6">
            <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
              Wallet Balance
            </h2>
            <span className="text-primary/80 font-bold text-5xl">
              {wallet?.data?.balance}
            </span>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-center items-center p-6">
            <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
              Total Transaction
            </h2>
            <span className="text-primary/80 font-bold text-5xl">
              {tran?.data.length}
            </span>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
          <Transaction />
        </div>
      </div>
    </>
  );
}

export default userOverview;

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllTransactionsQuery } from "@/redux/Api/adminApi";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

function Transactions() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const queryParams: { page: number; limit: number; type?: string } = {
    page,
    limit,
  };
  if (filterType && filterType !== "ALL") {
    queryParams.type = filterType;
  }

  const { data: allTransactions, isLoading } =
    useGetAllTransactionsQuery(queryParams);

  console.log("All Users Transaction Admin:", allTransactions);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 sweet-loading">
        <PulseLoader color={"#FF7917"} size={15} speedMultiplier={1} />
      </div>
    );

  const invoices = allTransactions?.data ?? [];
  const meta = allTransactions?.meta;

  return (
    <div className="">
      <p className="text-xl font-semibold py-6 w-full ">
        <u>History of Your Transactions</u>
      </p>
      <div className="py-8 flex justify-between">
        <div className="mb-4">
          <Select
            value={filterType}
            onValueChange={(value) => setFilterType(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Transaction Type</SelectLabel>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="ADD_MONEY">ADD_MONEY</SelectItem>
                <SelectItem value="WITHDRAW">WITHDRAW</SelectItem>
                <SelectItem value="SEND_MONEY">SEND_MONEY</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1); // reset to first page when limit changes
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Items per page</SelectLabel>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Date</TableHead>
            <TableHead>Sender Wallet</TableHead>
            <TableHead>Receiver Wallet</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>

            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice: any) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium text-start text-muted-foreground p-2">
                {new Date(invoice?.createdAt).toLocaleDateString("en-GB")}
              </TableCell>

              <TableCell className="font-medium text-start text-muted-foreground p-2">
                {invoice.senderWallet?._id}
              </TableCell>
              <TableCell className="font-medium text-start text-muted-foreground p-2">
                {invoice.receiverWallet?._id}
              </TableCell>
              <TableCell className="font-medium text-start text-muted-foreground p-2">
                {invoice.type}
              </TableCell>
              <TableCell className="font-medium text-start text-muted-foreground p-2">
                {invoice.status}
              </TableCell>

              <TableCell className="font-medium text-end text-muted-foreground p-2">
                {invoice.ammount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {meta && (
            <TableRow>
              <TableCell colSpan={6}>
                Page {meta.page} of {Math.ceil(meta.total / meta.limit)}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>

      <div className="py-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(meta.total / meta.limit) }).map(
              (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  page < Math.ceil(meta.total / meta.limit) && setPage(page + 1)
                }
                className={
                  meta && page >= Math.ceil(meta.total / meta.limit)
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
export default Transactions;

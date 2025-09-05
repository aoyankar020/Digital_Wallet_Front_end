// import { MyChart } from "@/components/shared/my_chart";
// import { useGetOverviewsQuery } from "@/redux/Api/adminApi";

// function DashboardHome() {
//   const { data: Overviews } = useGetOverviewsQuery(undefined);
//   console.log("ADMIN OVER VIEWS:", Overviews);
//   return (
//     <>
//       <div className="flex flex-1 flex-col gap-4 p-4">
//         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//           <div className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-start items-start p-6">
//             <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
//               Total User
//             </h2>
//             <span className="text-primary/80 font-bold text-5xl">
//               {Overviews?.data?.totalUsers}
//             </span>
//           </div>
//           <div className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-start items-start p-6">
//             <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize">
//               Total Agent
//             </h2>
//             <span className="text-primary/80 font-bold text-5xl">
//               {Overviews?.data?.totalAgents}
//             </span>
//           </div>
//           <div className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-start items-start p-6">
//             <h2 className="text-muted-foreground/65 font-semibold text-lg capitalize ">
//               Total Transaction
//             </h2>
//             <span className="text-primary/80 font-bold text-5xl">
//               {Overviews?.data?.transactionCount}
//             </span>
//           </div>
//         </div>
//         <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
//           <MyChart />
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashboardHome;

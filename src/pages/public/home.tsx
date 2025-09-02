import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import Hero from "@/components/shared/hero";

// // Navbar Component
// function Navbar() {
//   return (
//     <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//         <Link href="/" className="text-2xl font-bold">
//           WalletX
//         </Link>
//         <nav className="hidden md:flex gap-6 font-medium">
//           <Link href="/" className="hover:text-gray-200 transition">
//             Home
//           </Link>
//           <Link href="/features" className="hover:text-gray-200 transition">
//             Features
//           </Link>
//           <Link href="/pricing" className="hover:text-gray-200 transition">
//             Pricing
//           </Link>
//           <Link href="/about" className="hover:text-gray-200 transition">
//             About
//           </Link>
//           <Link href="/contact" className="hover:text-gray-200 transition">
//             Contact
//           </Link>
//         </nav>
//         <Button asChild variant="secondary" className="ml-4">
//           <Link href="/signup">Get Started</Link>
//         </Button>
//       </div>
//     </header>
//   );
// }

// Stats Section with Skeleton Loading
function Stats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    users: number;
    transfers: number;
    merchants: number;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ users: 50000, transfers: 1200000, merchants: 1500 });
      setLoading(false);
    }, 1500); // simulate API delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {loading ? (
          <>
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </>
        ) : (
          <>
            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                {stats?.users.toLocaleString()}+
              </h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                {stats?.transfers.toLocaleString()}+
              </h3>
              <p className="text-gray-600">Transactions Processed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                {stats?.merchants.toLocaleString()}+
              </h3>
              <p className="text-gray-600">Merchants Connected</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Footer

// Home Page
function Home() {
  return (
    <div className="py-6">
      <Hero />
      <Stats />
    </div>
  );
}

export default Home;

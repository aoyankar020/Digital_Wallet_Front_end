import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for individuals who want essential wallet features.",
    features: [
      "Free peer-to-peer transfers",
      "Secure account with PIN & 2FA",
      "Basic transaction history",
    ],
  },
  {
    name: "Pro",
    price: "$4.99/mo",
    description:
      "Ideal for power users who want advanced controls and insights.",
    features: [
      "All Basic features",
      "Detailed spending analytics",
      "Priority customer support",
      "Lower withdrawal fees",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For businesses and teams that need high-volume transactions.",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "API access & integrations",
      "Bulk payments & payroll",
    ],
  },
];
const motionPageController: Variants = {
  hidden: {
    opacity: 0,
    y: window.innerHeight * 0.1,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      when: "beforeChildren",
      mass: 0.4,
      damping: 9,
      stiffness: 120,
      staggerChildren: 0.2,
    },
  },
};

const motionChildController: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
const hoverMotionController: Variants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};
function Pricing() {
  return (
    <motion.section
      className="py-16 "
      initial={"hidden"}
      animate={"visible"}
      variants={motionPageController}
    >
      <div
        // variants={motionChildController}
        className="max-w-6xl mx-auto px-6 text-center"
      >
        {/* Page Header */}
        <motion.h2
          variants={motionChildController}
          className="text-3xl font-bold mb-4 text-accent-foreground/80"
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p
          variants={motionChildController}
          className="text-gray-600 mb-12"
        >
          Choose the plan that fits your needs. No hidden fees, just clear
          benefits.
        </motion.p>

        {/* Subscription Tiers */}
        <motion.div
          variants={motionChildController}
          className="grid gap-8 md:grid-cols-3"
        >
          {tiers.map((tier, idx) => (
            <motion.div variants={hoverMotionController} whileHover="hover">
              <Card
                key={idx}
                className="rounded-2xl border hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    {tier.name}
                  </CardTitle>
                  <p className="text-3xl font-bold text-primary">
                    {tier.price}
                  </p>
                  <p className="text-gray-500 mt-1">{tier.description}</p>
                </CardHeader>
                <CardContent className="mt-4 space-y-3 text-left">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-chart-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Fees Note */}
        <motion.div
          variants={motionChildController}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl font-semibold mb-3 text-accent-foreground/80">
            Service Fees
          </h3>
          <p className="text-gray-600">
            Peer-to-peer transfers are free. Small fees apply for withdrawals
            and bill payments (starting at $0.50 per transaction). You’ll always
            see fees before confirming a transaction — no surprises.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
export default Pricing;

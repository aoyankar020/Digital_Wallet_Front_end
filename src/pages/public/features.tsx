import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bell, Send, Shield, Smartphone, Wallet } from "lucide-react";
import { motion, type Variants } from "framer-motion";
const features = [
  {
    title: "Secure Transactions",
    description:
      "Your money is protected with bank-level encryption and fraud detection.",
    icon: Shield,
  },
  {
    title: "Instant Transfers",
    description:
      "Send and receive money instantly to friends, family, or merchants.",
    icon: Send,
  },
  {
    title: "Smart Wallet",
    description:
      "Easily add money, withdraw, and track all your wallet activity in real time.",
    icon: Wallet,
  },
  {
    title: "Mobile Friendly",
    description: "Access your wallet anytime, anywhere from your smartphone.",
    icon: Smartphone,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track spending, manage budgets, and view transaction insights.",
    icon: BarChart,
  },
  {
    title: "Real-Time Notifications",
    description: "Stay updated with instant alerts for every transaction.",
    icon: Bell,
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
function Features() {
  return (
    <motion.section
      className="py-16 "
      initial={"hidden"}
      animate={"visible"}
      variants={motionPageController}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          variants={motionChildController}
          className="text-3xl font-bold mb-4 text-accent-foreground/80"
        >
          Powerful Features for Everyday Use
        </motion.h2>
        <motion.p
          variants={motionChildController}
          className="text-gray-600 mb-12"
        >
          Manage your money smarter with all-in-one digital wallet solutions.
        </motion.p>
        <motion.div
          variants={motionChildController}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, idx) => (
            <motion.div variants={hoverMotionController} whileHover="hover">
              <Card
                key={idx}
                className="hover:shadow-lg transition-all duration-300 rounded-2xl"
              >
                <CardContent className="flex flex-col items-center p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Features;

import { motion, type Variants } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router";
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
    scale: [1, 1.1, 1, 1.1, 1, 1.1, 1],
    transition: { duration: 2 },
  },
  tap: {
    scale: 0.95,
  },
};
function Hero() {
  return (
    <motion.section
      initial={"hidden"}
      animate={"visible"}
      variants={motionPageController}
      className="bg-gradient-to-r from-primary/80 to-sidebar-primary/100 text-muted flex justify-center items-center min-h-1/2 p-20"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Your Money, Simplified.
        </motion.h1>
        <motion.p
          variants={motionChildController}
          className="text-lg text-muted mb-8 max-w-2xl"
        >
          Send, receive, and manage money anytime, anywhere with WalletX — the
          secure digital wallet built for everyday use.
        </motion.p>
        <div className="flex ">
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={hoverMotionController}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className=" text-accent-foreground "
            >
              <Link to="/features">Explore Features</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
export default Hero;

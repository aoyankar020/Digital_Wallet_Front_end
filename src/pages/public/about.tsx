import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const team = [
  {
    name: "Aoyan Kar",
    role: "Founder & Lead Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Lee",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Kim",
    role: "Backend Engineer",
    img: "https://randomuser.me/api/portraits/men/55.jpg",
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
function About() {
  return (
    <motion.div
      className="py-16 bg-background"
      initial={"hidden"}
      animate={"visible"}
      variants={motionPageController}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Service Story */}
        <section className="mb-16 text-center">
          <motion.h2
            variants={motionChildController}
            className="text-3xl font-bold mb-4 text-accent-foreground/80"
          >
            Our Story
          </motion.h2>
          <motion.p
            variants={motionChildController}
            className="text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Our journey started with a simple idea: to make financial
            transactions easier, safer, and more accessible for everyone. We
            believe in a future where digital wallets empower people to take
            full control of their money, whether it's sending funds, managing
            budgets, or accessing services — all from the palm of your hand.
          </motion.p>
        </section>

        {/* Mission */}
        <motion.section
          variants={motionChildController}
          className="mb-16 grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={hoverMotionController} whileHover="hover">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-500">
                  We put our users at the heart of everything we build, ensuring
                  simple and seamless experiences.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={hoverMotionController} whileHover="hover">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-500">
                  To provide a secure and reliable digital wallet platform that
                  empowers financial freedom for all.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={hoverMotionController} whileHover="hover">
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Built with Care</h3>
                <p className="text-gray-500">
                  Every feature we design is made with love, transparency, and
                  trust.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Team */}
        <motion.section
          variants={motionChildController}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-accent-foreground/80">
            Meet the Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((member, idx) => (
              <motion.div variants={hoverMotionController} whileHover="hover">
                <Card
                  key={idx}
                  className="rounded-2xl shadow-md hover:shadow-lg transition"
                >
                  <CardContent className="p-6 flex flex-col items-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-500">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
export default About;

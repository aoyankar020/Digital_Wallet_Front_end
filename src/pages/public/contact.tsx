"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, type Variants } from "framer-motion";
// import { toast } from "react-hot-toast";
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
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated delay for submission
    setTimeout(() => {
      setLoading(false);
      toast.success(
        "Your inquiry has been submitted! We'll get back to you soon."
      );
      setForm({ name: "", email: "", message: "" }); // reset form
    }, 1500);
  };

  return (
    <motion.section
      initial={"hidden"}
      animate={"visible"}
      variants={motionPageController}
      className="py-16 "
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          variants={motionChildController}
          className="text-3xl font-bold text-center mb-4 text-accent-foreground/80"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          variants={motionChildController}
          className="text-gray-600 text-center mb-10"
        >
          Have a question, feedback, or partnership inquiry? Fill out the form
          and we’ll respond as quickly as possible.
        </motion.p>
        <motion.div variants={motionChildController}>
          <Card className="shadow-md rounded-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-start block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className=" text-start block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-start block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Type your message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;

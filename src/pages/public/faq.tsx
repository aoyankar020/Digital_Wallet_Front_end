import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, type Variants } from "framer-motion";

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
function FAQ() {
  const faqs = [
    {
      question: "Is my money safe in the wallet?",
      answer:
        "Absolutely. Your money is safeguarded with multiple layers of security, including bank-grade encryption, two-factor authentication (2FA), and advanced fraud monitoring systems that track unusual activity. We also comply with financial security regulations to ensure maximum protection of your funds. Even if your phone is lost, your account cannot be accessed without your PIN or biometric verification.",
    },
    {
      question: "How do I add money to my wallet?",
      answer:
        "Adding money to your wallet is quick and flexible. You can top up using debit or credit cards, direct bank transfers, or through our trusted network of partnered agents in your area. Once you complete a transaction, your wallet balance updates instantly, and you’ll receive a real-time confirmation notification for transparency.",
    },
    {
      question: "Can I send money internationally?",
      answer:
        "Currently, our wallet supports domestic money transfers within your country. However, we are actively working on adding international remittance services, which will allow you to send money to friends, family, and businesses abroad. Stay tuned — global transfers with competitive exchange rates will be available soon.",
    },
    {
      question: "Are there any fees for transactions?",
      answer:
        "Most peer-to-peer transfers within our wallet are completely free of charge. However, certain services like cash withdrawals, bill payments, and merchant transactions may include small service fees. We believe in full transparency, so you will always see any applicable fee clearly before confirming a transaction.",
    },
    {
      question: "What happens if I lose my phone?",
      answer:
        "No need to panic. Your wallet is linked to your account, not your device. All transactions are PIN-protected and secured with device authentication. If your phone is lost or stolen, simply log in to your account from another device, where you can block access to the lost phone and continue using your wallet safely. For extra peace of mind, you can also contact our support team to help lock or secure your account immediately.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Our support team is here 24/7 to assist you. You can reach us directly through the in-app live chat for instant help, email us at support@wallet.com for detailed inquiries, or call our customer care helpline anytime. We’re committed to resolving your issues quickly and ensuring a smooth experience with our wallet services.",
    },
  ];

  return (
    <motion.section
      className="py-16 "
      initial={"hidden"}
      animate={"visible"}
      variants={motionPageController}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          variants={motionChildController}
          className="text-3xl font-bold text-center mb-6 text-accent-foreground/80"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          variants={motionChildController}
          className="text-gray-600 text-center mb-10"
        >
          Here are some common questions about using our digital wallet.
        </motion.p>
        <motion.div variants={motionChildController}>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            defaultValue="item-0"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border rounded-lg bg-background shadow-sm"
              >
                <AccordionTrigger className="px-4 py-3 font-semibold text-xl text-accent-foreground/80">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FAQ;

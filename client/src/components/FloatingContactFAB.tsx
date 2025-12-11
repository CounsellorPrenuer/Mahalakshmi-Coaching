import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

export function FloatingContactFAB() {
  return (
    <motion.a
      href="https://wa.me/918861303243?text=Hi%20Mahalakshmi,%20I%20would%20like%20to%20discuss%20my%20career%20goals."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      data-testid="button-whatsapp-fab"
      aria-label="Contact via WhatsApp"
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <SiWhatsapp className="w-7 h-7 text-white relative z-10" />
    </motion.a>
  );
}

import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/client";

export default function SuccessMsg({ successMsg }) {
    return (
        <AnimatePresence>
            {successMsg !== "" && (
                <motion.div
                    className="fixed top-10 bg-lime-700 px-5 py-3 rounded-xl border-2 border-b-8 border-[rgba(0,32,0,0.7)] drop-shadow-2xl shadow-2xl"
                    initial={{ opacity: 0, y: -200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -200 }}
                    transition={{ duration: 0.3 }}
                >
                    <p>{successMsg}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

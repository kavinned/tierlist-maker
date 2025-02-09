import * as motion from "framer-motion/client";
import TierList from "./(components)/TierList";

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative"
        >
            <TierList />
        </motion.div>
    );
}

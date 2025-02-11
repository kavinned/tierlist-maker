import * as motion from "framer-motion/client";

export default function Overlay({ children, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="expanded-image-overlay"
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}

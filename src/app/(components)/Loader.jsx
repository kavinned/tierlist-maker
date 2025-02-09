import { useEffect } from "react";

export default function Loader() {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 max-w-screen min-h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-[9999]">
            <div className="loader"></div>
        </div>
    );
}

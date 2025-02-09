import { Share2 } from "lucide-react";
import { ClipboardCopyIcon } from "lucide-react";

export default function CopyLink({ handleCopyToClipboard }) {
    return (
        <p className="fixed bottom-4 right-4 text-sm flex text-center mt-3 bg-[#323638] rounded-md p-2 border border-white items-center justify-cente w-fit opacity-70 hover:opacity-100 transition-all duration-100 ease-in-out">
            <Share2 className="w-4 h-4 stroke-white fill-blue-400" />
            <span
                className="ml-2 cursor-pointer border-rid border p-1 rounded bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.6)]"
                onClick={handleCopyToClipboard}
            >
                <ClipboardCopyIcon className="w-4 h-4 text-gray-900" />
            </span>
        </p>
    );
}

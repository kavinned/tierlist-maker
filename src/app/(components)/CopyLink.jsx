import { Share2 } from "lucide-react";
import { ClipboardCopyIcon } from "lucide-react";

export default function CopyLink({ handleCopyToClipboard }) {
    return (
        <div
            className="fixed bottom-4 right-4 text-sm flex text-center mt-3 bg-[#323638] rounded-md p-2 border border-white items-center justify-center w-[5rem] opacity-70 hover:opacity-100 transition-all duration-150 ease-in-out"
            title="Share Link"
        >
            <div className="copy-button-container">
                <Share2 className="w-4 h-4 stroke-white fill-blue-400" />
                <span className="copy-button" onClick={handleCopyToClipboard}>
                    <ClipboardCopyIcon className="w-4 h-4 text-gray-900" />
                    <div className="tooltip">Copy link</div>
                </span>
            </div>
        </div>
    );
}

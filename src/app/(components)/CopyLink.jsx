import { ClipboardCopyIcon } from "lucide-react";

export default function CopyLink({ url, handleCopyToClipboard }) {
    return (
        <p className="flex text-center mt-3 bg-[#323638] rounded-md p-3 border border-white items-center justify-center">
            Share URL: {url}
            <span
                className="ml-2 cursor-pointer border-rid border p-1 rounded bg-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.6)]"
                onClick={handleCopyToClipboard}
            >
                <ClipboardCopyIcon className="w-4 h-4 text-gray-900" />
            </span>
        </p>
    );
}

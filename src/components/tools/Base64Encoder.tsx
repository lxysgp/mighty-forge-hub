import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, ArrowUpDown } from "lucide-react";

export const Base64Encoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { toast } = useToast();

  const encodeBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      toast({
        title: "Success",
        description: "Text encoded to Base64!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text.",
        variant: "destructive",
      });
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      toast({
        title: "Success",
        description: "Base64 decoded to text!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 input.",
        variant: "destructive",
      });
    }
  };

  const process = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to process.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "encode") {
      encodeBase64();
    } else {
      decodeBase64();
    }
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Output copied to clipboard.",
      });
    }
  };

  const swapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">
          Base64 {mode === "encode" ? "Encoder" : "Decoder"}
        </h4>
        <Button onClick={swapMode} variant="outline" size="sm">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Switch to {mode === "encode" ? "Decode" : "Encode"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {mode === "encode" ? "Plain Text:" : "Base64 Input:"}
          </label>
          <Textarea
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px] bg-secondary/50 font-mono text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {mode === "encode" ? "Base64 Output:" : "Decoded Text:"}
            </label>
            {output && (
              <Button variant="ghost" size="sm" onClick={copyOutput}>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <Textarea
            placeholder="Output will appear here..."
            value={output}
            readOnly
            className="min-h-[150px] bg-secondary/30 font-mono text-sm"
          />
        </div>
      </div>
      
      <Button onClick={process} className="w-full" size="lg">
        {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
      </Button>
    </div>
  );
};
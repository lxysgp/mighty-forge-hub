import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";

export const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast({
        title: "Success",
        description: "JSON formatted successfully!",
      });
    } catch (error) {
      setIsValid(false);
      setOutput("");
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax.",
        variant: "destructive",
      });
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast({
        title: "Success",
        description: "JSON minified successfully!",
      });
    } catch (error) {
      setIsValid(false);
      setOutput("");
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input JSON:</label>
          <Textarea
            placeholder='{"key": "value"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] bg-secondary/50 border-border/50 focus:border-primary/50 font-mono text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Output:</label>
            {output && (
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="text-xs"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </div>
          <Textarea
            placeholder="Formatted JSON will appear here..."
            value={output}
            readOnly
            className={`min-h-[200px] font-mono text-sm ${
              isValid === true 
                ? "bg-success/10 border-success/50" 
                : isValid === false 
                ? "bg-destructive/10 border-destructive/50"
                : "bg-secondary/50 border-border/50"
            }`}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={formatJson} variant="default">
          Format & Validate
        </Button>
        <Button onClick={minifyJson} variant="secondary">
          Minify
        </Button>
      </div>
    </div>
  );
};
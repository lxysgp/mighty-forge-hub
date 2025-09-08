import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Simple hash functions (for demo purposes - in production use a proper crypto library)
  const generateMD5 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    // Note: MD5 is not available in crypto.subtle, this is a placeholder
    return "MD5 requires external library";
  };

  const generateSHA256 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateSHA1 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateHashes = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to hash.",
        variant: "destructive",
      });
      return;
    }

    try {
      const [sha256, sha1] = await Promise.all([
        generateSHA256(input),
        generateSHA1(input),
      ]);

      setHashes({
        SHA256: sha256,
        SHA1: sha1,
        MD5: "Use crypto-js library for MD5",
      });

      toast({
        title: "Success",
        description: "Hashes generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hashes.",
        variant: "destructive",
      });
    }
  };

  const copyHash = async (hash: string) => {
    await navigator.clipboard.writeText(hash);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <Textarea
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px] bg-secondary/50"
        />
        <Button onClick={generateHashes} className="w-full">
          Generate Hashes
        </Button>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          <Label>Generated Hashes</Label>
          {Object.entries(hashes).map(([algorithm, hash]) => (
            <div key={algorithm} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {algorithm}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyHash(hash)}
                  className="text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
              <Input
                value={hash}
                readOnly
                className="font-mono text-xs bg-secondary/30"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
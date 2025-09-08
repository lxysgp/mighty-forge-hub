import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy } from "lucide-react";

export const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const { toast } = useToast();

  const generateQR = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text or URL to generate QR code.",
        variant: "destructive",
      });
      return;
    }
    
    // Using QR Server API (free service)
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`;
    setQrUrl(url);
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qrcode.png";
    link.click();
    
    toast({
      title: "Downloaded!",
      description: "QR code saved to downloads.",
    });
  };

  const copyQRUrl = async () => {
    if (qrUrl) {
      await navigator.clipboard.writeText(qrUrl);
      toast({
        title: "Copied!",
        description: "QR code URL copied to clipboard.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="qr-text">Text or URL</Label>
        <div className="flex gap-2">
          <Input
            id="qr-text"
            placeholder="Enter text, URL, or data..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-secondary/50"
            onKeyDown={(e) => e.key === "Enter" && generateQR()}
          />
          <Button onClick={generateQR}>Generate</Button>
        </div>
      </div>

      {qrUrl && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-lg">
              <img 
                src={qrUrl} 
                alt="Generated QR Code" 
                className="w-[300px] h-[300px] object-contain"
              />
            </div>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button onClick={downloadQR} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={copyQRUrl} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy URL
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
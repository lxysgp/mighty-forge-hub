import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolCard } from "@/components/ToolCard";
import { TextAnalyzer } from "@/components/tools/TextAnalyzer";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { QRGenerator } from "@/components/tools/QRGenerator";
import { HashGenerator } from "@/components/tools/HashGenerator";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { 
  FileText, 
  Braces, 
  Shield, 
  QrCode, 
  Hash, 
  Binary,
  Zap
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">PowerTools Suite</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Developer Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A collection of powerful utilities for developers, designers, and power users. 
            Fast, secure, and runs entirely in your browser.
          </p>
        </div>
      </div>

      {/* Tools Section */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-secondary/50 p-1">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2">
              <Braces className="w-4 h-4" />
              <span className="hidden sm:inline">JSON</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Password</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">QR Code</span>
            </TabsTrigger>
            <TabsTrigger value="hash" className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span className="hidden sm:inline">Hash</span>
            </TabsTrigger>
            <TabsTrigger value="base64" className="flex items-center gap-2">
              <Binary className="w-4 h-4" />
              <span className="hidden sm:inline">Base64</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="animate-fade-in">
            <ToolCard
              title="Text Analyzer"
              description="Analyze text for word count, reading time, and readability metrics"
              icon={<FileText className="w-5 h-5" />}
            >
              <TextAnalyzer />
            </ToolCard>
          </TabsContent>

          <TabsContent value="json" className="animate-fade-in">
            <ToolCard
              title="JSON Formatter"
              description="Format, minify, and validate JSON data with syntax highlighting"
              icon={<Braces className="w-5 h-5" />}
            >
              <JsonFormatter />
            </ToolCard>
          </TabsContent>

          <TabsContent value="password" className="animate-fade-in">
            <ToolCard
              title="Password Generator"
              description="Generate secure passwords with customizable length and character sets"
              icon={<Shield className="w-5 h-5" />}
            >
              <PasswordGenerator />
            </ToolCard>
          </TabsContent>

          <TabsContent value="qr" className="animate-fade-in">
            <ToolCard
              title="QR Code Generator"
              description="Create QR codes for URLs, text, or any data with download options"
              icon={<QrCode className="w-5 h-5" />}
            >
              <QRGenerator />
            </ToolCard>
          </TabsContent>

          <TabsContent value="hash" className="animate-fade-in">
            <ToolCard
              title="Hash Generator"
              description="Generate SHA-256, SHA-1, and other cryptographic hashes"
              icon={<Hash className="w-5 h-5" />}
            >
              <HashGenerator />
            </ToolCard>
          </TabsContent>

          <TabsContent value="base64" className="animate-fade-in">
            <ToolCard
              title="Base64 Encoder/Decoder"
              description="Encode and decode text to/from Base64 format"
              icon={<Binary className="w-5 h-5" />}
            >
              <Base64Encoder />
            </ToolCard>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/20">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-semibold">PowerTools</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS. All tools run locally in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
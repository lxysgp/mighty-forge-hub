import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const TextAnalyzer = () => {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200), // 200 words per minute
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter your text here to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px] bg-secondary/50 border-border/50 focus:border-primary/50"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="p-4 bg-secondary/30 border-border/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
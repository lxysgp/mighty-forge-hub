import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";

export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = "";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type.",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyPassword = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard.",
      });
    }
  };

  const getStrengthColor = () => {
    const score = length[0] + (Object.values(options).filter(Boolean).length * 2);
    if (score < 12) return "text-destructive";
    if (score < 18) return "text-warning";
    return "text-success";
  };

  const getStrengthText = () => {
    const score = length[0] + (Object.values(options).filter(Boolean).length * 2);
    if (score < 12) return "Weak";
    if (score < 18) return "Medium";
    return "Strong";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Password Length: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(options).map(([key, checked]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={checked}
                onCheckedChange={(checked) =>
                  setOptions(prev => ({ ...prev, [key]: !!checked }))
                }
              />
              <Label htmlFor={key} className="capitalize text-sm">
                {key === "uppercase" && "A-Z"}
                {key === "lowercase" && "a-z"}
                {key === "numbers" && "0-9"}
                {key === "symbols" && "!@#$%"}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Generated Password</Label>
          <span className={`text-sm font-medium ${getStrengthColor()}`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="flex gap-2">
          <Input
            value={password}
            readOnly
            placeholder="Click generate to create password"
            className="font-mono bg-secondary/50"
          />
          <Button onClick={copyPassword} variant="outline" size="icon" disabled={!password}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Button onClick={generatePassword} className="w-full" size="lg">
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate Password
      </Button>
    </div>
  );
};
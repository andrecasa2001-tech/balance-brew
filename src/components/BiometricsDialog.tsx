import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSettings, saveSettings, Biometrics } from '@/lib/storage';
import { User } from 'lucide-react';
import { toast } from 'sonner';

export const BiometricsDialog = () => {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | 'other'>('male');
  const [waterPerDrink, setWaterPerDrink] = useState('250');

  useEffect(() => {
    if (open) {
      const settings = getSettings();
      setWaterPerDrink(settings.waterPerDrinkMl.toString());
      if (settings.biometrics) {
        setWeight(settings.biometrics.weight.toString());
        setHeight(settings.biometrics.height.toString());
        setSex(settings.biometrics.sex);
      }
    }
  }, [open]);

  const handleSave = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const waterPerDrinkNum = parseFloat(waterPerDrink);

    if (isNaN(waterPerDrinkNum) || waterPerDrinkNum <= 0) {
      toast.error('Please enter valid water per drink amount');
      return;
    }

    const biometrics: Biometrics | undefined = 
      weight && height && !isNaN(weightNum) && !isNaN(heightNum)
        ? { weight: weightNum, height: heightNum, sex }
        : undefined;

    saveSettings({
      waterPerDrinkMl: waterPerDrinkNum,
      biometrics,
    });

    toast.success('Settings saved successfully');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Personal Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="water-per-drink">Water per drink (ml)</Label>
            <Input
              id="water-per-drink"
              type="number"
              value={waterPerDrink}
              onChange={(e) => setWaterPerDrink(e.target.value)}
              placeholder="250"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended extra water intake per alcoholic drink
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-medium mb-3">Biometrics (Optional)</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Used for personalized hydration recommendations
            </p>

            <div className="space-y-3">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                />
              </div>

              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                />
              </div>

              <div>
                <Label htmlFor="sex">Sex</Label>
                <Select value={sex} onValueChange={(v) => setSex(v as any)}>
                  <SelectTrigger id="sex">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Droplets, Plus } from 'lucide-react';
import { getWaterEntries, updateDailyWater, getDrinkEntries, getSettings } from '@/lib/storage';
import { formatDate } from '@/lib/dateUtils';
import { toast } from 'sonner';

interface WaterTrackerProps {
  selectedDate: Date;
  onWaterUpdated: () => void;
}

export const WaterTracker = ({ selectedDate, onWaterUpdated }: WaterTrackerProps) => {
  const [customAmount, setCustomAmount] = useState('');
  const [totalWater, setTotalWater] = useState(0);

  useEffect(() => {
    updateTotalWater();
  }, [selectedDate]);

  const updateTotalWater = () => {
    const dateStr = formatDate(selectedDate);
    const waterEntries = getWaterEntries().filter(e => e.date === dateStr);
    const total = waterEntries.reduce((sum, e) => sum + e.amount, 0);
    setTotalWater(total);
  };

  const addWater = (amount: number) => {
    const newTotal = totalWater + amount;
    updateDailyWater(formatDate(selectedDate), newTotal);
    toast.success(`Added ${amount}ml water`);
    updateTotalWater();
    onWaterUpdated();
  };

  const addCustomAmount = () => {
    const amount = parseInt(customAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    addWater(amount);
    setCustomAmount('');
  };

  const getRecommendedWater = () => {
    const dateStr = formatDate(selectedDate);
    const drinkEntries = getDrinkEntries().filter(e => e.date === dateStr);
    const settings = getSettings();
    return drinkEntries.length * settings.waterPerDrinkMl;
  };

  const recommendedWater = getRecommendedWater();
  const percentage = recommendedWater > 0 ? Math.min((totalWater / recommendedWater) * 100, 100) : 0;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-primary rounded-full">
            <Droplets className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Water Intake</h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(selectedDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-4xl font-bold text-primary">{totalWater}</p>
            <p className="text-sm text-muted-foreground">ml consumed</p>
          </div>
          {recommendedWater > 0 && (
            <div className="text-right">
              <p className="text-2xl font-semibold text-muted-foreground">{recommendedWater}</p>
              <p className="text-sm text-muted-foreground">ml target</p>
            </div>
          )}
        </div>

        {recommendedWater > 0 && (
          <div className="space-y-2">
            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-chart-1 h-full transition-all duration-500 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {percentage.toFixed(0)}% of recommended intake
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Quick Add</p>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" onClick={() => addWater(250)} className="flex-col h-auto py-3">
            <Plus className="h-4 w-4 mb-1" />
            <span className="text-lg font-semibold">250ml</span>
          </Button>
          <Button variant="outline" onClick={() => addWater(500)} className="flex-col h-auto py-3">
            <Plus className="h-4 w-4 mb-1" />
            <span className="text-lg font-semibold">500ml</span>
          </Button>
          <Button variant="outline" onClick={() => addWater(1000)} className="flex-col h-auto py-3">
            <Plus className="h-4 w-4 mb-1" />
            <span className="text-lg font-semibold">1L</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomAmount()}
          />
          <Button onClick={addCustomAmount}>Add</Button>
        </div>
      </div>
    </Card>
  );
};

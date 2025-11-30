import { Card } from '@/components/ui/card';
import { getDrinkEntries, getWaterEntries, getSettings } from '@/lib/storage';
import { getWeekDates, formatDate } from '@/lib/dateUtils';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

interface WeeklyStatsProps {
  currentWeek: Date;
}

export const WeeklyStats = ({ currentWeek }: WeeklyStatsProps) => {
  const weekDates = getWeekDates(currentWeek);
  const drinkEntries = getDrinkEntries();
  const waterEntries = getWaterEntries();
  const settings = getSettings();

  const weeklyDrinks = drinkEntries.filter(d => 
    weekDates.some(date => formatDate(date) === d.date)
  );

  const weeklyWater = waterEntries.filter(w => 
    weekDates.some(date => formatDate(date) === w.date)
  );

  const totalUnits = weeklyDrinks.reduce((sum, d) => sum + d.units, 0);
  const totalWater = weeklyWater.reduce((sum, w) => sum + w.amount, 0);
  const recommendedWater = weeklyDrinks.length * settings.waterPerDrinkMl;
  const hydrationPercentage = recommendedWater > 0 
    ? Math.round((totalWater / recommendedWater) * 100) 
    : 0;

  const avgUnitsPerDay = totalUnits / 7;
  const daysWithDrinks = new Set(weeklyDrinks.map(d => d.date)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 space-y-3 bg-gradient-accent">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-accent/20 rounded-lg">
            <BarChart3 className="h-5 w-5 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground">This Week</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-accent">{totalUnits.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">Total Units</p>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Avg: {avgUnitsPerDay.toFixed(1)} units/day
          </p>
        </div>
      </Card>

      <Card className="p-6 space-y-3 bg-gradient-primary">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Hydration</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">{(totalWater / 1000).toFixed(1)}L</p>
          <p className="text-sm text-muted-foreground">Total Water</p>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {hydrationPercentage}% of recommended
          </p>
        </div>
      </Card>

      <Card className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-secondary rounded-lg">
            <TrendingUp className="h-5 w-5 text-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Activity</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{daysWithDrinks}</p>
          <p className="text-sm text-muted-foreground">Days with drinks</p>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {weeklyDrinks.length} total drinks logged
          </p>
        </div>
      </Card>
    </div>
  );
};

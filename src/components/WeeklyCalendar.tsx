import { useState } from 'react';
import { getWeekDates, formatDate, formatDisplayDate, isToday } from '@/lib/dateUtils';
import { getDrinkEntries, getWaterEntries, getSettings } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Droplets, Wine } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeeklyCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export const WeeklyCalendar = ({ onDateSelect, selectedDate }: WeeklyCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekDates = getWeekDates(currentWeek);
  const drinkEntries = getDrinkEntries();
  const waterEntries = getWaterEntries();
  const settings = getSettings();

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
    onDateSelect(new Date());
  };

  const getDailyStats = (date: Date) => {
    const dateStr = formatDate(date);
    const drinks = drinkEntries.filter(e => e.date === dateStr);
    const water = waterEntries.filter(e => e.date === dateStr);
    
    const totalUnits = drinks.reduce((sum, d) => sum + d.units, 0);
    const totalWater = water.reduce((sum, w) => sum + w.amount, 0);
    const recommendedWater = drinks.length * settings.waterPerDrinkMl;
    
    return { totalUnits, totalWater, recommendedWater, drinkCount: drinks.length };
  };

  const weekStart = formatDisplayDate(weekDates[0]);
  const weekEnd = formatDisplayDate(weekDates[6]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Weekly View</h2>
          <p className="text-sm text-muted-foreground">
            {weekStart} - {weekEnd}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {weekDates.map((date) => {
          const dateStr = formatDate(date);
          const isSelected = formatDate(selectedDate) === dateStr;
          const isTodayDate = isToday(date);
          const stats = getDailyStats(date);

          return (
            <Card
              key={dateStr}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary",
                isTodayDate && "bg-gradient-primary"
              )}
              onClick={() => onDateSelect(date)}
            >
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={cn(
                    "text-2xl font-bold",
                    isTodayDate && "text-primary"
                  )}>
                    {date.getDate()}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Wine className="h-4 w-4 text-accent" />
                    <span className="font-medium">{stats.totalUnits.toFixed(1)}</span>
                    <span className="text-muted-foreground text-xs">units</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span className="font-medium">{stats.totalWater}</span>
                    <span className="text-muted-foreground text-xs">ml</span>
                  </div>

                  {stats.drinkCount > 0 && (
                    <div className="pt-1 border-t border-border">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target:</span>
                        <span className={cn(
                          "font-medium",
                          stats.totalWater >= stats.recommendedWater 
                            ? "text-primary" 
                            : "text-accent"
                        )}>
                          {stats.recommendedWater}ml
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

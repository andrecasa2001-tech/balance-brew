import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDrinkEntries, deleteDrinkEntry } from '@/lib/storage';
import { formatDate, formatDisplayDate } from '@/lib/dateUtils';
import { Wine, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DailyLogProps {
  selectedDate: Date;
  onUpdate: () => void;
}

export const DailyLog = ({ selectedDate, onUpdate }: DailyLogProps) => {
  const dateStr = formatDate(selectedDate);
  const drinks = getDrinkEntries().filter(e => e.date === dateStr);
  const totalUnits = drinks.reduce((sum, d) => sum + d.units, 0);

  const handleDelete = (id: string, name: string) => {
    deleteDrinkEntry(id);
    toast.success(`Removed ${name}`);
    onUpdate();
  };

  if (drinks.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Wine className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
        <p className="text-muted-foreground">No drinks logged for this day</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold">Daily Log</h3>
          <p className="text-sm text-muted-foreground">{formatDisplayDate(selectedDate)}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-accent">{totalUnits.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">total units</p>
        </div>
      </div>

      <div className="space-y-2">
        {drinks.map((drink) => (
          <div
            key={drink.id}
            className="flex items-center justify-between p-3 rounded-lg bg-gradient-accent hover:bg-accent/20 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium">{drink.drinkName}</p>
              <p className="text-xs text-muted-foreground">
                {drink.volumeMl}ml • {drink.abv}% ABV
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-lg font-bold text-accent">{drink.units.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">units</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(drink.id, drink.drinkName)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

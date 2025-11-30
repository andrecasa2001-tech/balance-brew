import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { drinkDatabase, getCustomDrinks, calculateUnits, getCategoryLabel, Drink } from '@/lib/drinkDatabase';
import { saveDrinkEntry, saveCustomDrink } from '@/lib/storage';
import { formatDate } from '@/lib/dateUtils';
import { Plus, Search, Wine, Beer, Martini, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AddDrinkDialogProps {
  selectedDate: Date;
  onDrinkAdded: () => void;
}

export const AddDrinkDialog = ({ selectedDate, onDrinkAdded }: AddDrinkDialogProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [customName, setCustomName] = useState('');
  const [customVolume, setCustomVolume] = useState('');
  const [customAbv, setCustomAbv] = useState('');

  const allDrinks = [...drinkDatabase, ...getCustomDrinks()];
  const filteredDrinks = allDrinks.filter(drink =>
    drink.name.toLowerCase().includes(search.toLowerCase()) ||
    drink.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const addDrink = (drink: Drink) => {
    const units = calculateUnits(drink.volumeMl, drink.abv);
    const entry = {
      id: `drink-${Date.now()}-${Math.random()}`,
      drinkId: drink.id,
      drinkName: drink.name,
      volumeMl: drink.volumeMl,
      abv: drink.abv,
      units,
      date: formatDate(selectedDate),
      timestamp: Date.now(),
    };
    
    saveDrinkEntry(entry);
    toast.success(`Added ${drink.name}`, {
      description: `${units.toFixed(1)} units added to ${formatDate(selectedDate)}`,
    });
    onDrinkAdded();
    setOpen(false);
    setSearch('');
  };

  const createCustomDrink = () => {
    if (!customName || !customVolume || !customAbv) {
      toast.error('Please fill in all fields');
      return;
    }

    const volume = parseFloat(customVolume);
    const abv = parseFloat(customAbv);

    if (isNaN(volume) || isNaN(abv) || volume <= 0 || abv <= 0 || abv > 100) {
      toast.error('Please enter valid numbers');
      return;
    }

    const customDrink: Drink = {
      id: `custom-${Date.now()}`,
      name: customName,
      category: 'custom',
      volumeMl: volume,
      abv: abv,
    };

    saveCustomDrink(customDrink);
    addDrink(customDrink);
    
    setCustomName('');
    setCustomVolume('');
    setCustomAbv('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beer': return <Beer className="h-4 w-4" />;
      case 'wine': return <Wine className="h-4 w-4" />;
      case 'cocktail': return <Martini className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const groupedDrinks = filteredDrinks.reduce((acc, drink) => {
    const category = drink.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(drink);
    return acc;
  }, {} as Record<Drink['category'], Drink[]>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Drink
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Drink</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="database" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="database">Drink Database</TabsTrigger>
            <TabsTrigger value="custom">Custom Drink</TabsTrigger>
          </TabsList>
          
          <TabsContent value="database" className="space-y-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drinks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-6">
              {Object.entries(groupedDrinks).map(([category, drinks]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {getCategoryLabel(category as Drink['category'])}
                  </h3>
                  <div className="grid gap-2">
                    {drinks.map((drink) => {
                      const units = calculateUnits(drink.volumeMl, drink.abv);
                      return (
                        <Card
                          key={drink.id}
                          className={cn(
                            "p-3 cursor-pointer hover:bg-accent/50 transition-colors",
                            "flex items-center justify-between"
                          )}
                          onClick={() => addDrink(drink)}
                        >
                          <div>
                            <p className="font-medium">{drink.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {drink.volumeMl}ml • {drink.abv}% ABV
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-accent">
                              {units.toFixed(1)}
                            </p>
                            <p className="text-xs text-muted-foreground">units</p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-name">Drink Name</Label>
                <Input
                  id="custom-name"
                  placeholder="e.g., Homemade Sangria"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="custom-volume">Volume (ml)</Label>
                <Input
                  id="custom-volume"
                  type="number"
                  placeholder="e.g., 250"
                  value={customVolume}
                  onChange={(e) => setCustomVolume(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="custom-abv">ABV (%)</Label>
                <Input
                  id="custom-abv"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 5.0"
                  value={customAbv}
                  onChange={(e) => setCustomAbv(e.target.value)}
                />
              </div>

              {customVolume && customAbv && (
                <Card className="p-4 bg-gradient-accent">
                  <p className="text-sm text-muted-foreground mb-1">Calculated Units:</p>
                  <p className="text-3xl font-bold text-accent">
                    {calculateUnits(parseFloat(customVolume), parseFloat(customAbv)).toFixed(2)}
                  </p>
                </Card>
              )}

              <Button onClick={createCustomDrink} className="w-full">
                Create & Add Drink
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

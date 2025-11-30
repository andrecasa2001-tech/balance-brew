import { useState } from 'react';
import { WeeklyCalendar } from '@/components/WeeklyCalendar';
import { AddDrinkDialog } from '@/components/AddDrinkDialog';
import { WaterTracker } from '@/components/WaterTracker';
import { DailyLog } from '@/components/DailyLog';
import { WeeklyStats } from '@/components/WeeklyStats';
import { RecommendationsCard } from '@/components/RecommendationsCard';
import { BiometricsDialog } from '@/components/BiometricsDialog';
import { Droplets, Wine } from 'lucide-react';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleUpdate = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <Wine className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Hydration & Units Tracker</h1>
                <p className="text-sm text-muted-foreground">Monitor your weekly balance</p>
              </div>
            </div>
            <div className="flex gap-2">
              <BiometricsDialog />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8" key={updateTrigger}>
        <WeeklyStats currentWeek={selectedDate} />
        
        <WeeklyCalendar 
          selectedDate={selectedDate} 
          onDateSelect={setSelectedDate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Today's Activity</h2>
              <AddDrinkDialog 
                selectedDate={selectedDate} 
                onDrinkAdded={handleUpdate}
              />
            </div>
            <DailyLog selectedDate={selectedDate} onUpdate={handleUpdate} />
          </div>

          <div className="space-y-6">
            <WaterTracker 
              selectedDate={selectedDate} 
              onWaterUpdated={handleUpdate}
            />
          </div>
        </div>

        <RecommendationsCard />
      </main>
    </div>
  );
};

export default Index;

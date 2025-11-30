import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const RecommendationsCard = () => {
  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-secondary/30">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
          <Info className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold">WHO Alcohol Guidelines</h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              The World Health Organization emphasizes that <strong className="text-foreground">no level of alcohol consumption is safe for health</strong>.
            </p>
            
            <p>
              However, many countries provide guidance suggesting not exceeding:
            </p>
            
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">10-20g of pure alcohol per day</strong> (approximately 1-2 standard drinks)</li>
              <li><strong className="text-foreground">140g per week</strong> for lower risk (approximately 14 units)</li>
              <li>Several alcohol-free days each week</li>
            </ul>

            <p className="pt-2 text-xs border-t border-border mt-4">
              <strong className="text-foreground">Note:</strong> This information is educational only. Individual health circumstances vary. 
              Consult healthcare professionals for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

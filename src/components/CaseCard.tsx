import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CaseItem {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';
  price: number;
}

export interface Case {
  id: string;
  name: string;
  image: string;
  price: number;
  items: CaseItem[];
  discount?: number;
}

interface CaseCardProps {
  caseItem: Case;
  onOpen: (caseId: string) => void;
}

const getRarityClass = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'bg-rare-common text-black';
    case 'uncommon': return 'bg-rare-uncommon text-black';
    case 'rare': return 'bg-rare-rare text-white';
    case 'mythical': return 'bg-rare-mythical text-white';
    case 'legendary': return 'bg-rare-legendary text-black';
    case 'ancient': return 'bg-rare-ancient text-white';
    default: return 'bg-gray-400';
  }
};

const CaseCard: React.FC<CaseCardProps> = ({ caseItem, onOpen }) => {
  const hasDiscount = caseItem.discount && caseItem.discount > 0;
  const discountedPrice = hasDiscount 
    ? (caseItem.price - (caseItem.price * caseItem.discount / 100)).toFixed(2) 
    : caseItem.price.toFixed(2);

  // Sort items by rarity to display most valuable at the top
  const rarityOrder = ['ancient', 'legendary', 'mythical', 'rare', 'uncommon', 'common'];
  const sortedItems = [...caseItem.items]
    .sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity))
    .slice(0, 3); // Only show top 3 items

  return (
    <Card className="overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
      <div className="relative">
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full z-10">
            -{caseItem.discount}%
          </div>
        )}
        <div className="p-4 aspect-square flex items-center justify-center bg-gradient-to-b from-secondary to-background relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
          <img 
            src={caseItem.image || "/placeholder.svg"} 
            alt={caseItem.name} 
            className="w-4/5 h-4/5 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70"></div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{caseItem.name}</h3>
        
        <div className="flex gap-1 mb-3 h-6 overflow-hidden">
          {sortedItems.map((item) => (
            <div 
              key={item.id} 
              className={cn("rounded-sm w-full h-full", getRarityClass(item.rarity))}
              title={item.name}
            ></div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {caseItem.price.toFixed(2)} ₽
              </span>
            )}
            <span className={cn("font-bold", hasDiscount ? "text-destructive" : "")}>
              {discountedPrice} ₽
            </span>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onOpen(caseItem.id)}
            className="bg-primary hover:bg-primary/90"
          >
            Открыть
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CaseCard;

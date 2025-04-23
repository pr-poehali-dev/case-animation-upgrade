import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';
  price: number;
}

interface InventoryItemProps {
  item: Item;
  selected: boolean;
  onSelect: () => void;
}

const getRarityClass = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-rare-common';
    case 'uncommon': return 'border-rare-uncommon';
    case 'rare': return 'border-rare-rare';
    case 'mythical': return 'border-rare-mythical';
    case 'legendary': return 'border-rare-legendary';
    case 'ancient': return 'border-rare-ancient';
    default: return 'border-gray-400';
  }
};

const getRarityTextClass = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'text-rare-common';
    case 'uncommon': return 'text-rare-uncommon';
    case 'rare': return 'text-rare-rare';
    case 'mythical': return 'mythical-text';
    case 'legendary': return 'legendary-text';
    case 'ancient': return 'rare-text';
    default: return 'text-gray-400';
  }
};

const InventoryItem: React.FC<InventoryItemProps> = ({ item, selected, onSelect }) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md relative",
        selected ? "border-primary bg-primary/5" : "border-border bg-card",
        getRarityClass(item.rarity)
      )}
      onClick={onSelect}
    >
      {selected && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
          <CheckIcon className="h-4 w-4" />
        </div>
      )}
      
      <div className="p-4 aspect-square flex items-center justify-center bg-gradient-to-b from-background to-background/50">
        <img 
          src={item.image || "/placeholder.svg"} 
          alt={item.name}
          className="w-4/5 h-4/5 object-contain drop-shadow-md"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{item.name}</h3>
        <p className={cn("text-sm font-semibold", getRarityTextClass(item.rarity))}>
          {item.price.toFixed(2)} ₽
        </p>
      </div>
    </Card>
  );
};

export default InventoryItem;

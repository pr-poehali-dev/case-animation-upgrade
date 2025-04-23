import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Case, CaseItem } from '@/components/CaseCard';
import { cn } from '@/lib/utils';

interface OpenCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: Case | null;
  onItemReceived: (item: CaseItem) => void;
}

const getRarityClass = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-rare-common';
    case 'uncommon': return 'border-rare-uncommon';
    case 'rare': return 'border-rare-rare';
    case 'mythical': return 'border-rare-mythical glow-pulse';
    case 'legendary': return 'border-rare-legendary glow-pulse';
    case 'ancient': return 'border-rare-ancient glow-pulse';
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

const OpenCaseModal: React.FC<OpenCaseModalProps> = ({ isOpen, onClose, caseData, onItemReceived }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CaseItem | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsOpening(false);
      setSelectedItem(null);
      setAnimationComplete(false);
    }
  }, [isOpen]);

  const handleOpenCase = () => {
    if (!caseData || isOpening) return;
    
    setIsOpening(true);
    
    // Simulate case opening animation
    setTimeout(() => {
      // Select random item from case
      const randomIndex = Math.floor(Math.random() * caseData.items.length);
      const item = caseData.items[randomIndex];
      
      setSelectedItem(item);
      
      // Start animation completion
      setTimeout(() => {
        setAnimationComplete(true);
        onItemReceived(item);
      }, 1000);
    }, 2000);
  };

  if (!caseData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{caseData.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-4">
          {!isOpening ? (
            // Case preview
            <div className="mb-6 w-full aspect-square max-w-[200px] flex items-center justify-center">
              <img 
                src={caseData.image || "/placeholder.svg"} 
                alt={caseData.name} 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            // Animation or result
            <div className="mb-6 w-full aspect-square max-w-[200px] flex items-center justify-center">
              {!selectedItem ? (
                // Animation
                <div className="box-spin w-full h-full flex items-center justify-center">
                  <img 
                    src={caseData.image || "/placeholder.svg"} 
                    alt="Opening case" 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                // Result
                <div className={cn(
                  "drop-in w-full h-full p-2 flex items-center justify-center border-2 rounded-md transition-all duration-500",
                  getRarityClass(selectedItem.rarity)
                )}>
                  <img 
                    src={selectedItem.image || "/placeholder.svg"} 
                    alt={selectedItem.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          )}
          
          {selectedItem && animationComplete && (
            <div className="text-center mb-4 w-full">
              <h3 className={cn("font-bold text-xl mb-1", getRarityTextClass(selectedItem.rarity))}>
                {selectedItem.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">
                {selectedItem.price.toFixed(2)} ₽
              </p>
            </div>
          )}
          
          {isOpening && !animationComplete ? (
            <div className="text-center text-lg animate-pulse">
              Открываем кейс...
            </div>
          ) : (
            <Button 
              onClick={animationComplete ? onClose : handleOpenCase}
              className="w-full md:w-auto"
              variant={animationComplete ? "secondary" : "default"}
            >
              {animationComplete ? "Забрать предмет" : `Открыть за ${caseData.price.toFixed(2)} ₽`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenCaseModal;

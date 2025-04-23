import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, RefreshCwIcon } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';
  price: number;
}

const DEMO_ITEMS: Item[] = [
  { id: 'item1', name: 'Glock-18 | Градиент', image: '/placeholder.svg', rarity: 'uncommon', price: 320 },
  { id: 'item2', name: 'P250 | Сверхновая', image: '/placeholder.svg', rarity: 'common', price: 120 },
  { id: 'item3', name: 'USP-S | Неонуар', image: '/placeholder.svg', rarity: 'rare', price: 750 },
  { id: 'item4', name: 'AWP | Зверь', image: '/placeholder.svg', rarity: 'legendary', price: 3800 },
];

const TARGET_ITEMS: Item[] = [
  { id: 'target1', name: 'Desert Eagle | Пламя', image: '/placeholder.svg', rarity: 'mythical', price: 1950 },
  { id: 'target2', name: 'AK-47 | Ягуар', image: '/placeholder.svg', rarity: 'rare', price: 980 },
  { id: 'target3', name: 'M4A4 | Грифон', image: '/placeholder.svg', rarity: 'uncommon', price: 380 },
];

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

const Upgrade = () => {
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [targetItem, setTargetItem] = useState<Item | null>(null);
  const [upgradeChance, setUpgradeChance] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<'success' | 'fail' | null>(null);

  const totalSelectedValue = selectedItems.reduce((sum, item) => sum + item.price, 0);
  
  const toggleSelectItem = (item: Item) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const selectTargetItem = (item: Item) => {
    setTargetItem(item);
    
    // Автоматически настраиваем шанс на успех в зависимости от цен
    if (totalSelectedValue > 0) {
      const ratio = item.price / totalSelectedValue;
      const newChance = Math.min(Math.max(Math.round((1 / ratio) * 100), 5), 90);
      setUpgradeChance(newChance);
    }
  };

  const handleUpgrade = () => {
    if (!targetItem || selectedItems.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    setUpgradeResult(null);
    
    // Симулируем процесс апгрейда
    setTimeout(() => {
      const random = Math.random() * 100;
      const success = random <= upgradeChance;
      
      setUpgradeResult(success ? 'success' : 'fail');
      
      if (success) {
        toast({
          title: "Успешный апгрейд!",
          description: `Вы получили ${targetItem.name}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Апгрейд не удался",
          description: "Вы потеряли выбранные предметы",
          variant: "destructive",
        });
      }
      
      setTimeout(() => {
        setIsAnimating(false);
        
        if (success) {
          // Удаляем выбранные предметы и добавляем полученный
          setSelectedItems([]);
        } else {
          // Просто сбрасываем выбор
          setSelectedItems([]);
        }
      }, 1500);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Апгрейд скинов</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel - Items selection */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Мои предметы</h2>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {DEMO_ITEMS.map(item => (
                <div
                  key={item.id}
                  className={cn(
                    "border rounded-md p-3 flex items-center cursor-pointer transition-all",
                    selectedItems.some(i => i.id === item.id)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-card/80 border-border"
                  )}
                  onClick={() => toggleSelectItem(item)}
                >
                  <div className="w-12 h-12 flex-shrink-0 mr-3">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className={cn("text-sm", getRarityTextClass(item.rarity))}>{item.price.toFixed(2)} ₽</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Выбрано предметов:</span>
                <span>{selectedItems.length}</span>
              </p>
              <p className="flex justify-between font-medium">
                <span>Общая стоимость:</span>
                <span>{totalSelectedValue.toFixed(2)} ₽</span>
              </p>
            </div>
          </Card>
        </div>
        
        {/* Middle panel - Upgrade controls */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Апгрейд</h2>
            
            <div className="flex-grow flex flex-col items-center justify-center py-6">
              {isAnimating ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <RefreshCwIcon className="w-full h-full animate-spin text-primary" />
                  </div>
                  <p className="text-lg animate-pulse">Выполняем апгрейд...</p>
                  
                  {upgradeResult && (
                    <div className={cn(
                      "mt-6 p-3 rounded-md text-center font-bold",
                      upgradeResult === 'success' 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    )}>
                      {upgradeResult === 'success' ? 'УСПЕХ!' : 'НЕУДАЧА!'}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center w-full mb-8">
                    <div className="w-1/3 border border-border rounded-md p-2 h-32 flex items-center justify-center">
                      {selectedItems.length > 0 ? (
                        <div className="text-center">
                          <div className="relative w-16 h-16 mx-auto">
                            {selectedItems.length <= 3 ? (
                              // Показываем до 3 предметов
                              selectedItems.map((item, index) => (
                                <img 
                                  key={item.id}
                                  src={item.image} 
                                  alt={item.name} 
                                  className="absolute w-full h-full object-contain"
                                  style={{ 
                                    transform: `translateX(${index * 4}px) translateY(${index * 4}px)`,
                                    zIndex: selectedItems.length - index 
                                  }}
                                />
                              ))
                            ) : (
                              // Показываем стопку если больше 3 предметов
                              <>
                                <img 
                                  src={selectedItems[0].image} 
                                  alt="Stacked items" 
                                  className="absolute w-full h-full object-contain"
                                />
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                  {selectedItems.length}
                                </div>
                              </>
                            )}
                          </div>
                          <p className="text-sm mt-2">{totalSelectedValue.toFixed(2)} ₽</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center">Выберите предметы для апгрейда</p>
                      )}
                    </div>
                    
                    <div className="w-1/3 flex items-center justify-center">
                      <ArrowRightIcon className="w-10 h-10 text-primary" />
                    </div>
                    
                    <div className="w-1/3 border border-border rounded-md p-2 h-32 flex items-center justify-center">
                      {targetItem ? (
                        <div className="text-center">
                          <img src={targetItem.image} alt={targetItem.name} className="w-16 h-16 mx-auto object-contain" />
                          <p className="text-sm mt-2">{targetItem.price.toFixed(2)} ₽</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center">Выберите предмет для получения</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Шанс успеха:</span>
                      <span className="font-medium">{upgradeChance}%</span>
                    </div>
                    <Slider
                      value={[upgradeChance]}
                      onValueChange={(values) => setUpgradeChance(values[0])}
                      max={90}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </div>
            
            <Button 
              size="lg" 
              onClick={handleUpgrade}
              disabled={!targetItem || selectedItems.length === 0 || isAnimating}
              className="mt-auto"
            >
              Сделать апгрейд
            </Button>
          </Card>
        </div>
        
        {/* Right panel - Target items */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Предметы для получения</h2>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {TARGET_ITEMS.map(item => (
                <div
                  key={item.id}
                  className={cn(
                    "border rounded-md p-3 flex items-center cursor-pointer transition-all",
                    targetItem?.id === item.id
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-card/80 border-border",
                    getRarityClass(item.rarity)
                  )}
                  onClick={() => selectTargetItem(item)}
                >
                  <div className="w-12 h-12 flex-shrink-0 mr-3">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className={cn("text-sm", getRarityTextClass(item.rarity))}>{item.price.toFixed(2)} ₽</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="flex justify-between text-sm text-muted-foreground">
                <span>Чем выше стоимость целевого предмета</span>
                <span>тем ниже шанс успеха</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;

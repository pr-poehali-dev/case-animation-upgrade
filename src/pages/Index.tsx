import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import CaseCard, { Case } from '@/components/CaseCard';
import OpenCaseModal from '@/components/OpenCaseModal';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

// Примеры скинов
const CASES_DATA: Case[] = [
  {
    id: 'case1',
    name: 'Кейс Битвы',
    image: '/placeholder.svg',
    price: 499,
    discount: 15,
    items: [
      { id: 'item1', name: 'AK-47 | Вулкан', image: '/placeholder.svg', rarity: 'ancient', price: 4500 },
      { id: 'item2', name: 'M4A4 | Кибербезопасность', image: '/placeholder.svg', rarity: 'legendary', price: 2700 },
      { id: 'item3', name: 'AWP | Медуза', image: '/placeholder.svg', rarity: 'mythical', price: 1800 },
      { id: 'item4', name: 'USP-S | Неонуар', image: '/placeholder.svg', rarity: 'rare', price: 750 },
      { id: 'item5', name: 'Glock-18 | Градиент', image: '/placeholder.svg', rarity: 'uncommon', price: 320 },
      { id: 'item6', name: 'P250 | Сверхновая', image: '/placeholder.svg', rarity: 'common', price: 120 },
    ]
  },
  {
    id: 'case2',
    name: 'Премиум Кейс',
    image: '/placeholder.svg',
    price: 999,
    items: [
      { id: 'item7', name: 'Керамбит | Градиент', image: '/placeholder.svg', rarity: 'ancient', price: 8500 },
      { id: 'item8', name: 'М9 Штык-нож | Зуб тигра', image: '/placeholder.svg', rarity: 'legendary', price: 5200 },
      { id: 'item9', name: 'Штык-нож | Мраморный градиент', image: '/placeholder.svg', rarity: 'mythical', price: 3500 },
      { id: 'item10', name: 'Складной нож | Кровавая паутина', image: '/placeholder.svg', rarity: 'rare', price: 1500 },
      { id: 'item11', name: 'Нож-бабочка | Волны', image: '/placeholder.svg', rarity: 'rare', price: 1250 },
      { id: 'item12', name: 'Нож с лезвием-крюком | Ночь', image: '/placeholder.svg', rarity: 'uncommon', price: 650 },
    ]
  },
  {
    id: 'case3',
    name: 'Кейс Дракона',
    image: '/placeholder.svg',
    price: 799,
    discount: 10,
    items: [
      { id: 'item13', name: 'Dragon Lore', image: '/placeholder.svg', rarity: 'ancient', price: 12000 },
      { id: 'item14', name: 'AK-47 | Огненный змей', image: '/placeholder.svg', rarity: 'legendary', price: 4200 },
      { id: 'item15', name: 'M4A1-S | Золотая спираль', image: '/placeholder.svg', rarity: 'mythical', price: 2100 },
      { id: 'item16', name: 'P90 | Азимов', image: '/placeholder.svg', rarity: 'rare', price: 890 },
      { id: 'item17', name: 'Glock-18 | Дракон', image: '/placeholder.svg', rarity: 'uncommon', price: 420 },
      { id: 'item18', name: 'Tec-9 | Токсичность', image: '/placeholder.svg', rarity: 'common', price: 180 },
    ]
  },
  {
    id: 'case4',
    name: 'Кейс Охотника',
    image: '/placeholder.svg',
    price: 650,
    items: [
      { id: 'item19', name: 'AWP | Зверь', image: '/placeholder.svg', rarity: 'legendary', price: 3800 },
      { id: 'item20', name: 'Desert Eagle | Пламя', image: '/placeholder.svg', rarity: 'mythical', price: 1950 },
      { id: 'item21', name: 'AK-47 | Ягуар', image: '/placeholder.svg', rarity: 'rare', price: 980 },
      { id: 'item22', name: 'SSG 08 | Кровь в воде', image: '/placeholder.svg', rarity: 'rare', price: 850 },
      { id: 'item23', name: 'M4A4 | Грифон', image: '/placeholder.svg', rarity: 'uncommon', price: 380 },
      { id: 'item24', name: 'Tec-9 | Красный кварц', image: '/placeholder.svg', rarity: 'common', price: 150 },
    ]
  }
];

const Index = () => {
  const { toast } = useToast();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState<Array<{ item: any, date: Date }>>([]);
  
  const handleOpenCase = (caseId: string) => {
    const foundCase = CASES_DATA.find(c => c.id === caseId);
    if (foundCase) {
      setSelectedCase(foundCase);
      setIsModalOpen(true);
    }
  };
  
  const handleItemReceived = (item: any) => {
    setInventory(prev => [...prev, { item, date: new Date() }]);
    toast({
      title: "Поздравляем!",
      description: `Вы получили ${item.name}`,
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <section className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Case Battle</h1>
            <p className="text-muted-foreground">Открывай кейсы, получай скины, улучшай их</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Link to="/inventory">
              <Button variant="outline">Инвентарь</Button>
            </Link>
            <Link to="/upgrade">
              <Button>Апгрейд</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Все кейсы</TabsTrigger>
            <TabsTrigger value="popular">Популярные</TabsTrigger>
            <TabsTrigger value="new">Новые</TabsTrigger>
            <TabsTrigger value="discount">Со скидкой</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {CASES_DATA.map(caseItem => (
                <CaseCard 
                  key={caseItem.id} 
                  caseItem={caseItem} 
                  onOpen={handleOpenCase} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {CASES_DATA.slice(0, 3).map(caseItem => (
                <CaseCard 
                  key={caseItem.id} 
                  caseItem={caseItem} 
                  onOpen={handleOpenCase} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {CASES_DATA.slice(2, 4).map(caseItem => (
                <CaseCard 
                  key={caseItem.id} 
                  caseItem={caseItem} 
                  onOpen={handleOpenCase} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="discount" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {CASES_DATA.filter(c => c.discount).map(caseItem => (
                <CaseCard 
                  key={caseItem.id} 
                  caseItem={caseItem} 
                  onOpen={handleOpenCase} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Separator className="my-8" />

      {inventory.length > 0 && (
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Недавно полученные предметы</h2>
            <Link to="/inventory">
              <Button variant="link">Посмотреть все</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {inventory.slice(0, 5).map((inv, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
                <div className="aspect-square mb-2 flex items-center justify-center">
                  <img src={inv.item.image || "/placeholder.svg"} alt={inv.item.name} className="max-h-full object-contain" />
                </div>
                <h3 className="font-medium truncate">{inv.item.name}</h3>
                <p className="text-sm text-muted-foreground">{inv.item.price.toFixed(2)} ₽</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <OpenCaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        caseData={selectedCase} 
        onItemReceived={handleItemReceived} 
      />
    </div>
  );
};

export default Index;

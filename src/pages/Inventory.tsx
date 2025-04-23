import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { SearchIcon, ArrowUpRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import InventoryItem from '@/components/InventoryItem';

// Демо-данные для инвентаря
const INVENTORY_ITEMS = [
  { id: 'item1', name: 'AK-47 | Вулкан', image: '/placeholder.svg', rarity: 'ancient', price: 4500 },
  { id: 'item2', name: 'M4A4 | Кибербезопасность', image: '/placeholder.svg', rarity: 'legendary', price: 2700 },
  { id: 'item3', name: 'AWP | Медуза', image: '/placeholder.svg', rarity: 'mythical', price: 1800 },
  { id: 'item4', name: 'USP-S | Неонуар', image: '/placeholder.svg', rarity: 'rare', price: 750 },
  { id: 'item5', name: 'Glock-18 | Градиент', image: '/placeholder.svg', rarity: 'uncommon', price: 320 },
  { id: 'item6', name: 'P250 | Сверхновая', image: '/placeholder.svg', rarity: 'common', price: 120 },
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = INVENTORY_ITEMS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const totalSelectedValue = INVENTORY_ITEMS
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Мой инвентарь</h1>
          <p className="text-muted-foreground">Управляйте вашими предметами</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          {selectedItems.length > 0 && (
            <>
              <Button variant="outline" onClick={() => setSelectedItems([])}>
                Отменить выбор
              </Button>
              <Link to="/upgrade">
                <Button className="flex items-center">
                  <span>Апгрейд</span>
                  <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Поиск предметов..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {selectedItems.length > 0 && (
          <div className="hidden md:block text-sm">
            <span className="text-muted-foreground mr-2">Выбрано предметов: {selectedItems.length}</span>
            <span className="font-medium">Стоимость: {totalSelectedValue.toFixed(2)} ₽</span>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Все предметы</TabsTrigger>
          <TabsTrigger value="rare">Редкие</TabsTrigger>
          <TabsTrigger value="common">Обычные</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems.map(item => (
                <InventoryItem
                  key={item.id}
                  item={item}
                  selected={selectedItems.includes(item.id)}
                  onSelect={() => toggleSelectItem(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Предметы не найдены</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rare" className="mt-0">
          {filteredItems.filter(item => ['ancient', 'legendary', 'mythical', 'rare'].includes(item.rarity)).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems
                .filter(item => ['ancient', 'legendary', 'mythical', 'rare'].includes(item.rarity))
                .map(item => (
                  <InventoryItem
                    key={item.id}
                    item={item}
                    selected={selectedItems.includes(item.id)}
                    onSelect={() => toggleSelectItem(item.id)}
                  />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Редкие предметы не найдены</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="common" className="mt-0">
          {filteredItems.filter(item => ['uncommon', 'common'].includes(item.rarity)).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems
                .filter(item => ['uncommon', 'common'].includes(item.rarity))
                .map(item => (
                  <InventoryItem
                    key={item.id}
                    item={item}
                    selected={selectedItems.includes(item.id)}
                    onSelect={() => toggleSelectItem(item.id)}
                  />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Обычные предметы не найдены</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedItems.length > 0 && (
        <div className="md:hidden mt-6 p-4 border border-border rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Выбрано предметов: {selectedItems.length}</p>
              <p className="font-medium">Стоимость: {totalSelectedValue.toFixed(2)} ₽</p>
            </div>
            <Link to="/upgrade">
              <Button size="sm">Апгрейд</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

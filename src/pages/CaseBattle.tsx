import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Case } from '@/components/CaseCard';
import { cn } from '@/lib/utils';

interface Player {
  id: string;
  name: string;
  avatar: string;
  isCurrentUser: boolean;
}

interface BattleCase {
  caseData: Case;
  results: { playerId: string; item: any | null }[];
}

interface Battle {
  id: string;
  name: string;
  createdBy: string;
  players: Player[];
  maxPlayers: number;
  cases: BattleCase[];
  status: 'waiting' | 'in-progress' | 'completed';
  totalValue: number;
  winnerId?: string;
}

const mockCases: Case[] = [
  {
    id: '1',
    name: 'Кейс Дракона',
    price: 899,
    image: '/placeholder.svg',
    items: []
  },
  {
    id: '2',
    name: 'Премиум кейс',
    price: 1299,
    image: '/placeholder.svg',
    items: []
  },
  {
    id: '3',
    name: 'Кейс редкостей',
    price: 499,
    image: '/placeholder.svg',
    items: []
  },
  {
    id: '4',
    name: 'Золотой кейс',
    price: 1999,
    image: '/placeholder.svg',
    items: []
  }
];

const mockBattles: Battle[] = [
  {
    id: '1',
    name: 'Битва Титанов',
    createdBy: 'user1',
    players: [
      { id: 'user1', name: 'DragonSlayer', avatar: '/placeholder.svg', isCurrentUser: true },
      { id: 'user2', name: 'ShadowHunter', avatar: '/placeholder.svg', isCurrentUser: false }
    ],
    maxPlayers: 2,
    cases: [
      { 
        caseData: mockCases[0],
        results: [
          { playerId: 'user1', item: null },
          { playerId: 'user2', item: null }
        ]
      }
    ],
    status: 'waiting',
    totalValue: 1798
  },
  {
    id: '2',
    name: 'Королевская битва',
    createdBy: 'user3',
    players: [
      { id: 'user3', name: 'KingMaker', avatar: '/placeholder.svg', isCurrentUser: false },
      { id: 'user4', name: 'LegendHunter', avatar: '/placeholder.svg', isCurrentUser: false },
      { id: 'user5', name: 'SilentAssassin', avatar: '/placeholder.svg', isCurrentUser: false }
    ],
    maxPlayers: 4,
    cases: [
      { 
        caseData: mockCases[1],
        results: [
          { playerId: 'user3', item: null },
          { playerId: 'user4', item: null },
          { playerId: 'user5', item: null }
        ]
      },
      { 
        caseData: mockCases[2],
        results: [
          { playerId: 'user3', item: null },
          { playerId: 'user4', item: null },
          { playerId: 'user5', item: null }
        ]
      }
    ],
    status: 'waiting',
    totalValue: 5394
  }
];

const CaseBattle: React.FC = () => {
  const [battles, setBattles] = useState<Battle[]>(mockBattles);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newBattleName, setNewBattleName] = useState('');
  const [selectedCases, setSelectedCases] = useState<Case[]>([]);
  const [maxPlayers, setMaxPlayers] = useState(2);

  const handleCreateBattle = () => {
    // Implementation would create a new battle and add it to the battles list
    setIsCreateDialogOpen(false);
    setNewBattleName('');
    setSelectedCases([]);
    setMaxPlayers(2);
  };

  const handleJoinBattle = (battleId: string) => {
    // Implementation would add the current user to the battle
    console.log(`Joining battle: ${battleId}`);
  };

  const toggleCaseSelection = (caseData: Case) => {
    if (selectedCases.some(c => c.id === caseData.id)) {
      setSelectedCases(selectedCases.filter(c => c.id !== caseData.id));
    } else {
      setSelectedCases([...selectedCases, caseData]);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Case Battles</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Создать битву</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
          <TabsTrigger value="all">Все битвы</TabsTrigger>
          <TabsTrigger value="my">Мои битвы</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {battles.map(battle => (
            <Card key={battle.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>{battle.name}</CardTitle>
                  <div className="text-sm font-medium">
                    {battle.players.length}/{battle.maxPlayers} игроков
                  </div>
                </div>
                <CardDescription>Общая стоимость: {battle.totalValue.toFixed(2)} ₽</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Игроки</h4>
                    <div className="flex flex-wrap gap-2">
                      {battle.players.map(player => (
                        <div key={player.id} className={cn(
                          "flex items-center p-2 rounded-md",
                          player.isCurrentUser ? "bg-primary/10" : "bg-card-foreground/5"
                        )}>
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={player.avatar} alt={player.name} />
                            <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{player.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Кейсы</h4>
                    <div className="flex flex-wrap gap-2">
                      {battle.cases.map((battleCase, index) => (
                        <div key={index} className="flex items-center p-2 rounded-md bg-card-foreground/5">
                          <img 
                            src={battleCase.caseData.image} 
                            alt={battleCase.caseData.name} 
                            className="h-8 w-8 mr-2 object-contain"
                          />
                          <span className="text-sm">{battleCase.caseData.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-card-foreground/5 flex justify-between">
                <div className="text-sm">Создатель: {battle.players.find(p => p.id === battle.createdBy)?.name}</div>
                {battle.players.some(p => p.isCurrentUser) ? (
                  <Button variant="outline" disabled>В битве</Button>
                ) : battle.players.length < battle.maxPlayers ? (
                  <Button onClick={() => handleJoinBattle(battle.id)}>Присоединиться</Button>
                ) : (
                  <Button variant="outline" disabled>Заполнено</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="my">
          <div className="text-center py-8 text-muted-foreground">
            Ваши активные битвы будут отображаться здесь
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="text-center py-8 text-muted-foreground">
            История ваших битв будет отображаться здесь
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Создать битву кейсов</DialogTitle>
            <DialogDescription>
              Настройте параметры вашей битвы кейсов
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="battle-name" className="text-sm font-medium block mb-1">
                Название битвы
              </label>
              <Input 
                id="battle-name"
                placeholder="Введите название битвы" 
                value={newBattleName}
                onChange={(e) => setNewBattleName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">
                Максимальное количество игроков
              </label>
              <div className="flex gap-2">
                {[2, 3, 4].map(num => (
                  <Button
                    key={num}
                    variant={maxPlayers === num ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setMaxPlayers(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">
                Выберите кейсы (до 4)
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {mockCases.map(caseData => (
                  <div 
                    key={caseData.id}
                    className={cn(
                      "border rounded-md p-2 flex items-center cursor-pointer transition-colors",
                      selectedCases.some(c => c.id === caseData.id) 
                        ? "bg-primary/10 border-primary" 
                        : "hover:bg-card-foreground/5"
                    )}
                    onClick={() => toggleCaseSelection(caseData)}
                  >
                    <img 
                      src={caseData.image} 
                      alt={caseData.name} 
                      className="h-8 w-8 mr-2 object-contain"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{caseData.name}</div>
                      <div className="text-xs text-muted-foreground">{caseData.price.toFixed(2)} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div className="text-sm">
                Общая стоимость: {selectedCases.reduce((sum, c) => sum + c.price, 0).toFixed(2)} ₽
              </div>
              <Button 
                onClick={handleCreateBattle}
                disabled={!newBattleName || selectedCases.length === 0}
              >
                Создать битву
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseBattle;

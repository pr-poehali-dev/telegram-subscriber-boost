import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [services, setServices] = useState([
    {
      id: 'subscribers',
      icon: 'Users',
      title: 'Подписчики',
      description: 'Живые активные подписчики для вашего канала',
      price: '299',
      features: ['Реальные аккаунты', 'Постепенная накрутка', 'Гарантия качества']
    },
    {
      id: 'reactions',
      icon: 'Heart',
      title: 'Реакции',
      description: 'Эмоциональный отклик на ваши посты',
      price: '99',
      features: ['Все виды реакций', 'Быстрая доставка', 'Органичный вид']
    },
    {
      id: 'votes',
      icon: 'CheckSquare',
      title: 'Голоса',
      description: 'Голоса в опросах для нужного результата',
      price: '149',
      features: ['Любой вариант', 'Безопасно', 'Моментальный старт']
    },
    {
      id: 'views',
      icon: 'Eye',
      title: 'Просмотры',
      description: 'Увеличение охвата публикаций',
      price: '49',
      features: ['До 1М просмотров', 'Статистика в реальном времени', 'Без блокировок']
    },
    {
      id: 'premium',
      icon: 'Crown',
      title: 'Telegram Premium',
      description: 'Премиум-подписчики для статуса',
      price: '499',
      features: ['Премиум аккаунты', 'Высокая активность', 'Эксклюзив']
    },
    {
      id: 'bots',
      icon: 'Bot',
      title: 'Старты Ботов',
      description: 'Запуски вашего бота реальными пользователями',
      price: '199',
      features: ['Живые пользователи', 'Разные команды', 'Аналитика']
    }
  ]);

  const [editingService, setEditingService] = useState<any>(null);

  const handleUpdateService = (index: number) => {
    if (!editingService) return;
    
    const updatedServices = [...services];
    updatedServices[index] = editingService;
    setServices(updatedServices);
    setEditingService(null);
    
    toast({
      title: 'Успешно',
      description: 'Услуга обновлена',
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...editingService.features];
    updatedFeatures[index] = value;
    setEditingService({ ...editingService, features: updatedFeatures });
  };

  const addFeature = () => {
    setEditingService({
      ...editingService,
      features: [...editingService.features, 'Новая характеристика']
    });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = editingService.features.filter((_: any, i: number) => i !== index);
    setEditingService({ ...editingService, features: updatedFeatures });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Settings" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold">Админ-панель</span>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              На сайт
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="prices">Тарифы</TabsTrigger>
            <TabsTrigger value="content">Контент</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Управление услугами</h2>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <Card key={service.id} className="p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => setEditingService({...service})}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <Icon name={service.icon as any} className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{service.title}</h3>
                            <p className="text-sm text-muted-foreground">от {service.price}₽</p>
                          </div>
                        </div>
                        <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                {editingService ? (
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-6">Редактирование услуги</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Название</Label>
                        <Input
                          id="title"
                          value={editingService.title}
                          onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                          id="description"
                          value={editingService.description}
                          onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="price">Цена (₽)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={editingService.price}
                          onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Характеристики</Label>
                          <Button size="sm" variant="outline" onClick={addFeature}>
                            <Icon name="Plus" size={16} className="mr-1" />
                            Добавить
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {editingService.features.map((feature: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                              <Input
                                value={feature}
                                onChange={(e) => handleFeatureChange(idx, e.target.value)}
                              />
                              <Button size="icon" variant="ghost" onClick={() => removeFeature(idx)}>
                                <Icon name="Trash2" size={16} className="text-destructive" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-primary to-secondary"
                          onClick={() => {
                            const index = services.findIndex(s => s.id === editingService.id);
                            handleUpdateService(index);
                          }}
                        >
                          <Icon name="Save" className="mr-2" size={18} />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={() => setEditingService(null)}>
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-12 text-center border-dashed">
                    <Icon name="MousePointer" className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <p className="text-muted-foreground">Выберите услугу для редактирования</p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prices" className="mt-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Управление тарифами</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {['Старт', 'Профи', 'Бизнес'].map((plan, index) => (
                  <Card key={plan} className="p-6 border-border/50">
                    <h3 className="text-xl font-bold mb-4">{plan}</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Цена</Label>
                        <Input defaultValue={index === 0 ? '999' : index === 1 ? '2999' : '9999'} />
                      </div>
                      <div>
                        <Label>Подписчики</Label>
                        <Input defaultValue={index === 0 ? '1000' : index === 1 ? '5000' : '25000'} />
                      </div>
                      <div>
                        <Label>Реакции</Label>
                        <Input defaultValue={index === 0 ? '500' : index === 1 ? '2500' : '10000'} />
                      </div>
                      <Button className="w-full" onClick={() => toast({ title: 'Сохранено', description: `Тариф "${plan}" обновлен` })}>
                        Сохранить
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Контакты</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input id="telegram" defaultValue="@teleboost_support" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="support@teleboost.ru" />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" defaultValue="+7 (999) 123-45-67" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={() => toast({ title: 'Сохранено', description: 'Контакты обновлены' })}>
                    <Icon name="Save" className="mr-2" size={18} />
                    Сохранить контакты
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">SEO настройки</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="seo-title">Заголовок страницы</Label>
                    <Input id="seo-title" defaultValue="TeleBoost - Накрутка подписчиков Telegram" />
                  </div>
                  <div>
                    <Label htmlFor="seo-description">Описание</Label>
                    <Textarea 
                      id="seo-description" 
                      defaultValue="Безопасная накрутка подписчиков, реакций и просмотров для Telegram. Реальные пользователи, гарантия качества."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seo-keywords">Ключевые слова</Label>
                    <Input id="seo-keywords" defaultValue="накрутка telegram, подписчики telegram, реакции telegram" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={() => toast({ title: 'Сохранено', description: 'SEO настройки обновлены' })}>
                    <Icon name="Save" className="mr-2" size={18} />
                    Сохранить SEO
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

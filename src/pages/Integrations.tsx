import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const API_URL = 'https://functions.poehali.dev/109ce3d9-6aaf-4c64-9a44-0c303cad38c3';

const Integrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    api_url: '',
    api_key: '',
    service_type: 'subscribers'
  });

  const serviceTypes = [
    { value: 'subscribers', label: 'Подписчики' },
    { value: 'reactions', label: 'Реакции' },
    { value: 'votes', label: 'Голоса' },
    { value: 'views', label: 'Просмотры' },
    { value: 'premium', label: 'Premium' },
    { value: 'bots', label: 'Боты' }
  ];

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setIntegrations(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить интеграции',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newIntegration.name || !newIntegration.api_url || !newIntegration.api_key) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIntegration)
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'API интеграция добавлена'
        });
        setShowDialog(false);
        setNewIntegration({ name: '', api_url: '', api_key: '', service_type: 'subscribers' });
        loadIntegrations();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать интеграцию',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  const handleToggle = async (id: number, is_active: boolean) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !is_active })
      });

      if (response.ok) {
        toast({
          title: 'Обновлено',
          description: is_active ? 'Интеграция отключена' : 'Интеграция активирована'
        });
        loadIntegrations();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту интеграцию?')) return;

    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        toast({
          title: 'Удалено',
          description: 'Интеграция удалена'
        });
        loadIntegrations();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить интеграцию',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Plug" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold">API Интеграции</span>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/admin'}>
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              Назад
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Управление API интеграциями</h1>
            <p className="text-muted-foreground">Подключите внешние сервисы для автоматического выполнения заказов</p>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <Icon name="Plus" className="mr-2" size={18} />
                Добавить API
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новая API интеграция</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    placeholder="Например: SMMAPI.io"
                    value={newIntegration.name}
                    onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="service">Тип услуги</Label>
                  <Select value={newIntegration.service_type} onValueChange={(value) => setNewIntegration({ ...newIntegration, service_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="api_url">API URL</Label>
                  <Input
                    id="api_url"
                    placeholder="https://api.example.com/order"
                    value={newIntegration.api_url}
                    onChange={(e) => setNewIntegration({ ...newIntegration, api_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="api_key">API Key</Label>
                  <Input
                    id="api_key"
                    type="password"
                    placeholder="Введите API ключ"
                    value={newIntegration.api_key}
                    onChange={(e) => setNewIntegration({ ...newIntegration, api_key: e.target.value })}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={handleCreate} disabled={loading}>
                  {loading ? 'Создание...' : 'Создать интеграцию'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading && integrations.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Loader2" className="animate-spin mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : integrations.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <Icon name="Plug" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-xl font-semibold mb-2">Нет API интеграций</h3>
            <p className="text-muted-foreground mb-6">Добавьте первую интеграцию для автоматизации заказов</p>
            <Button onClick={() => setShowDialog(true)} className="bg-gradient-to-r from-primary to-secondary">
              <Icon name="Plus" className="mr-2" size={18} />
              Добавить API
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id} className="p-6 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <Icon name="Zap" className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{integration.name}</h3>
                      <Badge variant={integration.is_active ? 'default' : 'secondary'} className="mt-1">
                        {serviceTypes.find(s => s.value === integration.service_type)?.label}
                      </Badge>
                    </div>
                  </div>
                  <Switch
                    checked={integration.is_active}
                    onCheckedChange={() => handleToggle(integration.id, integration.is_active)}
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Link" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{integration.api_url}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Key" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground font-mono">{integration.api_key}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{new Date(integration.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDelete(integration.id)}
                >
                  <Icon name="Trash2" className="mr-2" size={16} />
                  Удалить
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Integrations;

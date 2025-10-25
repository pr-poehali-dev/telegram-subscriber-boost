import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const services = [
    {
      id: 'subscribers',
      icon: 'Users',
      title: 'Подписчики',
      description: 'Живые активные подписчики для вашего канала',
      price: 'от 299₽',
      features: ['Реальные аккаунты', 'Постепенная накрутка', 'Гарантия качества']
    },
    {
      id: 'reactions',
      icon: 'Heart',
      title: 'Реакции',
      description: 'Эмоциональный отклик на ваши посты',
      price: 'от 99₽',
      features: ['Все виды реакций', 'Быстрая доставка', 'Органичный вид']
    },
    {
      id: 'votes',
      icon: 'CheckSquare',
      title: 'Голоса',
      description: 'Голоса в опросах для нужного результата',
      price: 'от 149₽',
      features: ['Любой вариант', 'Безопасно', 'Моментальный старт']
    },
    {
      id: 'views',
      icon: 'Eye',
      title: 'Просмотры',
      description: 'Увеличение охвата публикаций',
      price: 'от 49₽',
      features: ['До 1М просмотров', 'Статистика в реальном времени', 'Без блокировок']
    },
    {
      id: 'premium',
      icon: 'Crown',
      title: 'Telegram Premium',
      description: 'Премиум-подписчики для статуса',
      price: 'от 499₽',
      features: ['Премиум аккаунты', 'Высокая активность', 'Эксклюзив']
    },
    {
      id: 'bots',
      icon: 'Bot',
      title: 'Старты Ботов',
      description: 'Запуски вашего бота реальными пользователями',
      price: 'от 199₽',
      features: ['Живые пользователи', 'Разные команды', 'Аналитика']
    }
  ];

  const faqs = [
    {
      question: 'Это безопасно для моего канала?',
      answer: 'Абсолютно. Мы используем только проверенные методы продвижения, которые полностью соответствуют правилам Telegram. Все подписчики — реальные активные пользователи.'
    },
    {
      question: 'Как быстро начнется накрутка?',
      answer: 'Обработка заказа начинается в течение 5-15 минут после оплаты. Скорость накрутки зависит от выбранного тарифа, обычно 100-500 подписчиков в час.'
    },
    {
      question: 'Есть ли гарантия на услуги?',
      answer: 'Да, мы даем гарантию 30 дней на все услуги. Если количество подписчиков уменьшится, мы бесплатно восстановим их.'
    },
    {
      question: 'Какие способы оплаты принимаете?',
      answer: 'Мы принимаем оплату картами Visa/MasterCard, СБП, электронные кошельки (ЮMoney, QIWI), а также криптовалюту.'
    },
    {
      question: 'Можно ли отменить заказ?',
      answer: 'Да, вы можете отменить заказ до начала выполнения. После старта накрутки возврат возможен только за невыполненную часть.'
    }
  ];

  const reviews = [
    {
      name: 'Александр М.',
      rating: 5,
      text: 'Заказывал 5000 подписчиков на канал. Все пришло за 2 дня, качество отличное. Рекомендую!',
      service: 'Подписчики'
    },
    {
      name: 'Екатерина П.',
      rating: 5,
      text: 'Супер сервис! Реакции приходят моментально, выглядят естественно. Буду заказывать еще.',
      service: 'Реакции'
    },
    {
      name: 'Дмитрий К.',
      rating: 5,
      text: 'Накрутил просмотры для рекламного поста. Охват вырос в 10 раз! Цены адекватные.',
      service: 'Просмотры'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold">TeleBoost</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['Услуги', 'Цены', 'Гарантии', 'FAQ', 'Отзывы', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary" onClick={() => window.location.href = '/admin'}>
                Панель
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-scale-in">
            Профессиональное продвижение в Telegram
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            Увеличьте охват<br />вашего канала
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Безопасная накрутка подписчиков, реакций и просмотров для Telegram. 
            Реальные пользователи, гарантия качества, моментальный старт.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg px-8" onClick={() => scrollToSection('услуги')}>
              Выбрать услугу
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">Выберите подходящий вариант для вашего канала</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="p-6 hover:scale-105 transition-transform cursor-pointer border-border/50 bg-card/50 backdrop-blur"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                  <Icon name={service.icon as any} className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="text-3xl font-bold text-primary mb-4">{service.price}</div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="text-primary" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  Заказать
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="цены" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Прозрачные цены</h2>
            <p className="text-xl text-muted-foreground">Без скрытых платежей. Оплата только за результат</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Старт', 'Профи', 'Бизнес'].map((plan, index) => (
              <Card key={plan} className={`p-8 ${index === 1 ? 'border-primary border-2 scale-105' : 'border-border/50'}`}>
                {index === 1 && (
                  <Badge className="mb-4 bg-primary">Популярный</Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan}</h3>
                <div className="text-4xl font-bold mb-6">
                  {index === 0 ? '999₽' : index === 1 ? '2 999₽' : '9 999₽'}
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>{index === 0 ? '1000' : index === 1 ? '5000' : '25000'} подписчиков</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>{index === 0 ? '500' : index === 1 ? '2500' : '10000'} реакций</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Гарантия 30 дней</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Техподдержка 24/7</span>
                  </li>
                </ul>
                <Button className={`w-full ${index === 1 ? 'bg-gradient-to-r from-primary to-secondary' : ''}`} variant={index === 1 ? 'default' : 'outline'}>
                  Выбрать план
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="гарантии" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Гарантии качества</h2>
            <p className="text-xl text-muted-foreground">Мы отвечаем за каждый заказ</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'Shield', title: 'Безопасность', text: 'Никаких блокировок и рисков для вашего канала' },
              { icon: 'Zap', title: 'Скорость', text: 'Начало выполнения в течение 5-15 минут' },
              { icon: 'RefreshCw', title: 'Гарантия', text: 'Бесплатное восстановление в течение 30 дней' },
              { icon: 'HeadphonesIcon', title: 'Поддержка', text: 'Помощь специалистов 24/7 в любое время' }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center border-border/50">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground">Ответы на популярные вопросы клиентов</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-6 bg-card/50">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="отзывы" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Более 10 000 довольных клиентов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 border-border/50 bg-card/50">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={18} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{review.name}</span>
                  <Badge variant="secondary">{review.service}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Связаться с нами</h2>
            <p className="text-xl text-muted-foreground">Ответим на любые вопросы в течение 5 минут</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'Send', title: 'Telegram', value: '@teleboost_support', link: 'https://t.me/teleboost_support' },
              { icon: 'Mail', title: 'Email', value: 'support@teleboost.ru', link: 'mailto:support@teleboost.ru' },
              { icon: 'MessageCircle', title: 'WhatsApp', value: '+7 (999) 123-45-67', link: 'https://wa.me/79991234567' }
            ].map((contact, index) => (
              <Card key={index} className="p-6 text-center border-border/50 hover:border-primary transition-colors cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={contact.icon as any} className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-2">{contact.title}</h3>
                <a href={contact.link} className="text-primary hover:underline">{contact.value}</a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" className="text-white" size={18} />
                </div>
                <span className="font-bold text-lg">TeleBoost</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональное продвижение в Telegram с 2020 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Подписчики</a></li>
                <li><a href="#" className="hover:text-foreground">Реакции</a></li>
                <li><a href="#" className="hover:text-foreground">Просмотры</a></li>
                <li><a href="#" className="hover:text-foreground">Премиум</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">О нас</a></li>
                <li><a href="#" className="hover:text-foreground">Блог</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Документы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Оферта</a></li>
                <li><a href="#" className="hover:text-foreground">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-foreground">Правила использования</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 TeleBoost. Все права защищены</p>
            <div className="flex gap-4">
              {['Youtube', 'Instagram', 'Twitter'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon name={social as any} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
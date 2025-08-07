import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { name: 'Art', count: 1254 },
    { name: 'Photography', count: 892 },
    { name: 'Digital', count: 543 },
    { name: 'Traditional', count: 321 },
    { name: 'Abstract', count: 234 },
    { name: 'Portrait', count: 156 }
  ];

  const tags = [
    'high quality', 'detailed', 'masterpiece', 'colorful', 'monochrome',
    'vintage', 'modern', 'artistic', 'creative', 'unique'
  ];

  const galleryImages = [
    '/img/c460f4d8-d9be-4b20-9720-8d00c0ff7de4.jpg',
    '/img/19853719-5bbf-4bc4-94f4-1801fee65049.jpg',
    '/img/7fe95966-adbb-4438-94af-026fb9584fad.jpg'
  ];

  const mockItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Content ${i + 1}`,
    tags: tags.slice(0, Math.floor(Math.random() * 4) + 2),
    category: categories[Math.floor(Math.random() * categories.length)].name,
    views: Math.floor(Math.random() * 10000) + 100,
    likes: Math.floor(Math.random() * 500) + 10,
    image: galleryImages[i % galleryImages.length]
  }));

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => item.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">Gallery</h1>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-sm font-medium">Главная</Button>
                <Button variant="ghost" className="text-sm font-medium">Галерея</Button>
                <Button variant="ghost" className="text-sm font-medium">Категории</Button>
                <Button variant="ghost" className="text-sm font-medium">Избранное</Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="User" size={16} />
                    Профиль
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Профиль пользователя</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <p>Избранных: {favorites.length}</p>
                    <p>Просмотров: 1,234</p>
                    <Button className="w-full">Cumlist</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Поиск контента..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Icon name="Grid3X3" size={16} />
              <span>Сетка</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Icon name="Heart" size={16} />
              <span>Избранное</span>
            </Button>
          </div>

          {/* Tag Filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Фильтры по тегам:</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
                className="text-gray-600"
              >
                Очистить фильтры
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="favorites">Избранное</TabsTrigger>
            <TabsTrigger value="search">Поиск</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-gray-200">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(item.id)}
                          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
                        >
                          <Icon 
                            name="Heart" 
                            size={16} 
                            className={favorites.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-black">{item.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Icon name="Eye" size={14} />
                          <span>{item.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Heart" size={14} />
                          <span>{item.likes}</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.count} элементов</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.filter(item => favorites.includes(item.id)).map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Icon name="Heart" size={48} className="text-red-500" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-black">{item.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {favorites.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Heart" size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">Добавьте контент в избранное</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <Icon name="Search" size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Расширенный поиск</h2>
              </div>
              
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Input placeholder="Ключевые слова..." />
                  <Input placeholder="Категория..." />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Мин. просмотры" type="number" />
                    <Input placeholder="Мин. лайки" type="number" />
                  </div>
                  <Button className="w-full">
                    <Icon name="Search" size={16} className="mr-2" />
                    Найти
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
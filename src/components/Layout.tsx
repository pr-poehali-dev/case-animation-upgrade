import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PackageIcon, 
  BoxIcon, 
  ArrowUpRightIcon,
  MenuIcon,
  UserIcon,
  HomeIcon,
  LogOutIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { label: 'Главная', icon: <HomeIcon className="h-5 w-5" />, path: '/' },
    { label: 'Инвентарь', icon: <BoxIcon className="h-5 w-5" />, path: '/inventory' },
    { label: 'Апгрейд', icon: <ArrowUpRightIcon className="h-5 w-5" />, path: '/upgrade' },
  ];
  
  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
            isActive(item.path)
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-foreground"
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border py-3 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PackageIcon className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl hidden md:inline-block">Case Battle</span>
            </Link>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center ml-8 space-x-2">
              <NavLinks />
            </nav>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* User profile/login button */}
            <Button variant="outline" className="flex items-center">
              <UserIcon className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline-block">Войти</span>
            </Button>
            
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <PackageIcon className="h-6 w-6 text-primary mr-2" />
              <span className="font-semibold">Case Battle</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Условия использования</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Политика конфиденциальности</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Поддержка</a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            &copy; 2023 Case Battle. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

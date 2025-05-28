
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Compass, Camera, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className='sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4'>
      <div className='flex items-center justify-between'>
        {!isSearchOpen
          ? (
            <>
              <div className='flex items-center'>
                <Button variant='ghost' size='icon' className='mr-2'>
                  <Menu className='h-5 w-5' />
                </Button>
                <h1 className='font-bold text-xl text-travel-dark'>TravelScout</h1>
              </div>
              <div className='flex items-center space-x-2'>
                <Button variant='ghost' size='icon' onClick={toggleSearch}>
                  <Search className='h-5 w-5' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => navigate('/map')}
                >
                  <Compass className='h-5 w-5' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Camera className='h-5 w-5' />
                </Button>
              </div>
            </>
            )
          : (
            <div className='flex items-center w-full'>
              <Input
                className='flex-1 mr-2'
                placeholder='Search places...'
                autoFocus
              />
              <Button variant='outline' onClick={toggleSearch}>
                Cancel
              </Button>
            </div>
            )}
      </div>
    </header>
  );
};

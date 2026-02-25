'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, User, LogOut, House, Sun, Moon, Volume2, VolumeX, Circle, Search } from 'lucide-react';
import { getUserphoto } from '@/utils/auth';
import Image from 'next/image';
import { API_BASE_URL } from '@/config/api';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const userPhoto = getUserphoto();
  const profileMenuRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);


  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  const imageUrl = `${API_BASE_URL}/${userPhoto?.replace(/\\/g, '/')}`;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 w-auto top-1/2 -translate-y-1/2 text-gray-400"
              />
                <input
                  type="text"
                  id="residentSearch"
                  placeholder="Quick Search Resident (e.g. Jones)"
                  className="
                    h-11
                    w-[420px]        /* large width */
                    rounded-2xl
                    bg-gray-100      /* input background */
                    border
                    border-gray-300
                    pl-11
                    pr-4
                    text-sm
                    text-gray-700
                    placeholder-gray-500
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-200
                    hover:bg-gray-200
                    dark:bg-gray-700
                    dark:border-gray-600
                    dark:text-gray-200
                    dark:placeholder-gray-400
                    dark:hover:bg-gray-600
                    dark:focus:bg-gray-800
                    dark:focus:ring-gray-600
                  "
                />
            </div>

          </div>
          <div className="flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Theme toggle button */}
              {mounted && (
                <Button
                  variant="gray"
                  size="icon"
                  aria-label="Toggle theme"
                  className="mr-2"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              )}
              {/* {isLoggedIn ? (
                <> */}
                {/* Sound toggle */}
                <Button
                  variant="gray"
                  onClick={() => setSoundOn(!soundOn)}
                  className="mr-2 text-gray-400 hover:text-gray-600"
                >
                  {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </Button>

                <Link href="/home">
                  <Button
                    variant="gray"
                    className={`mr-2 ${pathname === "/home" ? "!bg-gray-50" : ""}`}
                  >
                    <House size={20} className="mr-2" />
                    Home
                  </Button>
                </Link>

                {/* Alert button */}
                <Button
                  variant="red"
                  className="relative"
                >
                  <Circle
                    size={10}
                    fill="currentColor"
                    className="mr-2 animate-pulse text-red-600"
                  />
                  Alert
                </Button>

              {/* Profile */}
              <div className="relative ml-3" ref={profileMenuRef}>
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center border border-gray-400 border-2 rounded-full px-2 py-1">
                      {userPhoto ? (
                        <Image
                          width="30"
                          height="30"
                          className="rounded-full border-gray-300"
                          src={imageUrl}
                          alt={'Member Photo'}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                          <User size={16} />
                        </div>
                      )}

                      <ChevronDown className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-300" />
                    </div>
                  </button>
                </div>

                {showProfileMenu && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 dark:bg-gray-700 dark:ring-gray-600"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link href="/profile">
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="mr-2 h-4 w-4 text-gray-500 font-bold" />
                        Your Profile
                      </button>
                    </Link>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4 text-gray-500 font-bold" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
              {/* </>
              ) : (
                <>
                  <Link href="/">
                      <Button variant="ghost" className="dark:text-gray-200">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" className="ml-4">
                      Register
                    </Button>
                  </Link>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

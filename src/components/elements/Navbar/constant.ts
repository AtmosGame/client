import { NavRoutesInterface } from './interface'

export const NAV_ROUTES: NavRoutesInterface[] = [
  {
    path: '/',
    name: 'Beranda',
  },
  {
    path: '/home',
    name: 'Home',
  },
  {
    path: '/cart',
    name: 'Cart',
    protected: true,
    role: 'USER',
  },
  {
    path: '/secret-token',
    name: 'Add Secret Token',
    protected: true,
    role: 'ADMIN',
  },
  {
    path: '/allreportedaccount',
    name: 'Reported Account',
    protected: true,
    role: 'ADMIN',
  },
  {
    path: '/verification-list',
    name: 'Verification List',
    protected: true,
    role: 'ADMIN',
  },
  {
    path: '/searchuser',
    name: 'Search User',
  
  },
]

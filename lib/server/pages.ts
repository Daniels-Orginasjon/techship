export interface Pages {
  name: string;
  href: string;
}

export const navPages: Pages[] = [
  { name: 'alle produkter', href: '/allProducts' },
  { name: 'Club', href: '/club' },
  { name: 'Ukens Deals', href: '/ukens-deals' },
  { name: 'Outlet', href: '/outlet' },
  { name: 'Nytt', href: '/nyheter' },
];

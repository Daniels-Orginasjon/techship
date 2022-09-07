export interface Pages {
  name: string;
  href: string;
}

export const navPages: Pages[] = [
  { name: 'Club', href: '/Club' },
  { name: 'Ukens Deals', href: '/ukens-deals' },
  { name: 'Outlett', href: '/Outlett' }, // Skrivefeil!!
  { name: 'Nytt', href: '/nyheter' },
];

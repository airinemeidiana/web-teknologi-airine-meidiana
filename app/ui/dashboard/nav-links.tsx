'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Menghubungkan tautan navigasi dashboard sesuai materi P04
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 transition-colors',
              isActive
                ? 'bg-sky-100 text-blue-600 font-semibold'
                : 'bg-gray-50 text-gray-700 hover:bg-sky-100 hover:text-blue-600',
            )}
          >
            <LinkIcon
              className={clsx(
                'w-6 shrink-0',
                isActive ? 'text-blue-600' : 'text-gray-700',
              )}
            />
            <p
              className={clsx(
                'hidden md:block',
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-700',
              )}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}

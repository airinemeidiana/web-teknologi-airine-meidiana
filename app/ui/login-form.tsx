'use client';

import { useActionState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-gray-900`}>
          Silakan Masuk dengan akun Anda.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-900 placeholder:text-gray-500 bg-white"
                id="email"
                type="email"
                name="email"
                placeholder="Ketikkan alamat email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-900 placeholder:text-gray-500 bg-white"
                id="password"
                type="password"
                name="password"
                placeholder="Ketikkan Kata Sandi"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <Button
          className="mt-4 w-full"
          aria-disabled={isPending}
          disabled={isPending}
        >
          {isPending ? 'Memproses...' : 'Masuk'}{' '}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* Pesan Kesalahan Form */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

        {/* Informasi Akun Demo untuk Dosen / Penguji */}
        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-gray-700">
          <p className="font-semibold text-blue-900 mb-1">Akun Demo</p>
          <div className="space-y-0.5 font-mono text-[11px]">
            <p>
              <span className="font-sans font-medium text-gray-600">Nama:</span> Airine
            </p>
            <p>
              <span className="font-sans font-medium text-gray-600">Email:</span> airine@gmail.com
            </p>
            <p>
              <span className="font-sans font-medium text-gray-600">Password:</span> 123456
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

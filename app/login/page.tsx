import Image from 'next/image';
import LoginForm from '@/app/ui/login-form';
import Footer from '@/app/ui/footer';
import { lusitana } from '@/app/ui/fonts';

export default function LoginPage() {
  return (
    <div className={`${lusitana.className} antialiased`}>
      <main className="flex min-h-screen flex-col p-6 bg-white">
        {/* Header Banner UIA */}
        <div className="flex h-20 shrink-0 items-center rounded-lg bg-blue-500 p-4 md:h-52 md:items-end">
          <Image
            src="/logo/uia-logo.png"
            width={500}
            height={360}
            className="block h-12 w-auto object-contain md:h-32"
            alt="Banner UIA"
            priority
          />
        </div>

        {/* Form Container */}
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20 m-auto mt-4 w-full max-w-lg">
          <LoginForm />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

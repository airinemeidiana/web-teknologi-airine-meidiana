import SideNav from '@/app/ui/dashboard/sidenav';
import Footer from '@/app/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex grow flex-col md:overflow-y-auto">
        <div className="grow p-6 md:p-12">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

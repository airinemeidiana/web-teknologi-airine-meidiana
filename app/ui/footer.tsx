export default function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-5xl border-t border-black bg-gray-50 px-6 py-4 text-xs text-gray-500">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span>NAMA <span className="ml-1 text-sm text-black">[Airine Meidiana]</span></span>
          <span>NIM <span className="ml-1 text-sm text-black">[3420230024]</span></span>
          <span>JURUSAN <span className="ml-1 text-sm text-black">[Informatika]</span></span>
        </div>
        <span>© 2026</span>
      </div>
    </footer>
  );
}

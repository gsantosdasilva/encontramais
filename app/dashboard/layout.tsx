import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  CreditCard,
  BarChart,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/contexts/auth-context';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Perfil', href: '/dashboard/perfil', icon: User },
  { name: 'Assinatura', href: '/dashboard/assinatura', icon: CreditCard },
  { name: 'Estatísticas', href: '/dashboard/estatisticas', icon: BarChart },
  { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">EncontraMais</h1>
        </div>
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
} 
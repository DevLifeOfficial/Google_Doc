import { useState } from "react";
import {
  FileText,
  Share2,
  Clock,
  Trash2,
  Settings,
  HelpCircle,
  PenSquare,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: typeof FileText;
}

// NOTE: "Shared with me", "Recent", and "Trash" don't have routes yet in
// what I've seen of your app — clicking them just highlights for now.
// Wire them up once those pages/queries exist.
const primaryNav: NavItem[] = [
  { label: "My Documents", icon: FileText },
  { label: "Shared with me", icon: Share2 },
  { label: "Recent", icon: Clock },
  { label: "Trash", icon: Trash2 },
];

const secondaryNav: NavItem[] = [
  { label: "Settings", icon: Settings },
  { label: "Help Center", icon: HelpCircle },
];

interface CurrentUser {
  name: string;
  email: string;
}

interface SidebarProps {
  currentUser?: CurrentUser;
}

// NOTE: defaulted currentUser since I don't have your real user-fetching
// logic here — pass the actual signed-in user's name/email in as a prop.
export const Sidebar = ({
  currentUser = { name: "Ram Kumar", email: "ram@example.com" },
}: SidebarProps) => {
  const [active, setActive] = useState("My Documents");

  const renderNavGroup = (items: NavItem[]) =>
    items.map(({ label, icon: Icon }) => {
      const isActive = active === label;

      return (
        <button
          key={label}
          onClick={() => setActive(label)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Icon size={18} />
          {label}
        </button>
      );
    });

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-sidebar lg:flex">
      <div className="flex items-center gap-2 border-b px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <PenSquare size={16} />
        </div>
        <span className="text-lg font-bold tracking-tight">Ajaia</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {renderNavGroup(primaryNav)}
      </nav>

      <div className="space-y-1 border-t px-3 py-4">
        {renderNavGroup(secondaryNav)}
      </div>

      <div className="flex items-center gap-3 border-t px-4 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{currentUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {currentUser.email}
          </p>
        </div>
      </div>
    </aside>
  );
};
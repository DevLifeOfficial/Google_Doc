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
import { Link } from "react-router-dom";
import { FolderSidebar } from "./FolderSideBar";

interface NavItem {
  label: string;
  icon: typeof FileText;
  url: string;
}

const primaryNav: NavItem[] = [
  { label: "My Documents", icon: FileText, url: "/" },
  { label: "Shared with me", icon: Share2, url: "/shared" },
  { label: "Recent", icon: Clock, url: "/recent" },
  { label: "Trash", icon: Trash2, url: "/trash" },
];

const secondaryNav: NavItem[] = [
  { label: "Settings", icon: Settings, url: "/settings" },
  { label: "Help Center", icon: HelpCircle, url: "/help" },
];

interface CurrentUser {
  name: string;
  email: string;
}

interface SidebarProps {
  currentUser?: CurrentUser;
}

export const Sidebar = ({
  currentUser = { name: "Ram Kumar", email: "ram@example.com" },
}: SidebarProps) => {
  const [active, setActive] = useState("My Documents");
  const [folderId, setFolderId] = useState<string | null>(null);

  const renderNavGroup = (items: NavItem[]) =>
    items.map(({ label, icon: Icon, url }) => {
      const isActive = active === label;

      return (
        <Link to={url}
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
        </Link>
      );
    });

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-sidebar lg:flex">
      <div className="flex items-center gap-2 border-b px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <PenSquare size={16} />
        </div>
        <span className="text-lg font-bold tracking-tight">Nebula Docs</span>
      </div>


      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
       <div> {renderNavGroup(primaryNav)}</div>

          <div className="mx-auto"><FolderSidebar selectedFolderId={folderId} onSelectFolder={setFolderId} /></div>
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
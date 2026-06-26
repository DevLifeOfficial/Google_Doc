import { ChevronDown } from "lucide-react";
import type { User } from "../../types";

interface UserSelectProps {
  users: User[];
  selectedUser: string;
  onChange: (userId: string) => void;
}

export const UserSelect = ({ users, selectedUser, onChange }: UserSelectProps) => {
  if (!users.length) {
    return (
      <p className="text-sm text-muted-foreground">Everyone already has access.</p>
    );
  }

  return (
    <div className="relative">
      <select
        aria-label="Select a person to share with"
        className="h-9 w-full appearance-none rounded-md border border-input bg-background px-3 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={selectedUser}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Add a person...</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
};
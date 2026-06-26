import { X } from "lucide-react";
import { Button } from "../ui/button";
import type { User } from "../../types";

interface SharedUserListProps {
  users: User[];
  onRemove?: (userId: string) => void;
}

export const SharedUserList = ({ users, onRemove }: SharedUserListProps) => {
  if (!users.length) {
    return (
      <p className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
        Not shared with anyone yet.
      </p>
    );
  }

  return (
    <div className="space-y-1.5">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between rounded-md border bg-card p-2 pl-3"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="truncate text-sm">{user.name}</span>
          </div>

          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              aria-label={`Remove ${user.name}`}
              onClick={() => onRemove(user.id)}
            >
              <X size={14} />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
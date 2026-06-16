import type { User } from "../../types";

interface SharedUserListProps {
  users: User[];
}

export const SharedUserList = ({
  users,
}: SharedUserListProps) => {
  if (!users.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Not shared with anyone.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user.id}
          className="rounded border p-2"
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};
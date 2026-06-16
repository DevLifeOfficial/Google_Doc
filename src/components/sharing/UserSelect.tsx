import type { User } from "../../types";

interface UserSelectProps {
  users: User[];
  selectedUser: string;
  onChange: (userId: string) => void;
}

export const UserSelect = ({
  users,
  selectedUser,
  onChange,
}: UserSelectProps) => {
  return (
    <select
      title="Select user to share with"
      className="w-full rounded-md border p-2"
      value={selectedUser}
      onChange={(e) =>
        onChange(e.target.value)
      }
    >
      <option value="">
        Select User
      </option>

      {users.map((user) => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
  );
};
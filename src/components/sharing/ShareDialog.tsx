import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";

import { UserSelect } from "./UserSelect";
import { SharedUserList } from "./SharedUserList";

import { shareService } from "../../services";
import type { User } from "../../types";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string;
  users: User[];
}

export const ShareDialog = ({
  open,
  onOpenChange,
  documentId,
  users,
}: ShareDialogProps) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [sharedUsers, setSharedUsers] = useState<User[]>([]);
  const [loadingShares, setLoadingShares] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    let active = true;
    setLoadingShares(true);

    shareService
      .getDocumentShares(documentId)
      .then((shares) => {
        if (active) setSharedUsers(shares);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (active) setLoadingShares(false);
      });

    return () => {
      active = false;
    };
  }, [open, documentId]);

  const availableUsers = users.filter(
    (user) => !sharedUsers.some((shared) => shared.id === user.id)
  );

  const handleShare = async () => {
    if (!selectedUser) return;

    setSubmitting(true);

    try {
      await shareService.shareDocument(documentId, selectedUser);

      const newlyShared = users.find((user) => user.id === selectedUser);
      if (newlyShared) {
        setSharedUsers((prev) => [...prev, newlyShared]);
      }
      setSelectedUser("");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (userId: string) => {
    try {
      await shareService.removeShare(documentId, userId);
      setSharedUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share document</DialogTitle>
          <DialogDescription>
            People with access can view and edit this document.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">People with access</p>

            {loadingShares ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <SharedUserList users={sharedUsers} onRemove={handleRemove} />
            )}
          </div>

          <div className="flex items-end gap-2 border-t pt-4">
            <div className="flex-1">
              <UserSelect
                users={availableUsers}
                selectedUser={selectedUser}
                onChange={setSelectedUser}
              />
            </div>

            <Button onClick={handleShare} disabled={!selectedUser || submitting}>
              {submitting ? "Sharing..." : "Share"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
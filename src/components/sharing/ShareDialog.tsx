import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";

import { UserSelect } from "./UserSelect";

import { shareService } from "../../services";
import type { User } from "../../types";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  documentId: string;

  users: User[];
}

export const ShareDialog = ({
  open,
  onOpenChange,
  documentId,
  users,
}: ShareDialogProps) => {
  const [selectedUser, setSelectedUser] =
    useState("");

  const handleShare = async () => {
    if (!selectedUser) return;

    await shareService.shareDocument(
      documentId,
      selectedUser
    );

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Share Document
          </DialogTitle>
        </DialogHeader>

        <UserSelect
          users={users}
          selectedUser={selectedUser}
          onChange={setSelectedUser}
        />

        <Button onClick={handleShare}>
          Share
        </Button>
      </DialogContent>
    </Dialog>
  );
};
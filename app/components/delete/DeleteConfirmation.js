import React from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { toast } from "react-toastify";

const DeleteConfirmation = ({
  id,
  onDelete,
  title,
  isOpen,
  onClose,
  refresh,
}) => {
  const handleDelete = async () => {
    try {
      const response = await onDelete(id);

      toast.success(response?.message || `${title} deleted successfully!`);

      onClose();

      refresh();
    } catch (err) {
      console.error("Failed to delete:", err);

      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-6">
      <h3 className="text-lg font-semibold mb-4">Delete {title}</h3>
      <p className="text-gray-600  dark:text-gray-300 mb-4">
        Are you sure you want to delete this {title}?
      </p>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onClose}
          className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;

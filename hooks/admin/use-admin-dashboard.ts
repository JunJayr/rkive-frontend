import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useListUsersQuery,
  useGetDocumentCountQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddUserMutation 
} from '@/redux/features/authApiSlice';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_dean: boolean; 
  is_headdept: boolean;
  is_faculty: boolean;
  is_student: boolean;
}

export default function useAdminDashboard() {
  const { data: users, isLoading: isUsersLoading, refetch } = useListUsersQuery();
  const { data: documentCount, isLoading: isDocumentCountLoading } = useGetDocumentCountQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [addUser] = useAddUserMutation();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loading = isUsersLoading || isDocumentCountLoading;

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      setSelectedUser({ ...selectedUser, [name]: newValue });
    }
  };

  const handleAddUser = async (newUser: { first_name: string; last_name: string; email: string; password: string; repassword: string; }) => {
    try {
      await addUser(newUser).unwrap();
      toast.success("User added successfully");
      refetch();
    } catch (error) {
      toast.error("Error adding user");
    }
  };

  const handleSave = async () => {
    if (selectedUser) {
      try {
        await updateUser({ userId: selectedUser.id, userData: selectedUser });
        toast.success("User details updated successfully");
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Failed to update user");
      }
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.id);
        toast.success("User deleted successfully");
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  return {
    users,
    documentCount,
    loading,
    selectedUser,
    showModal,
    handleUserClick,
    handleInputChange,
    handleAddUser,
    handleSave,
    handleDelete,
    setShowModal,
  };
}

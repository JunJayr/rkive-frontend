import { useState } from 'react';
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
      setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    }
  };

  const handleAddUser = async (newUser: { first_name: string; last_name: string; email: string; password: string; repassword: string; }) => {
    try {
      const response = await addUser(newUser).unwrap();
      console.log("User added successfully:", response);
      refetch();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  
  const handleSave = async () => {
    if (selectedUser) {
      try {
        await updateUser({ userId: selectedUser.id, userData: selectedUser });
        alert('User details saved!');
        refetch();
        setShowModal(false);
      } catch (error) {
        alert('Failed to update user.');
      }
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.id);
        alert('User deleted!');
        refetch();
        setShowModal(false);
      } catch (error) {
        alert('Failed to delete user.');
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

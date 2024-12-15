import React, { useState } from "react";
import TreeLoader from "../TreeLoader/TreeLoader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

type members = {
  userId: number;
  firstName?: string;
  lastName?: string;
  email: string;
  groupIds: number;
  constraints: string[];
  receiverId: string;
};

interface UsersListProps {
  membersList: members[];
  isLoading: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ membersList, isLoading }) => {
  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;
  const [editableMembers, setEditableMembers] = useState(membersList);

  const handleInputChange = (userId: number, field: string, value: string | number | number[]) => {
    setEditableMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.userId === userId ? { ...member, [field]: value } : member
      )
    );
  };

  const handleConstraintsChange = (userId: number, selectedOptions: HTMLSelectElement) => {
    const selectedValues = Array.from(selectedOptions.selectedOptions, option => option.value);
    setEditableMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.userId === userId
          ? { ...member, constraints: [...new Set([...member.constraints, ...selectedValues])] }
          : member
      )
    );
  };

  const updateMember = (userId: number, updatedMember: members) => {
    setEditableMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.userId === userId ? updatedMember : member
      )
    );
  };

  const handleUpdate = async (userId: number) => {
    const updatedMember = editableMembers.find((member) => member.userId === userId);
    if (updatedMember) {
      try {
        await axios.put(apiUrl + "/api/users/user/" + userId, updatedMember);
        updateMember(userId, updatedMember);
      } catch (error) {
        console.error("Error updating member: ", error);
      }
    } else {
      console.error("Updated member not found");
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(apiUrl + "/api/users/user/" + userId);
      setEditableMembers((prevMembers) =>
        prevMembers.filter((member) => member.userId !== userId)
      );
    } catch (error) {
      console.error("Error deleting member: ", error);
    }
  }

  return (
    <div>
      {isLoading && <TreeLoader />}
      {!isLoading && (
        <Table>
          <TableCaption>Editable Users List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Group IDs</TableHead>
              <TableHead>Constraints</TableHead>
              <TableHead>Update Buttons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {editableMembers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => handleInputChange(user.userId, "firstName", e.target.value)}
                    placeholder="First Name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => handleInputChange(user.userId, "lastName", e.target.value)}
                    placeholder="Last Name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(user.userId, "email", e.target.value)}
                    placeholder="Email"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={user.groupIds}
                    onChange={(e) => handleInputChange(user.userId, "groupIds", parseInt(e.target.value))}
                    placeholder="Group IDs"
                  />
                </TableCell>
                <TableCell>
                  <select
                    multiple
                    value={user.constraints}
                    onChange={(e) => handleConstraintsChange(user.userId, e.target)}
                  >
                    {membersList
                      .filter((member) => member.userId !== user.userId)
                      .map((member) => (
                        <option key={member.userId} value={member.userId}>
                          {member.firstName ? member.firstName : member.email}
                        </option>
                      ))}
                  </select>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleUpdate(user.userId)}>Update</button>
                  <button onClick={() => handleDelete(user.userId)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UsersList;
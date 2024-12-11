import React from "react";
import TreeLoader from "../components/TreeLoader";

type members = {
  userId: number;
  firstName?: string;
  lasttName?: string;
  email: string;
  groupIds: number;
};

interface UsersListProps {
  membersList: members[];
  isLoading: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ membersList, isLoading }) => {

  return (
    <div>
      {isLoading && <TreeLoader />}
      {!isLoading &&
        <>
          <ul>
            {membersList.map((user) => (
              <li key={user.userId}>{user.email} - {user.groupIds}</li>
            ))}
          </ul>
        </>
      }
    </div>
  );
};

export default UsersList;

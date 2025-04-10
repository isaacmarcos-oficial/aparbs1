import { AddUserModal } from "./components/addUserModal";
import { UsersTable } from "./components/usersTable";

export default function Page() {
  return (
    <div className="">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">
          Usuários
        </h1>
        <AddUserModal />
      </div>
      <UsersTable />
    </div>
  )
}
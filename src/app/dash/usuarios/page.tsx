import { AddUserModal } from "./components/addUserModal";
import { DataTable } from "@/components/data-table";
import { usersColumns } from "./components/usersColumns";
import { getUsers } from "./action";

export default async function Page() {
  const users = await getUsers()

  return (
    <div className="">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">
          Usuários
        </h1>
        
        <AddUserModal />
      </div>
      <div className="">
        <DataTable data={users ?? []} columns={usersColumns} />
      </div>
    </div>
  )
}
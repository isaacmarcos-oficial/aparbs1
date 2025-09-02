"use client"
import { DataTable } from "@/components/data-table";
import { AddUserModal } from "./components/addUserModal";
import { useEffect, useState } from "react";
import { User } from "@prisma/client"
import { usersColumns } from "./components/usersColumns";

export default function Page() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar usuários");
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data.users || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold ">
          Usuários
        </h1>
        <AddUserModal />
      </div>
      {loading ? (
        <p>Carregando...</p>) : (
        <DataTable data={userData} columns={usersColumns} />
      )}
    </div>
  )
}
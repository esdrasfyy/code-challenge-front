"use client";
import { UserAPI } from "@/api/user.api";
import { UserCard } from "@/components/card/user.card";
import { CreateUserForm } from "@/components/form/create-user/create-user.form";
import { ImportUserCsv } from "@/components/import-users.component";
import { SearchUi } from "@/components/input/search-input.ui";
import { SelectUi } from "@/components/input/select-input.ui";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

export default function Admin() {
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("created_desc");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, refetch } = useQuery({ queryKey: ["users"], staleTime: 24 * 60 * 60 * 1000, queryFn: UserAPI.List });

  const filteredUsers = useMemo(() => {
    if (!users?.data) return [];
    let filtered = users.data.filter((user: any) => user.full_name.toLowerCase().includes(searchTerm));

    filtered.sort((a: any, b: any) => {
      switch (order) {
        case "created_asc":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "created_desc":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "name_asc":
          return a.full_name.localeCompare(b.full_name);
        case "name_desc":
          return b.full_name.localeCompare(a.full_name);
        default:
          return 0;
      }
    });
    return filtered.slice(0, limit);
  }, [users, searchTerm, order, limit]);

  return (
    <div className="max-w-[1300px] mx-auto py-8 flex flex-col gap-6 px-4 mt-12">
      <div className="flex items-center gap-3 text-3xl mb-9">
        <h1 className="font-black">Users</h1>
        <span className="opacity-50">({filteredUsers.length})</span>
      </div>

      <div className="flex justify-between w-full items-center gap-6">
        <div className="flex gap-4 items-center">
          <span className="font-bold text-lg opacity-50 mt-2">SHOW</span>

          <SelectUi
            items={[
              { label: "10", value: "10" },
              { label: "20", value: "20" },
              { label: "30", value: "30" },
            ]}
            onChange={(value: string) => setLimit(+value)}
            width="w-[90px]"
            defaultValue="20"
            value={String(limit)}
          />
          <SelectUi
            items={[
              { label: "Newest registered", value: "created_desc" },
              { label: "Oldest registered", value: "created_asc" },
              { label: "Name (A-Z)", value: "name_asc" },
              { label: "Name (Z-A)", value: "name_desc" },
            ]}
            onChange={(value: string) => setOrder(value.trim().toLowerCase())}
            width="w-[170px]"
            defaultValue="created_desc"
            value={order}
          />
        </div>

        <div className="flex gap-6 items-center">
          <SearchUi onSubmit={(value: string) => setSearchTerm(value.trim().toLowerCase())} onChange={(value: string) => setSearchTerm(value.trim().toLowerCase())} onClear={() => setSearchTerm("")} value={searchTerm} />
          <CreateUserForm refetch={refetch} />
          <ImportUserCsv refetch={refetch} />
        </div>
      </div>

      <ul className="rounded-md shadow-sm grid grid-cols-3 gap-6 space-y-24 mt-32">
        {filteredUsers.map((user, i) => (
          <UserCard key={user.email} user={user} index={i} refetch={refetch} />
        ))}
      </ul>
    </div>
  );
}

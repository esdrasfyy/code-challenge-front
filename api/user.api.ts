import { api } from "@/lib/axios.lib";

const Create = async ({ data }: { data: User.Personal & User.Address & { terms_accepted: boolean } }) => {
  console.log(data);

  return await api.post("users", data);
};

const List = async () => {
  return await api.get<User.I[] | undefined>("users");
};

const Get = async () => {
  return await api.get<User.I | undefined>("users");
};

const Delete = async (id: number) => {
  return await api.delete(`users/${id}`);
};

const Update = async ({ id, ...rest }: User.Personal & User.Address & { id: number }) => {
  return await api.put(`users/${id}`, { ...rest, terms_accepted: true });
};

export const UserAPI = { Create, List, Get, Delete, Update };

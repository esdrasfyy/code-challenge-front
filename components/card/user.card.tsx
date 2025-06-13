import { motion } from "framer-motion";
import { CiMapPin, CiMail, CiPhone, CiCalendarDate, CiEdit, CiTrash, CiExport } from "react-icons/ci";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useExportCSV } from "@/hooks/useExportCSV.hook";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UpdateUserForm } from "../form/update-user/update-user.form";
import { UserAPI } from "@/api/user.api";
import { useToast } from "../ui/toast";

export const UserCard = ({ user, index, refetch }: { user: User.I; index: number; refetch: () => void }) => {
  const [onDeleting, setOnDeleting] = useState<boolean>(false);
  const { exportCSV } = useExportCSV();
  const { addToast } = useToast();

  const onDelete = async () => {
    setOnDeleting(true);
    try {
      await UserAPI.Delete(user.id);

      addToast({ title: "User Deleted", description: "The user has been successfully removed.", type: "success", duration: 5000 });

      refetch();
    } catch (error) {
      addToast({ title: "Deletion Error", description: "Something went wrong while deleting the user. Please try again.", type: "error", duration: 5000 });
    } finally {
      setOnDeleting(false);
    }
  };
  return (
    <motion.li key={user.email} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }} className="bg-bg-secondary p-5 w-full col-span-1 rounded-xl max-h-[355px] shadow-2xl relative">
      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <button onClick={() => exportCSV(user, `u_${user.full_name}.csv`)} className="p-1 cursor-pointer rounded hover:bg-white/10 text-white/60 hover:text-green-400 transition-colors duration-300" title="Exportar" type="button">
          <CiExport size={18} />
        </button>
        <UpdateUserForm refetch={refetch} user={user} />
        <button onClick={onDelete} disabled={onDeleting} className="p-1 cursor-pointer rounded hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors duration-300 disabled:cursor-not-allowed" title="Delete">
          {onDeleting ? <AiOutlineLoading3Quarters className="animate-spin" size={18} /> : <CiTrash size={18} />}
        </button>
      </div>

      <span className="absolute left-3 top-3 font-extrabold text-xl opacity-40">#{user.id}</span>
      <motion.figure initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 100 }} className="-mt-20 flex w-full justify-center">
        <div className="bg-secondary-brand border border-bg-secondary shadow-2xl w-44 h-44 rounded-[40px]" />
      </motion.figure>

      <h4 className="font-bold text-center py-5 text-2xl">{user.full_name}</h4>

      <div className="flex flex-col space-y-4 text-sm border-t border-primary-brand pt-6">
        <InfoRow icon={<CiMapPin size={20} />} label="Location" value={`${user.address}, ${user.state}`} />
        <InfoRow icon={<CiMail size={20} />} label="Email" value={user.email} />
        <InfoRow icon={<CiPhone size={20} />} label="Phone" value={user.phone} />
        <InfoRow icon={<CiCalendarDate size={20} />} label="Created At" value={format(new Date(user.created_at), "HH:mm - dd/MM/yy", { locale: ptBR })} />
      </div>
    </motion.li>
  );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex w-full justify-between">
    <span className="flex items-center gap-4 font-medium text-secondary-brand">
      {icon}
      {label}
    </span>
    <p className="text-right">{value}</p>
  </div>
);

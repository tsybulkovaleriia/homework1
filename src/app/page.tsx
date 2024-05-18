import Stat from "@/components/Stat";
import Create from "@/components/Create";
import { cookies } from "next/headers";
import {
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import ToDoList from "@/components/ToDoList";
import { Database } from "../../types_db";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <section className="h-screen bg-black text-secondary p-6">
      <main className="max-w-xl mx-auto">
        <Stat />
        <Create session={session} />
        <ToDoList />
      </main>
    </section>
  );
};

export default Dashboard;

export const dynamic = 'force-dynamic'

import { Card } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import LogTabs from './_components/logTabs';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore); // <- await e sem argumento

  const [revenuesRes, expensesRes] = await Promise.all([
    supabase.from('revenues').select(),
    supabase.from('expenses').select(),
  ]);

  const Revenues = revenuesRes.data;
  const Expenses = expensesRes.data;

  return (
    <div className='flex flex-col p-4 gap-6 w-full max-w-7xl m-auto'>

      <LogTabs />

      <Card className="p-2">
        Receitas
        <ul>
          {Revenues?.map((r: { client: string }) => (
            <li key={r.client}>{r.client}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-2">
        Receitas
        <ul>
          {Expenses?.map((e: { description: string }) => (
            <li key={e.description}>{e.description}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
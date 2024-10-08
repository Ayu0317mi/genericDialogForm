//src/app/page.tsx
'use server';

import { getPerson} from "./server-actions";
import PersonTable from "./person-table";


export default async function ExampleUsage() {
  const persons = await getPerson();

  return (
      <div className="flex justify-center">
          <div>
          <PersonTable persons={persons ?? []} />
          </div>
      </div>
  )
}





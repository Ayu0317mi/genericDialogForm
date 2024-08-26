'use server';

import { getPerson } from "./generic-actions";
import PersonTable from "./person-table";


export default async function ExampleUsage() {
  const persons = await getPerson();

  return (
      <div>
          <div>
          <PersonTable persons={persons ?? []} />;
          </div>
      </div>
  )
}





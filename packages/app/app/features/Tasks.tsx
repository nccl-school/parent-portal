import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export function Tasks() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="App">
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}

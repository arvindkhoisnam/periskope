// import { useEffect } from "react";
// import { supabase } from "./lib/supabase";

// type ChatEvent = {
//   commit_timestamp: string;
//   errors: null | string;
//   eventType: "INSERT" | "UPDATE" | "DELETE"; // Adjust based on possible values
//   new: {
//     contactNumber: string;
//     created_at: string;
//     id: string;
//     lastMessage: {
//       body: string;
//       created_at: string;
//       sender: string;
//     };
//     user1: string;
//     user2: string;
//   };
//   old?: {
//     id: string;
//   };
//   schema: string;
//   table: string;
// };

// export function useSupabaseSubscription(
//   chann: string,
//   table: string,
//   callback: (payload: ChatEvent) => void
// ) {
//   useEffect(() => {
//     const channel = supabase
//       .channel(chann)
//       .on("postgres_changes", { event: "*", schema: "public", table }, callback)
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [chann, table, callback]);
// }

import { useEffect } from "react";
import { RealtimeChannel } from "@supabase/supabase-js"; // Import RealtimeChannel type
import { supabase } from "./lib/supabase";

type ChatEvent = {
  commit_timestamp: string;
  errors: null | string;
  eventType: "INSERT" | "UPDATE" | "DELETE"; // Possible event types
  new: {
    contactNumber: string;
    created_at: string;
    id: string;
    lastMessage: {
      body: string;
      created_at: string;
      sender: string;
    };
    user1: string;
    user2: string;
  };
  old?: {
    id: string;
  };
  schema: string;
  table: string;
};

export function useSupabaseSubscription(
  chann: string,
  table: string,
  callback: (payload: ChatEvent) => void
) {
  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel(chann)
      .on(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "postgres_changes" as any, // TypeScript workaround
        { event: "*", schema: "public", table },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chann, table, callback]);
}

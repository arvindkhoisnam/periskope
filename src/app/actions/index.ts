import { supabase } from "../lib/supabase";

async function signUp({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const { data, error } = await supabase
    .from("Users")
    .insert([{ username, password }]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const { data, error } = await supabase
    .from("Users")
    .select("username")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Invalid username or password");
  }

  return data;
}

async function allUsers(excludedUsername: string) {
  const { data: users, error } = await supabase
    .from("Users")
    .select("username")
    .neq("username", excludedUsername);

  return { users, error };
}

async function createChat({
  recipient,
  contactNumber,
  owner,
}: {
  recipient: string;
  contactNumber: string;
  owner: string;
}) {
  const { data, error } = await supabase
    .from("Chat")
    .insert([
      { user1: owner, user2: recipient, contactNumber, lastMessage: {} },
    ])
    .select("id");
  return { data, error };
}

async function allChats(currentUser: string) {
  const { data, error } = await supabase
    .from("Chat")
    .select("*")
    .or(`user1.eq.${currentUser},user2.eq.${currentUser}`)
    .order("created_at", { ascending: false });
  return { data, error };
}

async function getChat(username: string) {
  const { data, error } = await supabase
    .from("Message")
    .select("*")
    .eq("chatId", username);

  return { data, error };
}

async function sendMessage({
  body,
  recipient,
  sender,
}: {
  body: string;
  recipient: string;
  sender: string;
}) {
  try {
    const { data: existingChat } = await supabase
      .from("Chat")
      .select("id")
      .or(
        `and(user1.eq.${sender},user2.eq.${recipient}),and(user1.eq.${recipient},user2.eq.${sender})`
      );
    if (!existingChat || existingChat?.length === 0) {
      try {
        const { data: newChat } = await createChat({
          recipient,
          contactNumber: "9876543210",
          owner: sender,
        });
        const { data, error } = await supabase
          .from("Message")
          .insert([{ body: body, sender: sender, chatId: newChat![0].id }])
          .select("*");

        await supabase
          .from("Chat")
          .update({
            lastMessage: {
              body: data![0].body,
              sender: data![0].sender,
              created_at: data![0].created_at,
            },
          })
          .eq("id", newChat![0].id);
        return { data, error, newChat };
      } catch (err) {
        return err;
      }
    } else {
      try {
        const { data, error } = await supabase
          .from("Message")
          .insert([{ body, sender, chatId: existingChat![0].id }])
          .select("*");
        await supabase
          .from("Chat")
          .update({
            lastMessage: {
              body: data![0].body,
              sender: data![0].sender,
              created_at: data![0].created_at,
            },
          })
          .eq("id", existingChat![0].id);
        return { data, error };
      } catch (err) {
        return err;
      }
    }
  } catch (err) {
    return err;
  }
}
async function getChatId(sender: string, recipient: string) {
  const { data: chatId, error } = await supabase
    .from("Chat")
    .select("id")
    .or(
      `and(user1.eq.${sender},user2.eq.${recipient}),and(user1.eq.${recipient},user2.eq.${sender})`
    );
  return { chatId, error };
}
async function getMessages(chatId: string) {
  const { data, error } = await supabase
    .from("Message")
    .select("*")
    .eq("chatId", chatId)
    .order("created_at", { ascending: true }); // Sorting by created_at in descending order
  return { data, error };
}
export {
  signUp,
  signIn,
  allUsers,
  createChat,
  allChats,
  getChat,
  sendMessage,
  getChatId,
  getMessages,
};

"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signIn } from "../actions";
import { useCurrentUser } from "../store";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: signIn,
    onSuccess: (data) => {
      setCurrentUser(data.username);
      router.push("/");
    },
    onError: () => {
      setIsError(true);
    },
  });
  return (
    <div className="flex flex-col max-w-96 gap-5 p-10 border rounded-xl shadow-2xl bg-neutral-100">
      <h1 className="text-center text-3xl font-bold text-green-700 mb-5">
        Periskope
      </h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="py-2 px-4 border border-neutral-300 rounded-lg  text-neutral-800 focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-700 "
        placeholder="username"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="py-2 px-4 border border-neutral-300 rounded-lg  text-neutral-800 focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-700 "
        placeholder="password"
      />
      <button
        disabled={username.length <= 0 || password.length <= 0}
        className={`bg-green-700 py-2 px-4 rounded-lg ${
          username.length <= 0 || password.length <= 0
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => mutate({ username, password })}
      >
        {isPending ? "..." : "Sign In"}
      </button>
      {isError && (
        <p className="text-red-700 text-sm tracking-wide font-extralight text-center">
          An error while signing in, please try again.
        </p>
      )}
      <p className="text-neutral-700 text-sm tracking-wide font-extralight text-center">
        Don&apos;t have an account?{" "}
        <a className="underline text-green-700 cursor-pointer" href="/signup">
          SignUp
        </a>{" "}
        here.
      </p>
    </div>
  );
}

export default Signin;

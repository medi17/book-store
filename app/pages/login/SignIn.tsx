"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import {
  EnvelopeIcon,
  EyeSlashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/dist/client/link";
import { authClient } from "@/app/lib/auth-client";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuthOverlay } from "@/app/LayoutContext/OverlayContext";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8),
});
export default function Login() {
  const queryClient = useQueryClient();
  const { isVisible, hide, mode } = useAuthOverlay();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [signInFail, setsignInFail] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const signInWithGoogle = async () => {
    setLoadingGoogle(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3001",
    });
    setLoadingGoogle(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const result = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    if (result.data) {
      console.log("login result", result.data);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/");
      hide();
    } else {
      setsignInFail(true);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-black/20">
      <div className="relative font-gantari min-w-[280px] sm:min-w-[355px] flex flex-col items-center gap-5 bg-linear-to-tr from-black-800 to-[#0AA0A1]/40 px-6 sm:px-8 py-10 rounded-lg border-[0.25]">
        <button
          onClick={hide}
          className="absolute top-2 right-4 text-2xl text-white hover:text-red-600"
        >
          ✕
        </button>
        <h1 className="font-gabarito font-semibold text-[#0AA0A1] text-2xl ">
          Login
        </h1>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5"
        >
          <div className="flex flex-col gap-3">
            <h1 className="font-gabarito text-xl">Email</h1>
            <div className="relative">
              <input
                className="block w-full py-1.5 rounded-md pl-10 text-sm outline-2 focus:outline-cyan-500 placeholder:text-gray-500 font-bold"
                id="email"
                type="email"
                placeholder="Enter email"
                {...form.register("email")}
                required
                minLength={6}
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 " />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="font-gabarito text-xl">Password</h1>
            <Link
              href={"/pages/forgotPassword"}
              className="font-gantari text-end pb-2 hover:underline"
            >
              forgot password?
            </Link>
            <div className="relative">
              <input
                className="peer block w-full py-1.5 rounded-md pl-10 text-sm outline-2 focus:outline-cyan-500 placeholder:text-gray-500 font-bold"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...form.register("password")}
                required
                minLength={6}
              />
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="h-[18px] w-[18px] text-gray-500 "
                />
              </span>
            </div>
          </div>
          <div className={`text-start ${signInFail ? "block" : "hidden"}`}>
            <p className="text-sm text-red-400">
              failed to sign in! <br />
              Invalid email or unauthorized access.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="fancyBorder w-full py-1 mt-3 flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
            </button>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="fancyBorder w-full py-1 mt-2 flex justify-center"
            >
              {loadingGoogle ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Sign in with Google"
              )}
            </button>
            <p className="text-[12px] text-center text-gray-600">
              Don&lsquo;t have an account?.
              <span className="underline hover:text-[#0AA0A1]">
                <Link href="/pages/signup">Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

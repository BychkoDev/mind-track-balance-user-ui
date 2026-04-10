"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { signin, googleLoginService } from "./authService";
import { fetchUserInfo } from "../(protected)/auth/fetchUserInfo";
import { useStore } from "@/store/useStore";
import { useTranslations } from "next-intl";
import { CustomGoogleButton } from "@/components/ui/CustomGoogleButton";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const t = useTranslations("Auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const authRes = await signin({
        email,
        password,
      });

      if (authRes.err && authRes.ok === null) {
        setError(authRes.err.error || "Login failed");
        setIsLoading(false);
        return;
      }

      const userRes = await fetchUserInfo();     
      if (userRes.err || !userRes.ok) {
        setError("Failed to verify user profile.");
        setIsLoading(false);
        return;
      }

      const user = userRes.ok;
      if (user.role !== "USER" || !user.active) {
        setError("Account is inactive or lacks appropriate permissions.");
        setIsLoading(false);
        return;
      }
      setUser(user);
      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (token: string) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await googleLoginService(token);

      if (res.err) {
        setError(res.err.error || "Google login failed");
        setIsLoading(false);
        return;
      }

      if(res.ok) {
        console.log("RES OK: !!!!!!!!!!!!!" + JSON.stringify(res.ok));
        setUser(res.ok);
        router.push("/dashboard");
        return;
      }

      const userRes = await fetchUserInfo();
      if (userRes.ok) {
        setUser(userRes.ok);
        router.push("/dashboard");
      } else {
        setError("Failed to fetch user info after Google login");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during Google authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 -z-10 transition-colors" />

      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse -z-10" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse -z-10"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl animate-pulse -z-10"
        style={{ animationDelay: "2s" }}
      />

      <Header />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-32 md:py-20">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:flex flex-col items-center justify-center space-y-8">
            <div className="relative w-full max-w-md">
              <div className="relative h-96 flex items-center justify-center">
                <div
                  className="absolute w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl opacity-80 animate-float"
                  style={{
                    top: "20%",
                    left: "10%",
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full opacity-80 animate-float"
                  style={{
                    top: "50%",
                    right: "15%",
                    animation: "float 7s ease-in-out infinite",
                    animationDelay: "1s",
                  }}
                />
                <div
                  className="absolute w-28 h-28 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl opacity-80 animate-float"
                  style={{
                    bottom: "20%",
                    left: "20%",
                    animation: "float 8s ease-in-out infinite",
                    animationDelay: "2s",
                  }}
                />
                <div
                  className="absolute w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-80 animate-float"
                  style={{
                    top: "35%",
                    left: "45%",
                    animation: "float 5s ease-in-out infinite",
                    animationDelay: "0.5s",
                  }}
                />
              </div>
            </div>
            <div className="text-center space-y-3 max-w-md">
              <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-2xl">
                {t("welcomeTitle")}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t("welcomeDesc")}
              </p>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 rounded-3xl shadow-2xl shadow-purple-500/10 p-8 md:p-10 border border-white/50">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-1 mb-8">
                  <TabsTrigger
                    value="signin"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    {t("signIn")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    {t("createAccount")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                      <div className="p-3 bg-red-100 text-red-600 rounded-xl text-sm font-medium">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label
                        htmlFor="signin-email"
                        className="text-gray-700 dark:text-gray-200"
                      >
                        {t("email")}
                      </Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="rounded-2xl bg-white/60 dark:bg-slate-800/60 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20 shadow-inner px-4 py-6"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signin-password"
                        className="text-gray-700 dark:text-gray-200"
                      >
                        {t("password")}
                      </Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="rounded-2xl bg-white/60 dark:bg-slate-800/60 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20 shadow-inner px-4 py-6"
                      />
                    </div>

                    <div className="flex items-center justify-end">
                      <a
                        href="#"
                        className="text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium"
                      >
                        {t("forgotPassword")}
                      </a>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 rounded-2xl py-6 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all font-semibold"
                    >
                      {isLoading ? t("signingIn") : t("signIn")}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-name"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      {t("fullName")}
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your name"
                      className="rounded-2xl bg-white/60 dark:bg-slate-800/60 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20 shadow-inner px-4 py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-email"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      {t("email")}
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="rounded-2xl bg-white/60 dark:bg-slate-800/60 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20 shadow-inner px-4 py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-password"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      {t("password")}
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-2xl bg-white/60 dark:bg-slate-800/60 border-purple-200/50 focus:border-purple-400 focus:ring-purple-400/20 shadow-inner px-4 py-6"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 rounded-2xl py-6 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all font-semibold">
                    {t("createAccount")}
                  </Button>
                </TabsContent>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-900 px-2 text-gray-500 dark:text-gray-400">
                      {t("orContinueWith")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <CustomGoogleButton
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google login failed")}
                    isLoading={isLoading}
                  />
                </div>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("privacyNotice")}{" "}
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    {t("privacyPolicy")}
                  </a>
                </p>
              </div>
            </div>

            <div className="md:hidden mt-8 text-center space-y-2">
              <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-xl">
                {t("welcomeTitle")}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t("welcomeDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) rotate(-5deg);
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}

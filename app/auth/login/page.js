"use client";

import {  useState } from "react";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from '@/hooks/useAuth';
import { Form } from './../../components/ui/form';
import { Input } from './../../components/ui/input';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, error: authError, } = useAuth();


  // useEffect(() => {
  //   if (!isLoading && isLoggedIn) {
  //     router.replace("/home");
  //   }
  // }, [isLoggedIn, isLoading, router]);


  const handleSubmit = async (values) => {

    router.push("/live-monitoring");
    
    setError({});

    // validation
    const newErrors = {};
    const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
    const isValidMobile = (value) => /^01[3-9]\d{8}$/.test(value); // BD mobile number pattern

    if (!values.email) {
      newErrors.email = "Email or mobile number is required";
    } else if (!isValidEmail(values.email) && !isValidMobile(values.email)) {
      newErrors.email = "Enter a valid email or Bangladeshi mobile number";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    

    // try {
    //   await login(values.email, values.password);
    // } catch (error) {
    //   throw new Error(error);
    // }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover brightness-[0.3] contrast-110"
      >
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(30,64,175,0.2),rgba(15,23,42,0.85))]" />


      {authError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {authError}
        </div>
      )}
      {/* Login Card */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className=" w-[420px] p-[50px_40px] text-center text-white rounded-[24px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] backdrop-blur-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-fadeIn">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold tracking-tight">
            AusAge <span className="text-blue-500">360</span>
          </h1>
          <p className="mt-1 mb-8 text-xs uppercase tracking-widest text-white/60">
            Predictive Care Intelligence
          </p>
          <Form
            onSubmit={handleSubmit}
            disabled={isLoading}
            submitRenderer={({ isSubmitting }) => (
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative h-12 w-full overflow-hidden rounded-xl bg-blue-600 font-semibold transition hover:bg-blue-700 disabled:opacity-80"
              >
                <span className="relative z-10">
                  {isSubmitting ? "VERIFYING AI..." : "SIGN IN TO SYSTEM"}
                </span>

                {isSubmitting && (
                  <span className="absolute inset-0 animate-progress bg-white/20" />
                )}
              </button>
            )}
          >
            {/* Email */}
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-white/50">👤</span>
              <Input
                type="text"
                placeholder="Resident Email"
                required
                error={error.email}
                disabled={isLoading}
                className="w-full rounded-xl border border-white/20 bg-white/5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-white/50">🛡️</span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Secure Password"
                required
                error={error.password}
                disabled={isLoading}
                className="w-full rounded-xl pr-12 border border-white/20 bg-white/5 text-sm outline-none focus:border-blue-500 focus:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Form>
          {/* Footer */}
          <div className="mt-6 flex justify-center gap-2 text-sm text-white/50">
            <a href="#" className="text-blue-400">Help Center</a> •
            <a href="#" className="text-blue-400">System Status</a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase text-white/40 whitespace-nowrap">
            <Fingerprint size={16} className="opacity-70 w-auto" />
            <span>AI Biometric Auth Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}

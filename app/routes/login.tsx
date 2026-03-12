import { GoogleAuthProvider } from "firebase/auth";
import { useState, type FormEvent } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { NavLink, redirect, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import LoadingSpinnerSm from "~/components/LoadingSpinnerSm";
import { useAuth } from "~/hooks/useAuth";
import api from "~/services/api";
import { requireAuth } from "~/utils/auth.helper";
import { getErrorMessage } from "~/utils/getErrorMessage";

export function meta() {
  return [{ title: "Login" }];
}

export async function clientLoader() {
  const user = await requireAuth();
  if (user) return redirect("/");
  return null;
}

const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const { userSignIn, userSignInWithProvider } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);

      const user = await userSignInWithProvider(googleProvider);
      const userData = { id: user.user.uid, email: user.user.email };

      await api.post("/auth/jwt", userData);

      toast.success("Login Successfull");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message, error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const form = e.currentTarget as HTMLFormElement;
      const email = (form.email as HTMLInputElement).value;
      const password = (form.password as HTMLInputElement).value;

      if (!email || !password) {
        toast.error("Please provide email and password");
        return;
      }

      const user = await userSignIn(email, password);
      const userData = { id: user.user.uid, email: user.user.email };

      await api.post("/auth/jwt", userData);

      toast.success("Login Successfull");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message, error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="section section-gap">
        <div className="row">
          <div className="column">
            <h6 className="sub-heading text-accent-color text-center">Login</h6>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl">
              Welcome to <br></br>{" "}
              <span className="text-4xl md:text-5xl lg:text-6xl">
                <span className="text-accent-color">APEX</span>RENTALS
              </span>
            </h2>
            <p className="text text-center">Login to your account</p>

            {/* Login Form */}
            <div className="form-container justify-center max-w-112.5 self-center">
              <form className="form" onSubmit={handleLogin}>
                {/* Email Address */}
                <div className="form-control">
                  <label htmlFor="email" className="label">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-field"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {/* Password */}
                <div className="form-control">
                  <label htmlFor="password" className="label">
                    Password*
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPass ? "text" : "password"}
                      id="password"
                      name="password"
                      className="input-field"
                      placeholder="********"
                      required
                    ></input>
                    <span
                      className="text-text-color cursor-pointer absolute top-[50%] translate-y-[-50%] right-3 text-[18px]"
                      onClick={handleShowPass}
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                    </span>
                  </div>
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full cursor-pointer mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinnerSm></LoadingSpinnerSm>
                    </>
                  ) : (
                    <>Log In</>
                  )}
                </button>
              </form>
              {/* Form Footer */}
              <div className="w-full relative text-center">
                <div className="border-b w-full border-border-color absolute top-[50%]"></div>
                <p className="text-center z-10 px-3 text-[14px] bg-bg-color relative inline text-text-color">
                  Or
                </p>
              </div>
              <button
                className="btn-secondary w-full flex gap-4 justify-center items-center text-white"
                onClick={handleSignInWithGoogle}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinnerSm></LoadingSpinnerSm>
                  </>
                ) : (
                  <>
                    <FaGoogle className="text-[14px] -mt-0.5"></FaGoogle> Continue with Google
                  </>
                )}
              </button>
              <div className="flex justify-center text-[14px] gap-1 w-full">
                <p className="text-center">Don&apos;t have an account?</p>
                <NavLink to="/signup" className="text-accent-color hover:underline">
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

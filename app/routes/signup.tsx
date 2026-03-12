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

export default function Signup() {
  const { userSignInWithProvider, userSignUp, userUpdateProfile } = useAuth();
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
      console.error("Failed to login with google", error);
      toast.error("Failed to sign in with google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const form = e.currentTarget as HTMLFormElement;
      const displayName = (form.username as HTMLInputElement).value;
      const email = (form.email as HTMLInputElement).value;
      const password = (form.password as HTMLInputElement).value;
      const photoURL = (form.image as HTMLInputElement).value;

      const user = await userSignUp(email, password);
      await userUpdateProfile({ displayName, photoURL });

      const userData = { id: user.user.uid, email: user.user.email };

      await api.post("/auth/jwt", userData);

      toast.success("Account created successfully.");
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
            <h6 className="sub-heading text-accent-color text-center">Signup</h6>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl">
              Welcome to <br></br>{" "}
              <span className="text-4xl md:text-5xl lg:text-6xl">
                <span className="text-accent-color">APEX</span>RENTALS
              </span>
            </h2>
            <p className="text text-center">Create an account</p>

            {/* Login Form */}
            <div className="form-container justify-center max-w-112.5 self-center">
              <form className="form" onSubmit={handleSignup}>
                {/* name */}
                <div className="form-control">
                  <label htmlFor="username" className="label">
                    Name*
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="input-field"
                    placeholder="your full name"
                    required
                  />
                </div>
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
                {/* Image */}
                <div className="form-control">
                  <label htmlFor="image" className="label">
                    Image URL*
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="input-field"
                    placeholder="png, jpg, jpeg"
                    required
                  />
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
                <p className="text-center">Already have an account?</p>
                <NavLink to="/login" className="text-accent-color hover:underline">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

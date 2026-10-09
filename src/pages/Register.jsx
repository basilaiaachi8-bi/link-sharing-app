import { useForm } from "react-hook-form";
import { useLinks } from "../context/LinkContext";

export default function Register({ onNavigate }) {
  const { login } = useLinks();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    login();
    if (onNavigate) onNavigate("links");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-grey p-4 font-sans">
      <div className="mb-10 flex items-center gap-2">
        <img
          src="/assets/images/icon-link.svg"
          alt="devlinks logo"
          className="w-10 h-10"
        />
        <span className="text-2xl font-bold text-dark-grey">devlinks</span>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm w-full max-w-[476px]">
        <h1 className="text-2xl md:text-3xl font-bold text-dark-grey mb-2">
          Create account
        </h1>
        <p className="text-grey text-base mb-10">
          Let’s get you started sharing your links!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Email input */}
          <div>
            <label className="block text-xs text-dark-grey mb-1">
              Email address
            </label>
            <div className="relative">
              <img
                src="/assets/images/icon-email.svg"
                alt="email"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              />
              <input
                type="email"
                placeholder="e.g. alex@email.com"
                {...register("email", {
                  required: "Can't be empty",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email",
                  },
                })}
                className={`w-full pl-11 pr-28 py-3 rounded-lg border text-dark-grey text-base outline-none focus:border-purple focus:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] transition-all ${
                  errors.email ? "border-red" : "border-borders"
                }`}
              />
              {errors.email && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Create password input */}
          <div>
            <label className="block text-xs text-dark-grey mb-1">
              Create password
            </label>
            <div className="relative">
              <img
                src="/assets/images/icon-password.svg"
                alt="password"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              />
              <input
                type="password"
                placeholder="At least 8 characters"
                {...register("password", {
                  required: "Please check again",
                  minLength: {
                    value: 8,
                    message: "At least 8 characters",
                  },
                })}
                className={`w-full pl-11 pr-36 py-3 rounded-lg border text-dark-grey text-base outline-none focus:border-purple focus:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] transition-all ${
                  errors.password ? "border-red" : "border-borders"
                }`}
              />
              {errors.password && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          {/* Confirm password input */}
          <div>
            <label className="block text-xs text-dark-grey mb-1">
              Confirm password
            </label>
            <div className="relative">
              <img
                src="/assets/images/icon-password.svg"
                alt="password"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              />
              <input
                type="password"
                placeholder="At least 8 characters"
                {...register("confirmPassword", {
                  required: "Please check again",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full pl-11 pr-36 py-3 rounded-lg border text-dark-grey text-base outline-none focus:border-purple focus:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] transition-all ${
                  errors.confirmPassword ? "border-red" : "border-borders"
                }`}
              />
              {errors.confirmPassword && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-grey">
            Password must contain at least 8 characters
          </p>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-purple hover:bg-purple-hover text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Create new account
          </button>
        </form>

        <p className="text-center text-grey text-base mt-6">
          Already have an account?{" "}
          <button
            onClick={() => onNavigate && onNavigate("login")}
            className="text-purple hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

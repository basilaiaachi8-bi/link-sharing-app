import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLinks } from "../context/LinkContext";

export default function Profile() {
  const { profile, setProfile, showToast } = useLinks();
  const [imagePreview, setImagePreview] = useState(profile.image || "");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
    },
    mode: "onChange",
  });

  const watchedFields = watch();

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      firstName: watchedFields.firstName,
      lastName: watchedFields.lastName,
      email: watchedFields.email,
      image: imagePreview,
    }));
  }, [
    watchedFields.firstName,
    watchedFields.lastName,
    watchedFields.email,
    imagePreview,
    setProfile,
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Please upload a PNG or JPG image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        if (img.width > 1024 || img.height > 1024) {
          alert("Image resolution must be below 1024x1024px.");
          return;
        }
        setImagePreview(reader.result);
      };
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    setProfile({
      ...data,
      image: imagePreview,
    });
    showToast("Your changes have been successfully saved!");
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 flex-1 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-grey mb-2">
          Profile Details
        </h1>
        <p className="text-grey text-base mb-10">
          Add your details to create a personal touch to your profile.
        </p>

        <form
          id="profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="bg-light-grey p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-grey text-base">Profile picture</span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <label className="relative w-48 h-48 rounded-xl bg-light-purple flex flex-col items-center justify-center cursor-pointer overflow-hidden group">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                      <img
                        src="/assets/images/icon-upload-image.svg"
                        alt="upload"
                        className="w-10 h-10 mb-2 brightness-200"
                      />
                      <span className="font-semibold text-sm">
                        Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-purple font-semibold">
                    <img
                      src="/assets/images/icon-upload-image.svg"
                      alt="upload"
                      className="w-10 h-10 mb-2"
                    />
                    <span>+ Upload Image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <p className="text-grey text-xs max-w-[215px]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>

          <div className="bg-light-grey p-5 rounded-xl space-y-3">
            {/* First Name */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="text-dark-grey text-xs sm:text-base sm:w-1/3">
                First name*
              </label>
              <div className="relative sm:w-2/3">
                <input
                  type="text"
                  placeholder="e.g. John"
                  {...register("firstName", { required: "Can't be empty" })}
                  className={`w-full py-3 px-4 rounded-lg border text-dark-grey text-base outline-none bg-white focus:border-purple ${
                    errors.firstName ? "border-red" : "border-borders"
                  }`}
                />
                {errors.firstName && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="text-dark-grey text-xs sm:text-base sm:w-1/3">
                Last name*
              </label>
              <div className="relative sm:w-2/3">
                <input
                  type="text"
                  placeholder="e.g. Appleseed"
                  {...register("lastName", { required: "Can't be empty" })}
                  className={`w-full py-3 px-4 rounded-lg border text-dark-grey text-base outline-none bg-white focus:border-purple ${
                    errors.lastName ? "border-red" : "border-borders"
                  }`}
                />
                {errors.lastName && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="text-dark-grey text-xs sm:text-base sm:w-1/3">
                Email
              </label>
              <div className="relative sm:w-2/3">
                <input
                  type="email"
                  placeholder="e.g. alex@email.com"
                  {...register("email", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email",
                    },
                  })}
                  className={`w-full py-3 px-4 rounded-lg border text-dark-grey text-base outline-none bg-white focus:border-purple ${
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
          </div>
        </form>
      </div>

      {/* Save Button */}
      <div className="border-t border-borders pt-6 mt-6 flex justify-end">
        <button
          type="submit"
          form="profile-form"
          className="w-full md:w-auto bg-purple hover:bg-purple-hover text-white font-semibold px-7 py-3 rounded-lg transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}

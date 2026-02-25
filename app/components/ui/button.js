export function Button({
  className = "",
  variant = "primary",
  size = "default",
  type = "button",
  disabled = false,
  children,
  ...props
}) {
  const baseStyles =
    "flex justify-center items-center font-medium rounded-md focus:outline-none transition-colors";

  const variants = {
    primary: "bg-primaryColor text-white hover:bg-primaryColor focus:ring-green-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    warning:
      "bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-400",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400",
    info: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
    red:
      "bg-red-600 bg-opacity-10 text-red-600 focus:ring-0 focus:outline-none",
    gray: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-500 dark:hover:bg-gray-700",

    ghost:
      "bg-transparent text-primaryColor hover:bg-green-50 focus:ring-green-500",
    ghostGray:
      "bg-transparent text-gray-500 hover:bg-gray-50 focus:ring-gray-500",
    link: "bg-transparent text-primaryColor hover:underline focus:ring-0 p-0",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

    outline:
      "bg-transparent border border-primaryColor text-primaryColor hover:bg-green-50 focus:ring-green-500",
    infoOutline:
      "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-400",
    darkOutline:
      "bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-50 focus:ring-gray-400",

    muted: "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-300",
  };

  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base",
    icon: "p-2",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}

import { usePathname } from "next/navigation";

export function Input({
  id,
  name,
  type,
  placeholder,
  className = "",
  error,
  required,
  ref,
  ...props
}) {
  const router = usePathname();
  console.log(router);

  return (
    <input
      id={id}
      ref={ref}
      name={name || id}
      type={type}
      placeholder={placeholder}
      className={`${className} block w-full dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 border ${error ? "border-red-500 dark:border-red-700" : "border-gray-300 dark:border-gray-600"} 
                 rounded-md shadow-sm focus:outline-none focus:ring-green-500 dark:focus:ring-primaryColor focus:border-green-500 dark:focus:border-primaryColor
      ${router === "/" ? "px-11 py-3" : "px-3 py-2"}`}
      required={required}
      aria-invalid={error ? "true" : "false"}
      {...props}
    />
  );
}

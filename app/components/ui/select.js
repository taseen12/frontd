"use client";

export function Select({
  id,
  label,
  name,
  value,
  options = [],
  onChange,
  className,
  placeholder,
  disabled,
  required,
  ...props
}) {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    // const intValue =
    //   name === "designationId" || name === "wingId" ? value : parseInt(value);
    onChange(name, value);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleSelectChange}
          className={`block appearance-none ${className} pr-10`}
          disabled={disabled}
          required={required}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function SelectGroup({ className, children, ...props }) {
  return (
    <div className={`space-y-2 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

export function SelectTrigger({ className, children, ...props }) {
  return (
    <button
      className={`flex items-center justify-between w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ className, children, ...props }) {
  return (
    <span className={`text-sm text-gray-700 ${className || ""}`} {...props}>
      {children}
    </span>
  );
}

export function SelectContent({ className, children, ...props }) {
  return (
    <div
      className={`bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectLabel({ className, children, ...props }) {
  return (
    <div
      className={`px-3 py-2 text-sm font-medium text-gray-500 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({ className, children, ...props }) {
  return (
    <div
      className={`px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectSeparator({ className, ...props }) {
  return (
    <div className={`border-b border-gray-200 ${className || ""}`} {...props} />
  );
}

export function SelectScrollUpButton({ className, ...props }) {
  return (
    <div
      className={`flex items-center justify-center h-6 bg-white border-b border-gray-200 cursor-pointer ${
        className || ""
      }`}
      {...props}
    >
      <svg
        className="w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 15l7-7 7 7"
        ></path>
      </svg>
    </div>
  );
}

export function SelectScrollDownButton({ className, ...props }) {
  return (
    <div
      className={`flex items-center justify-center h-6 bg-white border-t border-gray-200 cursor-pointer ${
        className || ""
      }`}
      {...props}
    >
      <svg
        className="w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  );
}

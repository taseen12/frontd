export function Card({ className, children, ...props }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={`text-2xl font-bold text-gray-800 dark:text-gray-100 ${className || ""}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${className || ""}`} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`p-6 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={`p-6 border-t border-gray-200 dark:border-gray-700 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

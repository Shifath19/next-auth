type LoadingButtonProps = {
    isLoading: boolean
    children: React.ReactNode
    type?: 'submit' | 'button'
    onClick?: () => void
    className?: string
  }
  
  export default function LoadingButton({
    isLoading,
    children,
    type = 'submit',
    onClick,
    className = '',
  }: LoadingButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isLoading}
        className={`relative flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${className}`}
      >
        {isLoading && (
          <div className="absolute left-4 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
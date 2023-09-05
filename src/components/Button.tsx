
interface ButtonProps {
  children: any;
  styles?: any;
  className?: any;
  disabled?: boolean;
  type?: any
  onClick?: () => void;
}

export default function Button({
  children,
  styles,
  className,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`bg-transparent  text-primary font-semibold  py-2 px-4  
     hover:border-transparent rounded-full shadow-md  border 
     duration-200 ease-in-out  cursor-pointer
     ${!disabled && "hover:bg-primary-800 hover:text-white border-primary border-primary-300"}
     transition ${disabled && "bg-gray-100 cursor-not-allowed "} ${className} `}
      style={{ ...styles }}
    >
      {children}

    </button>
  );
}

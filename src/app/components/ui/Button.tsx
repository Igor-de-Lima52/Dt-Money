interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return(
    <button
      {...props}
      className={`cursor-pointer w-full bg-[#00875f] hover:bg-[#015f43] transition-colors text-white font-bold py-4 rounded-lg mt-4 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
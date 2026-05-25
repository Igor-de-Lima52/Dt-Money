interface LabelContainerProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

export function LabelContainer({ children, ...props }: LabelContainerProps) {
  return (
    <label className="text-[#c4c4cc] text-sm mb-2 block" {...props}>
      {children}
    </label>
  );
}

export function InputContainer({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-3 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
    />
  );
}
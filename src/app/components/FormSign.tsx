import React from "react";

interface FormContainerProps extends React.HTMLAttributes<HTMLElement>{
  children: React.ReactNode;
}

export function FormContainer({ children, className }: FormContainerProps) {
  return (
    <div className={`bg-[#29292e] rounded-lg p-8 max-w-[450px] w-[85%] md:w-full mb-6 md:mb-0 ${className || ""}`}>
      {children}
    </div>
  );
}

interface FormTitleProps {
  children: React.ReactNode;
}

export function FormTitle({ children }: FormTitleProps) {
  return (
    <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#e1e1e6] text-[28px] mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
      {children}
    </h1>
  );
}

interface FormDescriptionProps {
  children: React.ReactNode;
}

export function FormDescription({ children }: FormDescriptionProps) {
  return (
     <p className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc] text-base mb-8">
      {children}
    </p>
  );
}

interface FormSignProps extends React.FormHTMLAttributes<HTMLFormElement>{
  children: React.ReactNode;
}

export function FormSign({ children, ...props }: FormSignProps) {
  return (
    <form className="flex flex-col gap-4" {...props}>
      {children}
    </form>
  )
}

interface FormLinkProps {
  children: React.ReactNode;
}

export function FormLink({ children }: FormLinkProps) {
  return(
    <div className="text-center">
      <p className="text-[#c4c4cc] text-sm">
        Não tem uma conta?{" "}
        {children}
      </p>
    </div>
  )
}
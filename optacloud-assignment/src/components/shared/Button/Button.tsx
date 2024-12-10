import React, { HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: HTMLProps<HTMLButtonElement>["className"];
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "bg-primary text-white font-bold rounded-xl p-2 hover:brightness-125 transition-all flex items-center justify-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

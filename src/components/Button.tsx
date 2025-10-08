import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base = 'px-4 py-2 rounded-md font-medium transition';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  const classes = `${base} ${variants[variant]} ${className}`;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
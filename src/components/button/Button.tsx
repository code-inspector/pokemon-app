import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = ({ title, disabled, ...props }: ButtonProps) => {
  return (
    <button {...props} type="button" className={'btn btn-primary'}>
      {title}
    </button>
  );
};

export default Button;

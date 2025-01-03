import React from 'react';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

const Button = ({ onClick, disabled = false, className = '', children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {children}
        </button>
    );
};

export default Button
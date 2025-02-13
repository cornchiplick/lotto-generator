interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({className = "", children}: ComponentProps) => {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({className = "", children}: ComponentProps) => {
  return <div className={`flex flex-col space-y-1.5 bg-gray-50 p-6 ${className}`}>{children}</div>;
};

export const CardContent = ({className = "", children}: ComponentProps) => {
  return <div className={`p-6 pt-4 ${className}`}>{children}</div>;
};

export default Card;

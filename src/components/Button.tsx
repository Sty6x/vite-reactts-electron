interface ButtonProps {
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}
export const Button = ({ handleClick, children }: ButtonProps) => {
	return <button onClick={handleClick}>{children}</button>;
};

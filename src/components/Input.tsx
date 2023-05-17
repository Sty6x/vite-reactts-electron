interface InputProps {
	value: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ handleChange, value }: InputProps) => {
	return <input type="text" onChange={handleChange} value={value} />;
};

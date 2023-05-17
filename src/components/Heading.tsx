interface HeadingProps {
	children: string;
}

export const Heading = ({ children }: HeadingProps) => {
	return (
		<div>
			<h1>Heading Component</h1>
			{children}
		</div>
	);
};

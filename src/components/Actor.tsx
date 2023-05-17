interface ActorProps {
	children: React.ReactNode;
}

export const Actor = ({ children }: ActorProps) => {
	return <div>{children}</div>;
};

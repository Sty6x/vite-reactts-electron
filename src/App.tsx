import { useRef, useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.scss";
import ReactMarkdown from "react-markdown";

console.log(
	"[App.tsx]",
	`Hello world from Electron ${process.versions.electron}!`
);

interface InputProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => null;
}
function App() {
	const [count, setCount] = useState(0);
	const [userInput, setUserInput] = useState<string>("");

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const inputValue: string = e.target.value;
		setUserInput(inputValue);
	}

	return (
		<div className="App">
			<div>
				<h1>Editor</h1>
				<div>
					<textarea
						style={{ color: "black" }}
						value={userInput}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div>
				<h1>Markdown</h1>
				<ReactMarkdown children={userInput} />
			</div>
		</div>
	);
}

export default App;

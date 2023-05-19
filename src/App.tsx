import { useRef, useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.scss";
import ReactMarkdown from "react-markdown";
interface InputProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => null;
}
function App() {
	const [count, setCount] = useState(0);
	const [userInput, setUserInput] = useState<string>("");
	const editorRef = useRef<HTMLDivElement>();

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const inputValue: string = e.target.value;
		setUserInput(inputValue);
	}
	return (
		<div className="App">
			<div>
				<div ref={editorRef} id="editor-parent" />
			</div>
			<div>
				<h1>Markdown</h1>
				<ReactMarkdown>{userInput}</ReactMarkdown>
			</div>
		</div>
	);
}

export default App;

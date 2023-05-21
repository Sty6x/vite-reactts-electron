import React, { useRef, useState, useCallback } from "react";
import "./App.scss";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
interface InputProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => null;
}
interface CallbackProps {}
function App() {
	const [count, setCount] = useState(0);
	const [userInput, setUserInput] = useState<string>("");
	const editorRef = useRef<HTMLDivElement>();
	const onChange = React.useCallback((value: string, viewUpdate) => {
		console.log("value:", value);
	}, []);
	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const inputValue: string = e.target.value;
		setUserInput(inputValue);
	}
	return (
		<div className="App">
			<div>
				<h1>Markdown</h1>
				<ReactMarkdown>{userInput}</ReactMarkdown>
			</div>
			<CodeMirror
				value="random text"
				onChange={onChange}
				width="100%"
				height="100%"
			/>
		</div>
	);
}

export default App;

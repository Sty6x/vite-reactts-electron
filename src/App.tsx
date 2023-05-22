import React, { useRef, useState, useCallback } from "react";
import "./App.scss";
import ReactMarkdown from "react-markdown";
import CodeMirror, { getStatistics } from "@uiw/react-codemirror";
import { vim } from "@replit/codemirror-vim";
interface InputProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => null;
}
interface CallbackProps {}
function App() {
	const [count, setCount] = useState(0);
	const [userInput, setUserInput] = useState<string>("");
	const editorRef = useRef<HTMLDivElement>();
	const onChange = useCallback((value: string, viewUpdate) => {
		console.log("value:", value);
	}, []);
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = e.target.value;
		setUserInput(inputValue);
	}
	return (
		<div className="App">
			<div className="list">
				{["a", "b", "c", "d"].map((num) => {
					return <li>{num}</li>;
				})}
			</div>
			<div className="editor-container">
				<CodeMirror
					value="random text"
					onChange={onChange}
					maxWidth="100%"
					minHeight="100vh"
					extensions={[vim()]}
					basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
				/>
			</div>
		</div>
	);
}

export default App;

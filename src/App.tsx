import React, { useRef, useState, useCallback } from "react";
import "./App.scss";
import CodeMirror, { getStatistics } from "@uiw/react-codemirror";
import { vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css";
interface InputProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => null;
}
interface CallbackProps {}
function App() {
	const [count, setCount] = useState(0);
	const [userInput, setUserInput] = useState<string>(`
# Header 1
## jsCode snippet and some shit that i dont understand
`);
	const [editorLines, setEditorLines] = useState<number>();
	const editorRef = useRef<HTMLTextAreaElement>();
	const onChange = useCallback((value: string, viewUpdate) => {
		setUserInput(value);
	}, []);
	const [resizeWidth, setResizeWidth] = useState<string>();
	interface CurrentMousePos {
		x: number;
		y: number;
	}
	let currentMousePos: CurrentMousePos = { x: 0, y: 0 };

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const inputValue: string = e.target.value;
		setUserInput(inputValue);
	}
	function handleWidthResize(e: React.MouseEvent<HTMLDivElement>) {
		console.log("clicked");
		const slider = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
		currentMousePos = { ...slider };
		console.log(currentMousePos);
	}

	return (
		<div className="App">
			<div className="editor-container">
				<CodeMirror
					value={userInput}
					onChange={onChange}
					maxWidth="100%"
					minHeight="100vh"
					extensions={[
						vim(),
						markdown({
							base: markdownLanguage,
							codeLanguages: languages,
							addKeymap: true,
						}),
					]}
					basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
					onCreateEditor={(view, state) => {
						console.log(state.doc);
						console.log("vim");
					}}
					onUpdate={(viewUp) => {
						console.log(getStatistics(viewUp).lineCount);
					}}
				/>
			</div>
			<div className="markdown-wrapper">
				<div onClick={handleWidthResize} className="sheet-slider"></div>
				<div style={{ width: resizeWidth }} className="sheet markdown-body">
					<ReactMarkdown
						children={userInput}
						remarkPlugins={[remarkGfm]}
						components={{
							code({ node, inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter
										{...props}
										children={String(children).replace(/\n$/, "")}
										style={dark}
										language={match[1]}
										PreTag="div"
									/>
								) : (
									<code {...props} className={className}>
										{children}
									</code>
								);
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;

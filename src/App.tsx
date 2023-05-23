import React, { useRef, useState, useCallback, useEffect } from "react";
import "./App.scss";
import CodeMirror, { getStatistics } from "@uiw/react-codemirror";
import { Vim, vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css";
import SplitPane from "split-pane-react/esm/SplitPane";
import { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
interface InputProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => null;
}
interface CurrentMousePos {
	x: number;
	y: number;
}
function App() {
	const [count, setCount] = useState(0);
	const [sizes, setSizes] = useState(["15%", "50%"]);
	const [searchInput, setSearchInput] = useState<string>("");
	const [userInput, setUserInput] = useState<string>(`
# Header 1
## jsCode snippet and some shit that i dont understand
		This is a code snippet
>Line break  
>Another Line Break

### This is a list
1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3


`);

	const projList = [
		{ title: "random title" },
		{ title: "lol titlem, query strings" },
		{ title: "lol title, query strings" },
		{ title: "This is a vim markdown app" },
		{ title: "I love vim" },
	];

	const onChange = useCallback((value: string, viewUpdate) => {
		setUserInput(value);
	}, []);

	const handleOnChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const target: string = e.target.value;
			setSearchInput(target);
		},
		[]
	);
	Vim.defineEx("write", "w", () => {
		console.log("Write");
	});
	Vim.defineEx("quit", "q", () => {
		console.log("Quit");
		setSizes(["auto", "0%"]);
	});
	return (
		<div className="App">
			<SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
				<Pane className="pane" maxSize={"20%"} minSize={"0px"}>
					<div>
						<input
							type="search"
							value={searchInput}
							onChange={handleOnChange}
						/>
						{projList.map((proj, i) => {
							return <li key={i}>{proj.title}</li>;
						})}
					</div>
				</Pane>
				<Pane className="pane" maxSize={"50%"} minSize={"0px"}>
					<div className="editor-container">
						<CodeMirror
							value={userInput}
							onChange={onChange}
							minWidth="100%"
							height="100%"
							extensions={[
								vim(),
								markdown({
									base: markdownLanguage,
									codeLanguages: languages,
									addKeymap: true,
								}),
							]}
							basicSetup={{
								lineNumbers: true,
								highlightActiveLine: false,
							}}
							onCreateEditor={(view, state) => {
								console.log(state.doc);
								console.log("vim");
							}}
						/>
					</div>
				</Pane>
				<div className="md markdown-body">
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
			</SplitPane>
		</div>
	);
}

export default App;

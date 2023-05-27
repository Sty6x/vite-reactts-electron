import React, { useRef, useState, useCallback, useEffect } from "react";
import "./App.scss";
import CodeMirror, { getStatistics } from "@uiw/react-codemirror";
import { Vim, vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as prismMD } from "react-syntax-highlighter/dist/esm/styles/prism";
import { materialDark } from "@uiw/codemirror-theme-material";
import { nord } from "@uiw/codemirror-theme-nord";
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
	const [sizes, setSizes] = useState(["50%"]);
	const [searchInput, setSearchInput] = useState<string>("");

	const [noteLists, setNoteLists] = useState([
		{ title: "random title" },
		{ title: "lol titlem, query strings" },
		{ title: "lol title, query strings" },
		{ title: "This is a vim markdown app" },
		{ title: "I love vim" },
	]);
	const originalNotes = useRef([...noteLists]);
	const [userInput, setUserInput] = useState<string>(`This is a title
# Header 1
## jsCode snippet and some shit that i dont understand
		This is a code snippet
>Line break  
>Another Line Break

### This is a list
1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

\`\`\`js
const searchQuery = useCallback(
	(input: string, noteList: Array<{ title: string }>) => {
			const filterNotes = noteList.filter((note) => {
				return note.title.includes(input) && note;
			});
			console.log(filterNotes);
			if (input !== "") {
				return setNoteLists(filterNotes);
			}
			return setNoteLists(originalNotes);
		},
		[]
	);
\`\`\`\
`);

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
		setSizes(["0%"]);
	});

	const searchQuery = useCallback(
		(input: string, noteList: Array<{ title: string }>) => {
			const filterNotes = noteList.filter((note) => {
				return note.title.includes(input) && note;
			});
			console.log(filterNotes);
			if (input !== "") {
				return setNoteLists(filterNotes);
			}
			return setNoteLists(originalNotes.current);
		},
		[]
	);

	useEffect(() => {
		console.log(searchInput);
		console.log(noteLists);
		searchQuery(searchInput, noteLists);
	}, [searchInput]);

	return (
		<div className="App">
			<div>
				<input
					type="search"
					value={searchInput}
					onChange={handleOnChange}
				/>
				{noteLists.map((note, i) => {
					return <li key={i}>{note.title}</li>;
				})}
			</div>
			<SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
				<Pane className="pane" maxSize={"50%"} minSize={"1px"}>
					<div className="editor-container">
						<CodeMirror
							theme={materialDark}
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
								// highlightActiveLine: false,
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
										showLineNumbers={true}
										children={String(children).replace(/\n$/, "")}
										style={prismMD}
										// useInlineStyles={false}
										customStyle={{ borderRadius: "10px", margin: 0 }}
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

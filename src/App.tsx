import { useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.scss";
import { Status } from "./components/Status";
import { Heading } from "./components/Heading";
console.log(
	"[App.tsx]",
	`Hello world from Electron ${process.versions.electron}!`
);

function App() {
	const [count, setCount] = useState(0);
	return (
		<div className="App">
			<Heading>Child of Heading</Heading>
			<Status status="error" />
		</div>
	);
}

export default App;

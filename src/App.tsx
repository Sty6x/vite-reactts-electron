import { useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.scss";
console.log(
	"[App.tsx]",
	`Hello world from Electron ${process.versions.electron}!`
);

function App() {
	const [count, setCount] = useState(0);
	return (
		<div className="App">
			<div className="logo-box">
				<a
					href="https://github.com/electron-vite/electron-vite-react"
					target="_blank"
				>
					<img
						src={logoVite}
						className="logo vite"
						alt="Electron + Vite logo"
					/>
					<img
						src={logoElectron}
						className="logo electron"
						alt="Electron + Vite logo"
					/>
				</a>
			</div>
			<h1>Electron + Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
		</div>
	);
}

export default App;

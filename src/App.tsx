import { useRef, useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.scss";
import { Status } from "./components/Status";
import { Heading } from "./components/Heading";
import { Actor } from "./components/Actor";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
console.log(
	"[App.tsx]",
	`Hello world from Electron ${process.versions.electron}!`
);

function App() {
	const [count, setCount] = useState(0);
	return (
		<div className="App">
			<Status status="error" />
			<Actor>
				<Heading>Heading on Actor</Heading>
			</Actor>

			<Input
				value=""
				handleChange={(event) => {
					console.log(event.target.value);
				}}
			/>
			<Button
				handleClick={(e) => {
					console.log(e.target);
					console.log("button clicked");
				}}
			>
				Click Me
			</Button>
		</div>
	);
}

export default App;

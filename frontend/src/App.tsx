import { Navbar } from "./components/layout/Navbar";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <AppRoutes />
        </main>
    );
}

export default App;
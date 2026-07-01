import { SiteProvider } from "./context/SiteContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
    return (
        <SiteProvider>
            <main className="min-h-screen bg-zinc-950 text-white">
                <AppRoutes />
            </main>
        </SiteProvider>
    );
}

export default App;
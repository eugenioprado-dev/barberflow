import { Hero } from "./components/sections/Hero";
import { Navbar } from "./components/layout/Navbar";

function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
    </main>
  );
}

export default App;
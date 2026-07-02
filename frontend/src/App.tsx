import { AppRoutes } from "./routes/AppRoutes";
import { SiteProvider } from "./context/SiteContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ProfessionalProvider } from "./context/ProfessionalContext";
import { ServiceProvider } from "./context/ServiceContext";

function App() {
    return (
        <SiteProvider>
            <CategoryProvider>
                <ProfessionalProvider>
                    <ServiceProvider>
                        <AppRoutes />
                    </ServiceProvider>
                </ProfessionalProvider>
            </CategoryProvider>
        </SiteProvider>
    );
}

export default App;
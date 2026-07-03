import { AppRoutes } from "./routes/AppRoutes";
import { SiteProvider } from "./context/SiteContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ProfessionalProvider } from "./context/ProfessionalContext";
import { ServiceProvider } from "./context/ServiceContext";
import { GalleryProvider } from "./context/GalleryContext";

function App() {
    return (
        <SiteProvider>
            <CategoryProvider>
                <ProfessionalProvider>
                    <ServiceProvider>
                        <GalleryProvider>
                            <AppRoutes />
                        </GalleryProvider>
                    </ServiceProvider>
                </ProfessionalProvider>
            </CategoryProvider>
        </SiteProvider>
    );
}

export default App;
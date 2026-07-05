import { AppRoutes } from "./routes/AppRoutes";

import { SiteProvider } from "./context/SiteContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ProfessionalProvider } from "./context/ProfessionalContext";
import { ServiceProvider } from "./context/ServiceContext";
import { GalleryProvider } from "./context/GalleryContext";
import { TestimonialProvider } from "./context/TestimonialContext";

function App() {
    return (
        <SiteProvider>
            <CategoryProvider>
                <ProfessionalProvider>
                    <ServiceProvider>
                        <GalleryProvider>
                            <TestimonialProvider>
                                <AppRoutes />
                            </TestimonialProvider>
                        </GalleryProvider>
                    </ServiceProvider>
                </ProfessionalProvider>
            </CategoryProvider>
        </SiteProvider>
    );
}

export default App;
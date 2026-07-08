import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { SiteProvider } from "./context/SiteContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ProfessionalProvider } from "./context/ProfessionalContext";
import { ServiceProvider } from "./context/ServiceContext";
import { GalleryProvider } from "./context/GalleryContext";
import { TestimonialProvider } from "./context/TestimonialContext";

function App() {
    return (
        <AuthProvider>
            <SiteProvider>
                <CategoryProvider>
                    <ProfessionalProvider>
                        <ServiceProvider>
                            <GalleryProvider>
                                <TestimonialProvider>
                                    <AppRoutes />

                                    <Toaster
                                        position="top-right"
                                        toastOptions={{
                                            style: {
                                                background: "#18181b",
                                                color: "#fff",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                            },
                                            success: {
                                                iconTheme: {
                                                    primary: "#f59e0b",
                                                    secondary: "#000",
                                                },
                                            },
                                        }}
                                    />
                                </TestimonialProvider>
                            </GalleryProvider>
                        </ServiceProvider>
                    </ProfessionalProvider>
                </CategoryProvider>
            </SiteProvider>
        </AuthProvider>
    );
}

export default App;
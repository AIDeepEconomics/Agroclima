import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { WeatherDataProvider } from "@/lib/providers/WeatherDataProvider";
import { CropProvider } from "@/lib/providers/CropProvider";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Historical from "@/pages/Historical";
import Forecast from "@/pages/Forecast";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import AgriculturalRisk from "@/pages/AgriculturalRisk";
import CropManagement from "@/pages/CropManagement";
import FieldManagement from "@/pages/FieldManagement";
import Recommendations from "@/pages/Recommendations";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/historical" component={Historical} />
      <Route path="/forecast" component={Forecast} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={Help} />
      
      {/* Agricultural routes */}
      <Route path="/agricultural-risk" component={AgriculturalRisk} />
      <Route path="/crop-management" component={CropManagement} />
      <Route path="/field-management" component={FieldManagement} />
      <Route path="/recommendations" component={Recommendations} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WeatherDataProvider>
          <CropProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </CropProvider>
        </WeatherDataProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

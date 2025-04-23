import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { WeatherDataProvider } from "@/lib/providers/WeatherDataProvider";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Historical from "@/pages/Historical";
import Forecast from "@/pages/Forecast";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/historical" component={Historical} />
      <Route path="/forecast" component={Forecast} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={Help} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WeatherDataProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WeatherDataProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

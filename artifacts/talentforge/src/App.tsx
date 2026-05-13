import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Landing } from "@/pages/Landing";
import { Dashboard } from "@/pages/Dashboard";
import { TalentDiscovery } from "@/pages/TalentDiscovery";
import { CandidatePortfolio } from "@/pages/CandidatePortfolio";
import { Pipeline } from "@/pages/Pipeline";
import { Projects } from "@/pages/Projects";
import { Payments } from "@/pages/Payments";
import { Reviewer } from "@/pages/Reviewer";
import { Settings } from "@/pages/Settings";
import { Layout } from "@/components/layout/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard"><Layout><Dashboard /></Layout></Route>
      <Route path="/talent"><Layout><TalentDiscovery /></Layout></Route>
      <Route path="/candidate/:id"><Layout><CandidatePortfolio /></Layout></Route>
      <Route path="/pipeline"><Layout><Pipeline /></Layout></Route>
      <Route path="/projects"><Layout><Projects /></Layout></Route>
      <Route path="/payments"><Layout><Payments /></Layout></Route>
      <Route path="/reviewer"><Layout><Reviewer /></Layout></Route>
      <Route path="/settings"><Layout><Settings /></Layout></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;

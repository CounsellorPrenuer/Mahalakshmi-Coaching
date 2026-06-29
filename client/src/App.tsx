import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { FloatingContactFAB } from "@/components/FloatingContactFAB";
import { SITE_BASE } from "@/lib/config";
import Home from "@/pages/Home";
import ServiceDetail from "@/pages/ServiceDetail";
import NotFound from "@/pages/not-found";
import PlansPage from "@/pages/Plans";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import TestimonialsPage from "@/pages/TestimonialsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/service/:service" component={ServiceDetail} />
      <Route path="/plans" component={PlansPage} />
      <Route path="/pricing" component={PlansPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={SITE_BASE}>
            <CustomCursor />
            <ScrollProgress />
            <Router />
            <BackToTop />
            <FloatingContactFAB />
            <Toaster />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Eye, MessageSquare, Settings, LogOut, PlusCircle, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [portfolioExists, setPortfolioExists] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Get user profile and portfolio
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", session.user.id)
      .single();

    if (profile) {
      setUsername(profile.username);
    }

    const { data: portfolio } = await supabase
      .from("portfolios")
      .select("id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    setPortfolioExists(!!portfolio);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Folio AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ThemeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch between Orange and Blue accent themes</p>
              </TooltipContent>
            </Tooltip>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground text-lg">
              {portfolioExists ? "Manage your portfolio" : "Let's create your stunning portfolio"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/builder")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-2">
                  {portfolioExists ? <Edit className="w-6 h-6 text-accent-foreground" /> : <PlusCircle className="w-6 h-6 text-accent-foreground" />}
                </div>
                <CardTitle>{portfolioExists ? "Edit Portfolio" : "Build Portfolio"}</CardTitle>
                <CardDescription>
                  {portfolioExists ? "Update your profile, skills, and projects" : "Create your portfolio with our step-by-step builder"}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className={`hover:shadow-lg transition-shadow ${portfolioExists ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
              onClick={() => portfolioExists && navigate(`/u/${username}`)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-2">
                  <Eye className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Preview Portfolio</CardTitle>
                <CardDescription>
                  {portfolioExists ? "See how your portfolio looks to visitors" : "Create a portfolio first"}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/chat")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-2">
                  <MessageSquare className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Edit your portfolio using natural language commands
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-2">
                  <Settings className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account and preferences
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {!portfolioExists && (
            <Card className="border-primary/20 bg-accent/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Ready to get started?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your professional portfolio in just a few minutes. Add your profile, skills, and showcase your best projects.
                    </p>
                    <Button onClick={() => navigate("/builder")}>
                      Start Building
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

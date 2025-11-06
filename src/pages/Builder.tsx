import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProfileStep from "@/components/builder/ProfileStep";
import AboutStep from "@/components/builder/AboutStep";
import SkillsStep from "@/components/builder/SkillsStep";
import ProjectsStep from "@/components/builder/ProjectsStep";
import PreviewStep from "@/components/builder/PreviewStep";

export interface PortfolioData {
  profile: {
    name: string;
    tagline: string;
    image: string;
  };
  about: string;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    techStack: string[];
    links: { github?: string; live?: string };
    image: string;
  }>;
}

const Builder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    profile: { name: "", tagline: "", image: "" },
    about: "",
    skills: [],
    projects: [],
  });

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Load existing portfolio if it exists
    const { data: portfolio } = await supabase
      .from("portfolios")
      .select(`
        *,
        skills(skill),
        projects(*)
      `)
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (portfolio) {
      setPortfolioData({
        profile: {
          name: portfolio.name,
          tagline: portfolio.tagline || "",
          image: portfolio.profile_image || "",
        },
        about: portfolio.about || "",
        skills: portfolio.skills?.map((s: any) => s.skill) || [],
        projects: portfolio.projects?.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description || "",
          techStack: p.tech_stack || [],
          links: {
            github: p.github || undefined,
            live: p.live || undefined,
          },
          image: p.image || "",
        })) || [],
      });
    }

    setLoading(false);
  };

  const steps = [
    { id: "profile", label: "Profile", component: ProfileStep },
    { id: "about", label: "About", component: AboutStep },
    { id: "skills", label: "Skills", component: SkillsStep },
    { id: "projects", label: "Projects", component: ProjectsStep },
    { id: "preview", label: "Preview", component: PreviewStep },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // Upsert portfolio
      const { data: portfolio, error: portfolioError } = await supabase
        .from("portfolios")
        .upsert({
          user_id: session.user.id,
          name: portfolioData.profile.name,
          tagline: portfolioData.profile.tagline,
          about: portfolioData.about,
          profile_image: portfolioData.profile.image,
        })
        .select()
        .single();

      if (portfolioError) throw portfolioError;

      // Delete existing skills and projects
      await supabase.from("skills").delete().eq("portfolio_id", portfolio.id);
      await supabase.from("projects").delete().eq("portfolio_id", portfolio.id);

      // Insert new skills
      if (portfolioData.skills.length > 0) {
        const { error: skillsError } = await supabase
          .from("skills")
          .insert(
            portfolioData.skills.map((skill) => ({
              portfolio_id: portfolio.id,
              skill,
            }))
          );
        if (skillsError) throw skillsError;
      }

      // Insert new projects
      if (portfolioData.projects.length > 0) {
        const { error: projectsError } = await supabase
          .from("projects")
          .insert(
            portfolioData.projects.map((project) => ({
              portfolio_id: portfolio.id,
              title: project.title,
              description: project.description,
              tech_stack: project.techStack,
              github: project.links.github,
              live: project.links.live,
              image: project.image,
            }))
          );
        if (projectsError) throw projectsError;
      }

      toast({
        title: "Portfolio saved!",
        description: "Your portfolio has been updated successfully.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Portfolio Builder</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1 relative">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        index <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-colors ${
                          index < currentStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                  <div className="absolute top-12 left-0 text-sm font-medium whitespace-nowrap">
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="mt-16">
            <CurrentStepComponent
              data={portfolioData}
              updateData={setPortfolioData}
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Portfolio"}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;

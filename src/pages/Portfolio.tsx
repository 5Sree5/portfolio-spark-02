import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Mail, Linkedin, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Portfolio {
  name: string;
  tagline: string;
  image: string;
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

const Portfolio = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolio();
  }, [username]);

  const loadPortfolio = async () => {
    try {
      // Get profile by username
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) {
        setPortfolio(null);
        setLoading(false);
        return;
      }

      // Get portfolio with skills and projects
      const { data: portfolioData, error: portfolioError } = await supabase
        .from("portfolios")
        .select(`
          *,
          skills(skill),
          projects(*)
        `)
        .eq("user_id", profile.id)
        .maybeSingle();

      if (portfolioError) throw portfolioError;

      if (portfolioData) {
        setPortfolio({
          name: portfolioData.name,
          tagline: portfolioData.tagline || "",
          image: portfolioData.profile_image || "",
          about: portfolioData.about || "",
          skills: portfolioData.skills?.map((s: any) => s.skill) || [],
          projects: portfolioData.projects?.map((p: any) => ({
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
      } else {
        setPortfolio(null);
      }
    } catch (error) {
      console.error("Error loading portfolio:", error);
      setPortfolio(null);
    } finally {
      setLoading(false);
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

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Portfolio not found</h1>
          <p className="text-muted-foreground">User @{username} doesn't exist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={portfolio.image}
              alt={portfolio.name}
              className="w-40 h-40 rounded-full object-cover ring-4 ring-primary/20"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{portfolio.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{portfolio.tagline}</p>
              <div className="flex gap-3 justify-center md:justify-start">
                <Button size="sm" variant="outline">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button size="sm" variant="outline">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed">{portfolio.about}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Skills</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 pb-24">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Projects</h2>
          <div className="grid gap-6">
            {portfolio.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full md:w-64 h-48 object-cover"
                  />
                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.links.github && (
                          <Button size="sm" variant="outline">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        )}
                        {project.links.live && (
                          <Button size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

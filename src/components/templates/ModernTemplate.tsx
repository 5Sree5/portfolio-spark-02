import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioData {
  name: string;
  tagline: string;
  profileImage?: string;
  about: string;
  skills: Array<{ skill: string }>;
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    github?: string;
    live?: string;
    image?: string;
  }>;
}

export const ModernTemplate = ({ data }: { data: PortfolioData }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero - Modern with gradient */}
      <section className="relative overflow-hidden bg-gradient-accent py-20 px-4">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {data.profileImage && (
            <img
              src={data.profileImage}
              alt={data.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary mx-auto mb-6 shadow-glow"
            />
          )}
          <h1 className="text-5xl font-bold mb-3">{data.name}</h1>
          <p className="text-xl text-muted-foreground mb-6">{data.tagline}</p>
          <div className="flex justify-center gap-3">
            <Button size="lg" variant="default" className="shadow-glow">
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </Button>
            <Button size="lg" variant="outline">
              Copy Profile Link
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* About */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{data.about}</p>
        </section>

        {/* Skills - Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.skills.map((s, i) => (
              <Card key={i} className="hover:shadow-glow transition-all">
                <CardContent className="p-4 text-center">
                  <p className="font-medium">{s.skill}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects - Cards */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-glow transition-all">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, j) => (
                      <Badge key={j} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

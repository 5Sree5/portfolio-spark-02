import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Mail, MapPin, Globe } from "lucide-react";
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

export const CompactTemplate = ({ data }: { data: PortfolioData }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero - Compact */}
      <section className="py-12 px-4 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          {data.profileImage && (
            <img
              src={data.profileImage}
              alt={data.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-1">{data.name}</h1>
            <p className="text-muted-foreground mb-3">{data.tagline}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="default">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button size="sm" variant="outline">
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* About */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-primary">About</h2>
          <p className="text-muted-foreground leading-relaxed">{data.about}</p>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-primary">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <Badge key={i} variant="secondary">{s.skill}</Badge>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-32 h-24 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.techStack.map((tech, j) => (
                          <Badge key={j} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="ghost"><Github className="w-4 h-4" /></Button>
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="ghost"><ExternalLink className="w-4 h-4" /></Button>
                          </a>
                        )}
                      </div>
                    </div>
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

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
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

export const ClassicTemplate = ({ data }: { data: PortfolioData }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero - Classic with sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                {data.profileImage && (
                  <img
                    src={data.profileImage}
                    alt={data.name}
                    className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-2 border-primary"
                  />
                )}
                <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
                <p className="text-muted-foreground mb-4">{data.tagline}</p>
                <Button className="w-full mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
                <Button variant="outline" className="w-full">
                  Copy Link
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-primary">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{s.skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="space-y-8">
            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-primary">About</h2>
                <p className="text-muted-foreground leading-relaxed">{data.about}</p>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-primary">Projects</h2>
                <div className="space-y-6">
                  {data.projects.map((project, i) => (
                    <div key={i} className="border-b border-border last:border-0 pb-6 last:pb-0">
                      <div className="flex gap-4">
                        {project.image && (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-48 h-32 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.techStack.map((tech, j) => (
                              <Badge key={j} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                  <Github className="w-4 h-4 mr-2" />
                                  GitHub
                                </Button>
                              </a>
                            )}
                            {project.live && (
                              <a href={project.live} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="default">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

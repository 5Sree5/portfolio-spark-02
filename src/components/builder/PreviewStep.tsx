import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortfolioData } from "@/pages/Builder";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewStepProps {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
}

const PreviewStep = ({ data }: PreviewStepProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Portfolio Preview</h2>
          <p className="text-muted-foreground mb-6">
            This is how your portfolio will look to visitors. Review everything before saving.
          </p>

          {/* Profile Preview */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {data.profile.image && (
                <img
                  src={data.profile.image}
                  alt={data.profile.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold">{data.profile.name || "Your Name"}</h3>
                <p className="text-muted-foreground">{data.profile.tagline || "Your Tagline"}</p>
              </div>
            </div>
          </div>

          {/* About Preview */}
          {data.about && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-2">About</h4>
              <p className="text-muted-foreground">{data.about}</p>
            </div>
          )}

          {/* Skills Preview */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Projects Preview */}
          {data.projects.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Projects</h4>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="pt-6">
                      <h5 className="font-semibold text-lg mb-2">{project.title}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      {project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
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
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewStep;

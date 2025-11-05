import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioData } from "@/pages/Builder";
import { Plus, X, Upload, Trash2 } from "lucide-react";

interface ProjectsStepProps {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
}

const ProjectsStep = ({ data, updateData }: ProjectsStepProps) => {
  const [showForm, setShowForm] = useState(false);
  const [currentProject, setCurrentProject] = useState<{
    id: string;
    title: string;
    description: string;
    techStack: string[];
    links: { github?: string; live?: string };
    image: string;
  }>({
    id: "",
    title: "",
    description: "",
    techStack: [] as string[],
    links: { github: "", live: "" },
    image: "",
  });
  const [newTech, setNewTech] = useState("");

  const addProject = () => {
    if (currentProject.title && currentProject.description) {
      const projectToAdd = {
        ...currentProject,
        id: currentProject.id || Date.now().toString(),
      };
      
      if (currentProject.id) {
        // Update existing project
        updateData({
          ...data,
          projects: data.projects.map((p) =>
            p.id === currentProject.id ? projectToAdd : p
          ),
        });
      } else {
        // Add new project
        updateData({
          ...data,
          projects: [...data.projects, projectToAdd],
        });
      }
      
      resetForm();
    }
  };

  const resetForm = () => {
    setCurrentProject({
      id: "",
      title: "",
      description: "",
      techStack: [],
      links: { github: "", live: "" },
      image: "",
    });
    setShowForm(false);
  };

  const editProject = (project: typeof currentProject) => {
    setCurrentProject(project);
    setShowForm(true);
  };

  const removeProject = (id: string) => {
    updateData({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  const addTech = () => {
    if (newTech.trim() && !currentProject.techStack.includes(newTech.trim())) {
      setCurrentProject({
        ...currentProject,
        techStack: [...currentProject.techStack, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const removeTech = (tech: string) => {
    setCurrentProject({
      ...currentProject,
      techStack: currentProject.techStack.filter((t) => t !== tech),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            Showcase your best work and projects you've built.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          )}

          {showForm && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  placeholder="E-commerce Platform"
                  value={currentProject.title}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-desc">Description</Label>
                <Textarea
                  id="project-desc"
                  placeholder="A full-featured online store with..."
                  rows={4}
                  value={currentProject.description}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="e.g., React, Node.js"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                  />
                  <Button type="button" size="sm" onClick={addTech}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {currentProject.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(tech)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL (optional)</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/..."
                    value={currentProject.links.github}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        links: { ...currentProject.links, github: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="live">Live URL (optional)</Label>
                  <Input
                    id="live"
                    placeholder="https://example.com"
                    value={currentProject.links.live}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        links: { ...currentProject.links, live: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Image (optional)</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={currentProject.image}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, image: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={addProject}>
                  {currentProject.id ? "Update Project" : "Add Project"}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {data.projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Projects ({data.projects.length})</h3>
          {data.projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => editProject(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                {project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsStep;

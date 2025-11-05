import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioData } from "@/pages/Builder";
import { Plus, X } from "lucide-react";

interface SkillsStepProps {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
}

const SkillsStep = ({ data, updateData }: SkillsStepProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      updateData({
        ...data,
        skills: [...data.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateData({
      ...data,
      skills: data.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Add your technical skills, tools, and technologies you work with.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="skill">Add Skill</Label>
          <div className="flex gap-2">
            <Input
              id="skill"
              placeholder="e.g., React, Python, Docker"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button type="button" onClick={addSkill}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="space-y-2">
            <Label>Your Skills ({data.skills.length})</Label>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm py-2 px-3">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {data.skills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No skills added yet. Start adding your skills above.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsStep;

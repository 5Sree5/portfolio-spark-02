import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioData } from "@/pages/Builder";

interface AboutStepProps {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
}

const AboutStep = ({ data, updateData }: AboutStepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
        <CardDescription>
          Share your story, experience, and what makes you unique.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            placeholder="I'm a passionate developer with 5+ years of experience building web applications..."
            rows={8}
            value={data.about}
            onChange={(e) =>
              updateData({
                ...data,
                about: e.target.value,
              })
            }
          />
          <p className="text-sm text-muted-foreground">
            Tell visitors about your background, experience, and interests (minimum 100 characters)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutStep;

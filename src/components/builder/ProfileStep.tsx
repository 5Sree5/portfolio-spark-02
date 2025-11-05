import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioData } from "@/pages/Builder";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileStepProps {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
}

const ProfileStep = ({ data, updateData }: ProfileStepProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement actual image upload
      const imageUrl = URL.createObjectURL(file);
      updateData({
        ...data,
        profile: { ...data.profile, image: imageUrl },
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Tell us about yourself. This will be the first thing visitors see.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={data.profile.name}
            onChange={(e) =>
              updateData({
                ...data,
                profile: { ...data.profile, name: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            placeholder="Full-stack Developer & Designer"
            value={data.profile.tagline}
            onChange={(e) =>
              updateData({
                ...data,
                profile: { ...data.profile, tagline: e.target.value },
              })
            }
          />
          <p className="text-sm text-muted-foreground">
            A short description that appears under your name
          </p>
        </div>

        <div className="space-y-2">
          <Label>Profile Image</Label>
          <div className="flex items-center gap-4">
            {data.profile.image ? (
              <img
                src={data.profile.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStep;

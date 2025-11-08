import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Eye, MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary mb-6">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Build Your Portfolio<br />in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create a stunning professional portfolio with our AI-powered builder. 
            No coding required, just your creativity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="transition-all hover:scale-105 hover:shadow-glow"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/builder")}
              className="transition-all hover:scale-105"
            >
              Try Builder
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 group-hover:shadow-glow">
                <Zap className="w-8 h-8 text-accent-foreground transition-transform group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Build your portfolio in minutes with our intuitive step-by-step builder
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 group-hover:shadow-glow">
                <Eye className="w-8 h-8 text-accent-foreground transition-transform group-hover:scale-125" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Beautiful Design</h3>
              <p className="text-muted-foreground">
                Professional templates that make your work shine and impress recruiters
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 group-hover:shadow-glow">
                <MessageSquare className="w-8 h-8 text-accent-foreground transition-transform group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-muted-foreground">
                Edit your portfolio using natural language with our AI chat assistant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-card rounded-3xl p-12 shadow-lg transition-all hover:shadow-glow hover:scale-[1.02]">
          <h2 className="text-4xl font-bold mb-4">Ready to Stand Out?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who've built their portfolios with us
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="transition-all hover:scale-105 hover:shadow-glow"
          >
            Create Your Portfolio
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Portfolio Builder. Built with ❤️ for creators.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

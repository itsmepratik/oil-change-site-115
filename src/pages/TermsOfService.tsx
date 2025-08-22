import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <div className="container px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/" className="inline-flex items-center mb-8 text-primary hover:text-primary-glow transition-colors">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="glass rounded-xl p-8 lg:p-12">
              <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Terms of Service
              </h1>
              
              <div className="prose prose-lg max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing and using our services, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to these terms, you should not 
                    use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
                  <p className="text-muted-foreground mb-4">
                    Our platform provides automotive maintenance and repair services including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Oil change services</li>
                    <li>Battery replacement and maintenance</li>
                    <li>Spare parts supply and installation</li>
                    <li>General automotive maintenance</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                  <p className="text-muted-foreground mb-4">
                    When using our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the confidentiality of your account</li>
                    <li>Use the service only for lawful purposes</li>
                    <li>Pay all fees and charges incurred</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
                  <p className="text-muted-foreground">
                    We strive to provide continuous service availability, but we cannot guarantee 
                    uninterrupted access. We reserve the right to modify, suspend, or discontinue 
                    any part of our service with or without notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground">
                    Our liability is limited to the maximum extent permitted by law. We are not 
                    responsible for any indirect, incidental, special, or consequential damages 
                    arising from your use of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                    <p className="font-medium">Email: legal@autocare.com</p>
                    <p className="font-medium">Phone: (555) 123-4567</p>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
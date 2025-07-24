import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BarChart, MessageSquare, Shield } from 'lucide-react';
import Link from "next/link";

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="glass-card text-center transform hover:-translate-y-2 transition-transform duration-300">
    <CardHeader>
      <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full">
        <Icon className="h-8 w-8" />
      </div>
      <CardTitle className="text-xl font-bold mt-4 text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-2xl text-gray-800">
          Incidencias<span className="text-primary">SEP</span>
        </div>
        <nav>
          <Link href="/login">
            <Button variant="ghost">Iniciar Sesión</Button>
          </Link>
          <Link href="/register">
            <Button className="ml-2">Registrarse</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Documenta incidentes escolares <br />
          <span className="text-primary">con la velocidad de una conversación.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Nuestra plataforma con IA transforma la manera en que las escuelas registran y gestionan incidencias,
          asegurando el cumplimiento de protocolos y priorizando el bienestar estudiantil.
        </p>
        <div className="flex gap-4">
          <Link href="/chat">
            <Button size="lg" className="text-lg px-8 py-6">
              <MessageSquare className="mr-2 h-5 w-5" />
              Comenzar a Documentar
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <BarChart className="mr-2 h-5 w-5" />
              Ver Dashboard
            </Button>
          </Link>
        </div>
      </main>

      <section id="features" className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Una plataforma diseñada para la excelencia educativa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="IA Conversacional"
              description="Documenta incidentes hablando o escribiendo. Nuestra IA te guía en cada paso."
            />
            <FeatureCard
              icon={Shield}
              title="Cumplimiento de Protocolos"
              description="Adaptado a los protocolos locales y nacionales para garantizar la seguridad jurídica."
            />
            <FeatureCard
              icon={BarChart}
              title="Análisis y Reportes"
              description="Visualiza datos, detecta patrones y genera reportes ejecutivos con un solo clic."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Flujos Automatizados"
              description="Notificaciones automáticas, escalamiento de casos y recordatorios inteligentes."
            />
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Secretaría de Educación Pública. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
} 
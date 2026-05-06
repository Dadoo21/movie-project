import { Film } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darker text-gray-400 py-8 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-light">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold tracking-wider uppercase text-lg">MovieProject</span>
        </div>
        
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} MovieProject per Esame. Creato con React & Tailwind.
        </p>

        <div className="flex gap-4 text-sm">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Termini</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

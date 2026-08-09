import PageTransition from '../components/PageTransition';
import ContactTerminal from '../components/ContactTerminal';

const Contact = () => {
  return (
    <PageTransition>
      <div className="py-6 pb-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <ContactTerminal />
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;

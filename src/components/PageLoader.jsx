import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-40 h-8 bg-white/5 rounded-full"
          />
          <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="w-full max-w-md h-16 bg-white/5 rounded-2xl"
          />
          <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="w-full max-w-sm h-24 bg-white/5 rounded-2xl"
          />
          <div className="flex gap-4">
            <div className="w-32 h-12 bg-white/5 rounded-xl" />
            <div className="w-32 h-12 bg-white/5 rounded-xl" />
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-white/5 rounded-[3rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;

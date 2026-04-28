import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-500 font-medium tracking-widest uppercase text-xs animate-pulse">
          Loading...
        </p>
      </motion.div>
    </div>
  );
};

export default PageLoader;

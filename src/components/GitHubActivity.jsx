import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { GitPullRequest, GitCommit, Flame, Award } from 'lucide-react';

const GitHubActivity = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 53 weeks * 7 days = 371 grid cells with contribution levels (0 to 4)
  const contributionGrid = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const grid = [];
    
    // Starting date roughly a year ago
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    
    for (let i = 0; i < 371; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Randomize levels with bias toward 0-2 for realism
      let level = 0;
      const rand = Math.random();
      if (rand > 0.85) level = 4;
      else if (rand > 0.7) level = 3;
      else if (rand > 0.55) level = 2;
      else if (rand > 0.3) level = 1;
      
      const commitCount = level === 0 ? 0 : Math.floor(Math.random() * 4) + level * 2 - 1;
      
      grid.push({
        id: i,
        date: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
        level,
        commits: commitCount
      });
    }
    return grid;
  }, []);

  const getCellColor = (level) => {
    switch (level) {
      case 1: return 'bg-primary/20 border-primary/10';
      case 2: return 'bg-primary/40 border-primary/20';
      case 3: return 'bg-primary/65 border-primary/30';
      case 4: return 'bg-primary border-primary/50 shadow-[0_0_8px_var(--primary-color)]';
      default: return 'bg-bg-base/60 border-border-main';
    }
  };

  return (
    <section className="py-24 border-t border-border-main relative overflow-hidden" id="github">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3"
          >
            Activity
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight"
          >
            GitHub Contributions
          </motion.h3>
        </div>

        {/* Board Panel */}
        <div className="glass-panel p-6 md:p-8 rounded-[2rem] max-w-5xl mx-auto border border-border-main flex flex-col gap-8">
          
          {/* Top Info row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-bg-base/40 p-4 rounded-2xl border border-border-main flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <GitCommit size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Yearly Commits</p>
                <p className="text-lg font-black text-text-main">1,482 commits</p>
              </div>
            </div>

            <div className="bg-bg-base/40 p-4 rounded-2xl border border-border-main flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#e5c07b]/10 border border-[#e5c07b]/20 flex items-center justify-center text-[#e5c07b]">
                <Flame size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Active Streak</p>
                <p className="text-lg font-black text-text-main">34 Days</p>
              </div>
            </div>

            <div className="bg-bg-base/40 p-4 rounded-2xl border border-border-main flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                <GitPullRequest size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">PRs Merged</p>
                <p className="text-lg font-black text-text-main">76 merged</p>
              </div>
            </div>

            <div className="bg-bg-base/40 p-4 rounded-2xl border border-border-main flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#56b6c2]/10 border border-[#56b6c2]/20 flex items-center justify-center text-[#56b6c2]">
                <Award size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Deployments</p>
                <p className="text-lg font-black text-text-main">48 Production</p>
              </div>
            </div>
          </div>

          {/* Grid Area Wrapper (Horizontal Scrolling on mobile) */}
          <div className="w-full overflow-x-auto pb-4 pt-6 scrollbar-thin">
            <div className="min-w-[760px] flex flex-col gap-1.5 relative">
              
              {/* Contributions Matrix */}
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-start">
                {contributionGrid.map((cell) => (
                  <div
                    key={cell.id}
                    className={`w-3 h-3 rounded-[3px] border transition-colors duration-150 relative cursor-pointer ${getCellColor(cell.level)}`}
                    onMouseEnter={() => setHoveredCell(cell)}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                ))}
              </div>

              {/* Tooltip Overlay */}
              <AnimatePresence>
                {hoveredCell && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-12 left-1/3 -translate-x-1/2 bg-[#06070b] border border-border-main px-3.5 py-1.5 rounded-xl shadow-xl z-30 pointer-events-none text-center"
                  >
                    <p className="text-[10px] font-bold text-text-main">
                      {hoveredCell.commits === 0 ? 'No commits' : `${hoveredCell.commits} commits`}
                    </p>
                    <p className="text-[9px] font-semibold text-text-muted">
                      {hoveredCell.date}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Legend indicator */}
          <div className="flex items-center justify-between text-xs font-semibold text-text-muted border-t border-border-main/50 pt-4">
            <a 
              href="https://github.com/M-talha-mumtaz" 
              target="_blank" 
              rel="noreferrer"
              className="text-primary hover:underline flex items-center gap-1.5"
            >
              View live profile <GitCommit size={14} />
            </a>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-bg-base/60 border border-border-main" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/20 border border-primary/10" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/40 border border-primary/20" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/65 border border-primary/30" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary border border-primary/50" />
              <span>More</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GitHubActivity;

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ROIStats {
  annualSavings: number;
  timeSalved: number;
  breakevenMonths: number;
  efficiencyGain: number;
  monthlySavings: number;
}

function App() {
  const [employees, setEmployees] = useState<number>(10);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(15);
  const [aiToolCost, setAiToolCost] = useState<number>(1000);
  const [automationPercent, setAutomationPercent] = useState<number>(60);

  const stats = useMemo<ROIStats>(() => {
    const totalWeeklyManualCost = employees * hourlyRate * manualHoursPerWeek;
    const weeklySavings = totalWeeklyManualCost * (automationPercent / 100);
    const monthlySavings = weeklySavings * 4.33;
    const annualSavings = weeklySavings * 52;
    const timeSavedWeekly = (employees * manualHoursPerWeek) * (automationPercent / 100);
    
    const operationalCost = aiToolCost; // monthly
    const netMonthlySavings = monthlySavings - operationalCost;
    const breakevenMonths = aiToolCost / netMonthlySavings;

    return {
      annualSavings,
      timeSalved: timeSavedWeekly * 52,
      breakevenMonths: Math.max(0, parseFloat(breakevenMonths.toFixed(1))),
      efficiencyGain: automationPercent,
      monthlySavings: netMonthlySavings
    };
  }, [employees, hourlyRate, manualHoursPerWeek, aiToolCost, automationPercent]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">ROI Strategist</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-primary transition-colors text-white">Calculator</a>
            <a href="#" className="hover:text-primary transition-colors">Methods</a>
            <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
            <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-white/90 transition-all">
              Consultation
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Inputs Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mb-4">
                Calculate AI Strategy Impact
              </h1>
              <p className="text-white/50 text-lg max-w-md">
                Quantify the technical and financial feasibility of implementing agentic workflows in your organization.
              </p>
            </div>

            <div className="grid gap-6">
              <InputGroup 
                label="Team Size"
                icon={<Users className="w-4 h-4" />}
                value={employees}
                onChange={setEmployees}
                unit="Members"
              />
              <InputGroup 
                label="Avg. Hourly Rate"
                icon={<DollarSign className="w-4 h-4" />}
                value={hourlyRate}
                onChange={setHourlyRate}
                unit="USD"
              />
              <InputGroup 
                label="Manual Hours / Week (per employee)"
                icon={<Clock className="w-4 h-4" />}
                value={manualHoursPerWeek}
                onChange={setManualHoursPerWeek}
                unit="Hours"
              />
              <InputGroup 
                label="AI Infrastructure Cost"
                icon={<Cpu className="w-4 h-4" />}
                value={aiToolCost}
                onChange={setAiToolCost}
                unit="USD/mo"
              />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <label className="text-white/60 font-medium lowercase">Automation Potential</label>
                  <span className="text-primary">{automationPercent}%</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="95"
                  value={automationPercent}
                  onChange={(e) => setAutomationPercent(parseInt(e.target.value))}
                  className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 bg-gradient-to-br from-card to-background relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp className="w-32 h-32 text-primary" />
              </div>

              <div className="relative z-10 space-y-8">
                <div>
                  <span className="text-white/40 text-sm font-semibold tracking-widest uppercase">Est. Annual Savings</span>
                  <div className="text-6xl font-bold mt-2">
                    ${stats.annualSavings.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatItem 
                    label="Time Saved" 
                    value={`${stats.timeSalved.toLocaleString()} hrs/year`}
                    icon={<Zap className="w-4 h-4 text-yellow-500" />}
                  />
                  <StatItem 
                    label="Breakeven" 
                    value={`${stats.breakevenMonths} Months`}
                    icon={<ShieldCheck className="w-4 h-4 text-primary" />}
                  />
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <h3 className="text-primary font-semibold flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4" />
                      Strategic Recommendation
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {stats.annualSavings > 100000 
                        ? "High Priority: Implementation will yield massive competitive advantage and efficiency gains."
                        : "Moderate Impact: Recommended for process optimization and future-proofing core workflows."}
                    </p>
                  </div>
                  
                  <button className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all">
                    Generate Strategic PDF Report
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <small className="text-white/30 lowercase italic col-span-3 text-center">
                *Values are estimates based on standard multi-agent implementation benchmarks.
              </small>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/20 text-sm">
          Built by Muhammad Ismail • AI Strategy & Engineering
        </div>
      </footer>
    </div>
  );
}

function InputGroup({ label, icon, value, onChange, unit }: any) {
  return (
    <div className="space-y-2">
      <label className="text-white/60 text-sm font-medium lowercase flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input 
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="input-field pr-16"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-semibold tracking-wider">
          {unit}
        </span>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon }: any) {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
      <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 mb-1">
        {icon}
        {label}
      </div>
      <div className="text-lg font-semibold text-white/90">
        {value}
      </div>
    </div>
  );
}

export default App;

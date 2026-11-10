import React from 'react';
import { BarChart3, CheckCircle2, TrendingUp, AlertCircle, ShieldAlert } from 'lucide-react';

export default function ExecutiveTab({ financials, wageSummary, sim }) {
  return (
    <div className="space-y-6">
      <div className="bg-trough-card border border-trough-border rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-trough-border">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-trough-yellow" />
              <span>Executive Benchmarks & Historical Reconciliation</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Reconciles Friday 11 September actual performance against target Owned and Hosted models.
            </p>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          {/* Card 1 */}
          <div className="bg-trough-dark p-5 rounded-2xl border border-trough-border">
            <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Sept 11 Actual Performance</div>
            <div className="text-2xl font-black text-white mt-1.5">$4,881.00</div>
            <div className="text-xs text-gray-300 mt-3 space-y-1.5">
              <div className="flex justify-between"><span>Attendees:</span> <span className="font-semibold text-white">150 PAX</span></div>
              <div className="flex justify-between"><span>Bar / POS:</span> <span className="font-semibold text-white">$2,491.00</span></div>
              <div className="flex justify-between"><span>Ticket Sales:</span> <span className="font-semibold text-white">$2,390.00</span></div>
              <div className="flex justify-between"><span>Direct Wages:</span> <span className="font-semibold text-rose-300">$1,290.00 (26.4%)</span></div>
              <div className="flex justify-between pt-2 border-t border-trough-border font-bold text-emerald-400">
                <span>Net Surplus:</span>
                <span>$2,644.00 (54.2%)</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-trough-dark p-5 rounded-2xl border border-trough-border">
            <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Trough Owned Target (200 Pax)</div>
            <div className="text-2xl font-black text-white mt-1.5">$11,000.00</div>
            <div className="text-xs text-gray-300 mt-3 space-y-1.5">
              <div className="flex justify-between"><span>Ticket Sales (100%):</span> <span className="font-semibold text-white">$6,000.00</span></div>
              <div className="flex justify-between"><span>Bar & Cloak:</span> <span className="font-semibold text-white">$5,000.00</span></div>
              <div className="flex justify-between"><span>Direct Overheads:</span> <span className="font-semibold text-rose-300">-$2,150.00</span></div>
              <div className="flex justify-between"><span>Direct Wages:</span> <span className="font-semibold text-rose-300">-$3,235.00 (29.4%)</span></div>
              <div className="flex justify-between pt-2 border-t border-trough-border font-bold text-trough-yellow">
                <span>Net Surplus:</span>
                <span>$4,475.00 (40.7%)</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-trough-dark p-5 rounded-2xl border border-trough-border">
            <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Promoter Hosted Target (200 Pax)</div>
            <div className="text-2xl font-black text-white mt-1.5">$6,000.00</div>
            <div className="text-xs text-gray-300 mt-3 space-y-1.5">
              <div className="flex justify-between"><span>$5 Ticket Clip:</span> <span className="font-semibold text-white">$1,000.00</span></div>
              <div className="flex justify-between"><span>Bar & Cloak (100%):</span> <span className="font-semibold text-white">$5,000.00</span></div>
              <div className="flex justify-between"><span>Beverage COGS (22%):</span> <span className="font-semibold text-rose-300">-$990.00</span></div>
              <div className="flex justify-between"><span>Absorbed Wages:</span> <span className="font-semibold text-rose-300">-$3,235.00 (53.9%)</span></div>
              <div className="flex justify-between pt-2 border-t border-trough-border font-bold text-trough-yellow">
                <span>Net Surplus:</span>
                <span>$1,385.00 (23.1%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Operational Takeaways */}
        <div className="mt-6 p-5 rounded-xl bg-trough-dark border border-trough-border text-xs text-gray-300 space-y-3">
          <div className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-trough-yellow" />
            <span>Strategic Guardrails & Rules of Engagement:</span>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>
              <strong className="text-white">Wage Cap Control:</strong> Roster labour must remain strictly capped at 25%–30% of turnover for owned parties, and below 50% for hosted nights.
            </li>
            <li>
              <strong className="text-white">Beverage COGS Target:</strong> Maintain bar order velocity strictly under the 22.0% gross threshold.
            </li>
            <li>
              <strong className="text-white">144-Pax Hosted Breakeven:</strong> When hosting promoters, ensure either ticket pre-sales exceed 150 patrons or collect the mandatory $550 booking deposit upfront to insulate venue wages.
            </li>
            <li>
              <strong className="text-white">Security Escalation Protocol:</strong> Minimum 2 guards at doors for up to 150 patrons (1:100 ratio); dynamically scale to 3 guards only when tickets exceed 250+.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

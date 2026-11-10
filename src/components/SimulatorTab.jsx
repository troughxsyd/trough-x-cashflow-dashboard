import React from 'react';
import { DollarSign, Users, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function SimulatorTab({
  sim,
  updateSim,
  financials,
  wageSummary,
  onResetTarget,
  onSave
}) {
  return (
    <div className="space-y-6">

      {/* Model Selector Bar */}
      <div className="bg-trough-card border border-trough-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-trough-yellow">Commercial Deal Structure</span>
          <h2 className="text-base font-bold text-white mt-0.5">
            Operating Mode: {sim.operatingMode === 'promoter' ? 'Promoter Hosted ($5 Clip)' : 'Trough Owned Party (100% Tickets)'}
          </h2>
          <p className="text-xs text-gray-400">All figures update dynamically and are editable across attendance, pricing, COGS, and wages.</p>
        </div>
        <div className="flex bg-[#13141C] p-1.5 rounded-xl border border-trough-border">
          <button
            onClick={() => updateSim('operatingMode', 'promoter')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              sim.operatingMode === 'promoter' ? 'bg-trough-yellow text-trough-dark shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Promoter Hosted ($5 Clip)
          </button>
          <button
            onClick={() => updateSim('operatingMode', 'owned')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              sim.operatingMode === 'owned' ? 'bg-trough-yellow text-trough-dark shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Trough Owned (100% Tickets)
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-trough-card border border-trough-border rounded-2xl p-4 md:p-5">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Gross Venue Revenue</div>
          <div className="text-2xl md:text-3xl font-black text-white mt-1.5">
            ${financials.totalGrossRevenue.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-trough-yellow font-medium mt-1">
            {sim.operatingMode === 'promoter' ? `$${sim.promoterTicketClip.toFixed(2)} Clip + Bar + Cloak` : 'Full Ticket Sales + Bar + Cloak'}
          </div>
        </div>

        <div className="bg-trough-card border border-trough-border rounded-2xl p-4 md:p-5">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Direct Venue Wages</div>
          <div className="text-2xl md:text-3xl font-black text-white mt-1.5">
            ${financials.totalWages.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-300 font-medium mt-1">
            {wageSummary.totalHeadcount} Staff ({wageSummary.totalHours} Shift Hours)
          </div>
        </div>

        <div className="bg-trough-card border border-trough-border rounded-2xl p-4 md:p-5">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Wages % of Revenue</div>
          <div className={`text-2xl md:text-3xl font-black mt-1.5 ${
            financials.wagesPct <= 30 ? 'text-emerald-400' : financials.wagesPct <= 45 ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {financials.wagesPct.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">
            Target &lt; 30.0% (Owned) | &lt; 50% (Hosted)
          </div>
        </div>

        <div className="bg-trough-card border border-trough-border rounded-2xl p-4 md:p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-trough-yellow/10 rounded-bl-full pointer-events-none"></div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Net Venue Surplus</div>
          <div className={`text-2xl md:text-3xl font-black mt-1.5 ${financials.netSurplus >= 0 ? 'text-trough-yellow' : 'text-rose-400'}`}>
            ${financials.netSurplus.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs font-semibold text-gray-300 mt-1">
            Margin: {financials.marginPct.toFixed(1)}%
          </div>
        </div>

      </div>

      {/* Simulator Inputs & Statement Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Direct Inputs & Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-trough-card border border-trough-border rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-trough-border">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Simulation Controls</h3>
            <button
              onClick={onResetTarget}
              className="text-xs text-trough-yellow hover:underline"
            >
              Reset Target Baseline
            </button>
          </div>

          {/* Attendance (PAX) */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-gray-300">Attendance (PAX):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={sim.pax}
                  onChange={(e) => updateSim('pax', parseInt(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-trough-yellow font-bold text-xs focus:border-trough-yellow outline-none"
                />
                <span className="text-gray-400 text-xs">/ 300</span>
              </div>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="5"
              value={sim.pax}
              onChange={(e) => updateSim('pax', parseInt(e.target.value))}
              className="w-full h-2 bg-trough-dark rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>50 (Min)</span>
              <span>144 (Breakeven)</span>
              <span>300 (Max Cap)</span>
            </div>
          </div>

          {/* Bar Spend per Head ($) */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-gray-300">Bar Spend per Head ($):</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-xs">$</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={sim.barSpend}
                  onChange={(e) => updateSim('barSpend', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-trough-yellow font-bold text-xs focus:border-trough-yellow outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min="15.00"
              max="45.00"
              step="0.50"
              value={sim.barSpend}
              onChange={(e) => updateSim('barSpend', parseFloat(e.target.value))}
              className="w-full h-2 bg-trough-dark rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>$15.00</span>
              <span>$22.50 (Standard)</span>
              <span>$40.00+ (Peak)</span>
            </div>
          </div>

          {/* Ticket Price or Clip */}
          {sim.operatingMode === 'owned' ? (
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                <span className="text-gray-300">Net Ticket Price ($):</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    max="150"
                    step="1"
                    value={sim.ticketPrice}
                    onChange={(e) => updateSim('ticketPrice', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-trough-yellow font-bold text-xs focus:border-trough-yellow outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="20.00"
                max="60.00"
                step="1.00"
                value={sim.ticketPrice}
                onChange={(e) => updateSim('ticketPrice', parseFloat(e.target.value))}
                className="w-full h-2 bg-trough-dark rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ) : (
            <div className="p-3 bg-trough-dark rounded-xl border border-trough-border text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-300">Promoter Ticket Clip:</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-xs">$</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    step="0.5"
                    value={sim.promoterTicketClip}
                    onChange={(e) => updateSim('promoterTicketClip', parseFloat(e.target.value) || 0)}
                    className="w-16 px-2 py-1 bg-[#181A24] border border-trough-border rounded text-right text-trough-yellow font-bold text-xs focus:border-trough-yellow outline-none"
                  />
                  <span className="text-gray-400 text-[10px]">/ head</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-300">Booking Deposit:</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    max="2000"
                    step="50"
                    value={sim.bookingDeposit}
                    onChange={(e) => updateSim('bookingDeposit', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 bg-[#181A24] border border-trough-border rounded text-right text-white font-bold text-xs focus:border-trough-yellow outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Cloakroom Settings */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-trough-dark rounded-xl border border-trough-border text-xs">
            <div>
              <span className="text-gray-400 text-[11px] block">Cloak Check-in %:</span>
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={Math.round(sim.cloakRate * 100)}
                  onChange={(e) => updateSim('cloakRate', (parseFloat(e.target.value) || 0) / 100)}
                  className="w-16 px-2 py-1 bg-[#181A24] border border-trough-border rounded text-right text-white font-bold text-xs focus:border-trough-yellow outline-none"
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-[11px] block">Cloak Fee ($):</span>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-gray-400">$</span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  value={sim.cloakFee}
                  onChange={(e) => updateSim('cloakFee', parseFloat(e.target.value) || 0)}
                  className="w-16 px-2 py-1 bg-[#181A24] border border-trough-border rounded text-right text-white font-bold text-xs focus:border-trough-yellow outline-none"
                />
              </div>
            </div>
          </div>

          {/* Cost Controls & Overheads Toggles */}
          <div className="space-y-3 pt-2 border-t border-trough-border text-xs">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Overheads & Operating Incidentals</div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400 text-[11px]">Beverage COGS %:</span>
                <div className="flex items-center gap-1 mt-1">
                  <input
                    type="number"
                    min="10"
                    max="40"
                    step="0.5"
                    value={sim.bevCogsPct}
                    onChange={(e) => updateSim('bevCogsPct', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-trough-yellow font-bold text-xs focus:border-trough-yellow outline-none"
                  />
                  <span className="text-gray-400">%</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-[11px]">Bar Consumables ($):</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-gray-400">$</span>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    step="25"
                    value={sim.barConsumables}
                    onChange={(e) => updateSim('barConsumables', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-white font-bold text-xs focus:border-trough-yellow outline-none"
                  />
                </div>
              </div>
            </div>

            {sim.operatingMode === 'owned' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 text-[11px]">DJ Talent ($):</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={sim.djFees}
                    onChange={(e) => updateSim('djFees', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-white font-bold text-xs mt-1 focus:border-trough-yellow outline-none"
                  />
                </div>
                <div>
                  <span className="text-gray-400 text-[11px]">Sound/AV Rig ($):</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={sim.avTech}
                    onChange={(e) => updateSim('avTech', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-white font-bold text-xs mt-1 focus:border-trough-yellow outline-none"
                  />
                </div>
                <div>
                  <span className="text-gray-400 text-[11px]">Direct Marketing ($):</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={sim.marketing}
                    onChange={(e) => updateSim('marketing', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-white font-bold text-xs mt-1 focus:border-trough-yellow outline-none"
                  />
                </div>
                <div>
                  <span className="text-gray-400 text-[11px]">Venue Staging ($):</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={sim.venuePrep}
                    onChange={(e) => updateSim('venuePrep', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-white font-bold text-xs mt-1 focus:border-trough-yellow outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 text-[11px]">Waste/Prep ($):</span>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={sim.wasteIncidentals}
                    onChange={(e) => updateSim('wasteIncidentals', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-white font-bold text-xs mt-1 focus:border-trough-yellow outline-none"
                  />
                </div>
                <div>
                  <span className="text-gray-400 text-[11px]">Merchant Fee %:</span>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={sim.merchantFeePct}
                    onChange={(e) => updateSim('merchantFeePct', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-trough-dark border border-trough-border rounded text-right text-white font-bold text-xs mt-1 focus:border-trough-yellow outline-none"
                  />
                </div>
              </div>
            )}

          </div>

          <button
            onClick={onSave}
            className="w-full py-2.5 bg-trough-yellow hover:bg-trough-yellowDark text-trough-dark font-bold rounded-xl transition-all shadow text-xs flex items-center justify-center gap-1.5"
          >
            Save Configuration
          </button>
        </div>

        {/* Right Column: Statement & Breakeven Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Financial Statement Breakdown */}
          <div className="bg-trough-card border border-trough-border rounded-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-trough-border">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {sim.operatingMode === 'promoter' ? 'Promoter Hosted Financial Statement' : 'Trough Owned Party Financial Statement'}
                </h3>
                <span className="text-[11px] text-gray-400">All figures calculate from active roster and inputs</span>
              </div>
              <span className="text-xs bg-trough-dark px-3 py-1 rounded-full text-trough-yellow border border-trough-border font-bold">
                {sim.pax} PAX
              </span>
            </div>

            <div className="mt-4 divide-y divide-trough-border/60 text-xs">
              
              {/* Section 1 */}
              <div className="py-2.5">
                <div className="text-[10px] font-bold text-trough-yellow uppercase tracking-wider mb-1.5">1. Gross Revenue Streams</div>
                <div className="flex justify-between py-1 text-gray-300">
                  <span>{sim.operatingMode === 'promoter' ? `Ticket Clip ($${sim.promoterTicketClip.toFixed(2)}/head)` : 'Ticket Sales (Presale & Door)'}</span>
                  <span className="font-semibold text-white">${financials.ticketRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-300">
                  <span>Bar / POS Beverage Turnover</span>
                  <span className="font-semibold text-white">${financials.barRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-300">
                  <span>Cloakroom Sales (100% Retained)</span>
                  <span className="font-semibold text-white">${financials.cloakRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1.5 font-bold text-white text-sm">
                  <span>Total Venue Revenue</span>
                  <span className="text-trough-yellow">${financials.totalGrossRevenue.toFixed(2)}</span>
                </div>
              </div>

              {/* Section 2 */}
              <div className="py-2.5">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">2. Cost of Goods Sold</div>
                <div className="flex justify-between py-1 text-gray-300">
                  <span>Beverage COGS ({sim.bevCogsPct.toFixed(1)}%)</span>
                  <span className="text-rose-300">-${financials.bevCogs.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-300">
                  <span>Bar Consumables & Glassware</span>
                  <span className="text-rose-300">-${sim.barConsumables.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1.5 font-semibold text-gray-200">
                  <span>Gross Margin</span>
                  <span className="text-white">${financials.grossMargin.toFixed(2)}</span>
                </div>
              </div>

              {/* Section 3 */}
              <div className="py-2.5">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">3. Direct Venue Labour (Wages)</div>
                <div className="flex justify-between py-1 text-gray-300">
                  <span>Roster Total ({wageSummary.totalHeadcount} Staff, {wageSummary.totalHours} hrs)</span>
                  <span className="text-rose-300 font-semibold">-${financials.totalWages.toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-gray-400 italic">
                  * Calculated from the active staff schedule including superannuation.
                </div>
              </div>

              {/* Section 4 */}
              <div className="py-2.5">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">4. Direct Overheads & Fees</div>
                <div className="flex justify-between py-1 text-gray-300">
                  <span>Merchant Fees & Processing</span>
                  <span className="text-rose-300">-${financials.merchantFees.toFixed(2)}</span>
                </div>
                {sim.operatingMode === 'promoter' ? (
                  <div className="flex justify-between py-1 text-gray-300">
                    <span>Venue Prep & Waste Reinstatement</span>
                    <span className="text-rose-300">-${sim.wasteIncidentals.toFixed(2)}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between py-1 text-gray-300">
                      <span>Talent / DJ Performance</span>
                      <span className="text-rose-300">-${sim.djFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-gray-300">
                      <span>Sound/AV & Production Tech</span>
                      <span className="text-rose-300">-${sim.avTech.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-gray-300">
                      <span>Direct Marketing & Content</span>
                      <span className="text-rose-300">-${sim.marketing.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-gray-300">
                      <span>Venue Dressing & Darkroom</span>
                      <span className="text-rose-300">-${sim.venuePrep.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between pt-1.5 font-semibold text-gray-200">
                  <span>Total Direct Overheads</span>
                  <span className="text-rose-400">-${financials.overheads.toFixed(2)}</span>
                </div>
              </div>

              {/* Bottom Line */}
              <div className="pt-3">
                <div className="p-4 rounded-xl bg-gradient-to-r from-trough-yellow/15 to-transparent border border-trough-yellow/40 flex justify-between items-center">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-trough-yellow">Net Venue Surplus</div>
                    <div className="text-[11px] text-gray-400">Operating contribution retained by venue</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black ${financials.netSurplus >= 0 ? 'text-trough-yellow' : 'text-rose-400'}`}>
                      ${financials.netSurplus.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-300 font-semibold">
                      {financials.marginPct.toFixed(1)}% Contribution Margin
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Promoter Breakeven Metric Panel */}
          {sim.operatingMode === 'promoter' && (
            <div className="bg-gradient-to-br from-trough-card to-trough-steel border border-trough-border rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-trough-yellow text-trough-dark uppercase tracking-wider">
                    Dynamic Breakeven Indicator
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">Hosted Night Attendance Thresholds</h4>
                  <p className="text-[11px] text-gray-300 mt-0.5 max-w-sm">
                    Calculated from current live staff wage bill (${financials.totalWages.toFixed(0)}) and per-head net margin (${financials.unitContribution.toFixed(2)}).
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center p-3 bg-trough-dark rounded-xl border border-trough-border min-w-[105px]">
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Base Breakeven</div>
                    <div className="text-xl font-black text-white mt-0.5">{financials.breakevenPax} PAX</div>
                    <div className="text-[9px] text-gray-500">No Deposit</div>
                  </div>
                  <div className="text-center p-3 bg-trough-dark rounded-xl border border-trough-yellow/40 min-w-[105px]">
                    <div className="text-[10px] text-trough-yellow uppercase font-semibold">With Deposit</div>
                    <div className="text-xl font-black text-trough-yellow mt-0.5">{financials.breakevenWithDeposit} PAX</div>
                    <div className="text-[9px] text-gray-300">${sim.bookingDeposit} Deposit</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

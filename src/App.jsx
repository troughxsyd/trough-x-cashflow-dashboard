import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import SimulatorTab from './components/SimulatorTab';
import RosterTab from './components/RosterTab';
import CalendarTab from './components/CalendarTab';
import ExecutiveTab from './components/ExecutiveTab';
import { FACTORY_DEFAULTS } from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [status, setStatus] = useState(null);

  // State
  const [venue, setVenue] = useState(FACTORY_DEFAULTS.venue);
  const [sim, setSim] = useState(FACTORY_DEFAULTS.simulator);
  const [roster, setRoster] = useState(FACTORY_DEFAULTS.roster);
  const [calendar, setCalendar] = useState(FACTORY_DEFAULTS.forthcomingEvents);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('TROUGH_X_APP_V3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.venue) setVenue(parsed.venue);
        if (parsed.simulator) setSim(parsed.simulator);
        if (parsed.roster) setRoster(parsed.roster);
        if (parsed.forthcomingEvents) setCalendar(parsed.forthcomingEvents);
      }
    } catch (e) {
      console.warn("Failed to read from localStorage", e);
    }
  }, []);

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      const full = {
        venue,
        simulator: sim,
        roster,
        forthcomingEvents: calendar
      };
      localStorage.setItem('TROUGH_X_APP_V3', JSON.stringify(full));
    } catch (e) {}
  }, [venue, sim, roster, calendar]);

  const showToast = (message, type = 'success') => {
    setStatus({ message, type });
    setTimeout(() => setStatus(null), 4000);
  };

  const updateSim = (field, val) => {
    setSim(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleRosterChange = (id, field, value) => {
    setRoster(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: field === 'superEligible' ? value : (field === 'role' || field === 'notes' ? value : parseFloat(value) || 0)
        };
      }
      return item;
    }));
  };

  const handleAddRosterRow = () => {
    const newId = Date.now();
    const newRow = {
      id: newId,
      role: "New Roster Position",
      headcount: 1,
      hours: 6.0,
      rate: 45.00,
      superEligible: true,
      notes: "Custom shift allocation"
    };
    setRoster(prev => [...prev, newRow]);
    showToast("Added new staff position to roster", "info");
  };

  const handleDeleteRosterRow = (id) => {
    if (roster.length <= 1) {
      showToast("Cannot delete the last remaining staff position", "error");
      return;
    }
    setRoster(prev => prev.filter(r => r.id !== id));
    showToast("Removed role from roster", "info");
  };

  const handleCalendarChange = (id, field, value) => {
    setCalendar(prev => prev.map(ev => {
      if (ev.id === id) {
        return {
          ...ev,
          [field]: (field === 'pax' || field === 'barSales' || field === 'ticketClip' || field === 'estWages') 
            ? (parseFloat(value) || 0) 
            : value
        };
      }
      return ev;
    }));
  };

  const handleDeleteEvent = (id) => {
    setCalendar(prev => prev.filter(e => e.id !== id));
    showToast("Removed event from calendar", "info");
  };

  const handleAddEvent = (newEvent) => {
    const created = {
      ...newEvent,
      id: "EV-" + Date.now().toString().slice(-4),
      pax: Number(newEvent.pax) || 200,
      barSales: Number(newEvent.barSales) || 5000,
      ticketClip: Number(newEvent.ticketClip) || 1000,
      estWages: Number(newEvent.estWages) || 3200
    };
    setCalendar(prev => [...prev, created]);
    showToast("Added new event to calendar", "success");
  };

  // Wages Aggregates
  const wageSummary = useMemo(() => {
    let totalCost = 0;
    let totalHours = 0;
    let totalHeadcount = 0;

    const itemized = roster.map((item) => {
      const superMultiplier = item.superEligible ? (1 + venue.standardSuperRate) : 1.0;
      const lineCost = (Number(item.headcount) || 0) * (Number(item.hours) || 0) * (Number(item.rate) || 0) * superMultiplier;
      totalCost += lineCost;
      totalHours += (Number(item.headcount) || 0) * (Number(item.hours) || 0);
      totalHeadcount += (Number(item.headcount) || 0);
      return { ...item, lineCost };
    });

    return { itemized, totalCost, totalHours, totalHeadcount };
  }, [roster, venue]);

  // Financials Summary
  const financials = useMemo(() => {
    const barRevenue = sim.pax * sim.barSpend;
    const cloakRevenue = sim.pax * sim.cloakRate * sim.cloakFee;
    const bevCogs = barRevenue * (sim.bevCogsPct / 100);
    const totalCogs = bevCogs + sim.barConsumables;

    if (sim.operatingMode === 'promoter') {
      const ticketRevenue = sim.pax * sim.promoterTicketClip;
      const totalGrossRevenue = ticketRevenue + barRevenue + cloakRevenue;
      const grossMargin = totalGrossRevenue - totalCogs;
      const merchantFees = totalGrossRevenue * (sim.merchantFeePct / 100);
      const otherOverheads = merchantFees + sim.wasteIncidentals;
      const netSurplus = grossMargin - wageSummary.totalCost - otherOverheads;
      const wagesPct = totalGrossRevenue > 0 ? (wageSummary.totalCost / totalGrossRevenue) * 100 : 0;
      const marginPct = totalGrossRevenue > 0 ? (netSurplus / totalGrossRevenue) * 100 : 0;

      // Breakeven Calculation
      const revenuePerHead = sim.promoterTicketClip + sim.barSpend + (sim.cloakRate * sim.cloakFee);
      const variableCostPerHead = (sim.barSpend * (sim.bevCogsPct / 100)) + (revenuePerHead * (sim.merchantFeePct / 100));
      const unitContribution = revenuePerHead - variableCostPerHead;
      const fixedCostBase = wageSummary.totalCost + sim.barConsumables + sim.wasteIncidentals;
      const breakevenPax = unitContribution > 0 ? Math.ceil(fixedCostBase / unitContribution) : 0;
      const breakevenWithDeposit = unitContribution > 0 ? Math.ceil(Math.max(0, fixedCostBase - sim.bookingDeposit) / unitContribution) : 0;

      return {
        mode: 'promoter',
        ticketRevenue,
        barRevenue,
        cloakRevenue,
        totalGrossRevenue,
        bevCogs,
        totalCogs,
        grossMargin,
        totalWages: wageSummary.totalCost,
        merchantFees,
        overheads: otherOverheads,
        netSurplus,
        wagesPct,
        marginPct,
        breakevenPax,
        breakevenWithDeposit,
        unitContribution
      };
    } else {
      const ticketRevenue = sim.pax * sim.ticketPrice;
      const totalGrossRevenue = ticketRevenue + barRevenue + cloakRevenue;
      const grossMargin = totalGrossRevenue - totalCogs;
      const merchantFees = totalGrossRevenue * 0.025;
      const totalOverheads = sim.djFees + sim.avTech + sim.marketing + merchantFees + sim.venuePrep;
      const netSurplus = grossMargin - wageSummary.totalCost - totalOverheads;
      const wagesPct = totalGrossRevenue > 0 ? (wageSummary.totalCost / totalGrossRevenue) * 100 : 0;
      const marginPct = totalGrossRevenue > 0 ? (netSurplus / totalGrossRevenue) * 100 : 0;

      return {
        mode: 'owned',
        ticketRevenue,
        barRevenue,
        cloakRevenue,
        totalGrossRevenue,
        bevCogs,
        totalCogs,
        grossMargin,
        totalWages: wageSummary.totalCost,
        merchantFees,
        overheads: totalOverheads,
        netSurplus,
        wagesPct,
        marginPct
      };
    }
  }, [sim, wageSummary]);

  const handleSave = () => {
    const full = {
      venue,
      simulator: sim,
      roster,
      forthcomingEvents: calendar
    };
    try {
      localStorage.setItem('TROUGH_X_APP_V3', JSON.stringify(full));
      showToast("All figures and schedules saved to persistent storage!", "success");
    } catch(e) {
      showToast("Storage error", "error");
    }
  };

  const handleExport = () => {
    const exportObj = {
      venue,
      simulator: sim,
      roster,
      forthcomingEvents: calendar,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `trough_x_cashflow_dashboard_${Date.now()}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Downloaded backup JSON file", "success");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.venue) setVenue(imported.venue);
        if (imported.simulator) setSim(imported.simulator);
        if (imported.roster) setRoster(imported.roster);
        if (imported.forthcomingEvents) setCalendar(imported.forthcomingEvents);
        showToast("Configuration imported successfully!", "success");
      } catch(err) {
        showToast("Invalid JSON file", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleReset = () => {
    if (window.confirm("Restore factory default benchmarks? Any unexported edits will be replaced.")) {
      setVenue(FACTORY_DEFAULTS.venue);
      setSim(FACTORY_DEFAULTS.simulator);
      setRoster(FACTORY_DEFAULTS.roster);
      setCalendar(FACTORY_DEFAULTS.forthcomingEvents);
      localStorage.removeItem('TROUGH_X_APP_V3');
      showToast("Restored all factory defaults", "info");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1017]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rosterCount={roster.length}
        calendarCount={calendar.length}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onReset={handleReset}
      />

      <Toast status={status} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {activeTab === 'simulator' && (
          <SimulatorTab
            sim={sim}
            updateSim={updateSim}
            financials={financials}
            wageSummary={wageSummary}
            onResetTarget={() => {
              setSim(prev => ({
                ...prev,
                pax: 200,
                barSpend: 22.50,
                ticketPrice: 30.00,
                promoterTicketClip: 5.00,
                bevCogsPct: 22.0
              }));
              showToast("Reset simulation parameters to target baseline", "info");
            }}
            onSave={handleSave}
          />
        )}

        {activeTab === 'wages' && (
          <RosterTab
            roster={roster}
            venue={venue}
            wageSummary={wageSummary}
            handleRosterChange={handleRosterChange}
            handleAddRosterRow={handleAddRosterRow}
            handleDeleteRosterRow={handleDeleteRosterRow}
            onSave={handleSave}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarTab
            calendar={calendar}
            handleCalendarChange={handleCalendarChange}
            handleDeleteEvent={handleDeleteEvent}
            handleAddEvent={handleAddEvent}
            onSave={handleSave}
          />
        )}

        {activeTab === 'executive' && (
          <ExecutiveTab
            financials={financials}
            wageSummary={wageSummary}
            sim={sim}
          />
        )}
      </main>

      <footer className="border-t border-trough-border bg-trough-dark text-gray-500 text-xs py-3.5 px-6 text-center">
        TROUGH X CASHFLOW DASHBOARD — Event Cashflow & Staff Roster System | 273 Crown St, Surry Hills NSW | Capacity Limit: 300 Patrons
      </footer>
    </div>
  );
}

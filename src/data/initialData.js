export const FACTORY_DEFAULTS = {
  venue: {
    name: "TROUGH X CASHFLOW DASHBOARD",
    address: "273 Crown Street, Surry Hills NSW 2010",
    capacityCap: 300,
    basementCap: 60,
    standardTicketClip: 5.00,
    standardBarCogsTarget: 0.22,
    standardSuperRate: 0.115
  },
  simulator: {
    operatingMode: "promoter", // 'promoter' or 'owned'
    pax: 200,
    ticketPrice: 30.00,
    promoterTicketClip: 5.00,
    barSpend: 22.50,
    cloakRate: 0.50,
    cloakFee: 5.00,
    bevCogsPct: 22.0,
    barConsumables: 150.00,
    bookingDeposit: 550.00,
    wasteIncidentals: 150.00,
    merchantFeePct: 1.5,
    djFees: 900.00,
    avTech: 350.00,
    marketing: 400.00,
    venuePrep: 250.00
  },
  roster: [
    { id: 1, role: "Venue Duty Manager", headcount: 1, hours: 8.0, rate: 55.00, superEligible: true, notes: "Licensing compliance, cash drops, Clover/POS oversight, emergency chain of command" },
    { id: 2, role: "Assistant Lead / Floor Sup.", headcount: 1, hours: 7.0, rate: 55.00, superEligible: true, notes: "Basement 60-pax capacity control, door sync, line monitoring, incident escalation" },
    { id: 3, role: "Senior Bartender", headcount: 2, hours: 7.5, rate: 45.00, superEligible: true, notes: "Main bar & basement bar service, RSA adherence, stock replenishing" },
    { id: 4, role: "Door / Ticket Scanner & Cloak", headcount: 1, hours: 6.5, rate: 35.00, superEligible: true, notes: "Box office ticketing app scan, wristband verification, cloak ticketing" },
    { id: 5, role: "Floor Support / Glassie / Restroom", headcount: 1, hours: 6.5, rate: 35.00, superEligible: true, notes: "Rapid glass collection, spill wipe-down, sanitisation restock, darkroom checks" },
    { id: 6, role: "Licensed Security (Crowd Control)", headcount: 2, hours: 7.0, rate: 55.00, superEligible: false, notes: "External queue management, ID scanner, 300-pax capacity cap (contracted agency)" },
    { id: 7, role: "Trained On-Site Medic", headcount: 1, hours: 6.0, rate: 50.00, superEligible: false, notes: "Dedicated harm minimisation, rapid medical first aid response" },
    { id: 8, role: "Post-Event Cleaning Roster", headcount: 2, hours: 3.0, rate: 35.00, superEligible: true, notes: "Full bio-wash, waste removal, basement sanitisation, council bin rollout" }
  ],
  forthcomingEvents: [
    { id: "EV-01", date: "2026-11-14", title: "ACTION", promoter: "Thick N Juicy", model: "Promoter Hosted ($5 clip)", pax: 300, barSales: 10000, ticketClip: 1500, estWages: 4060, notes: "Confirmed — Max Cap 300; 3 Security Guards rostered" },
    { id: "EV-02", date: "2026-11-21", title: "THROBB", promoter: "brute.club", model: "Promoter Hosted ($5 clip)", pax: 280, barSales: 8000, ticketClip: 1400, estWages: 3980, notes: "Confirmed — High dwell-time; basement capacity sync" },
    { id: "EV-03", date: "2026-11-28", title: "Red Rave", promoter: "POOF DOOF", model: "Promoter Hosted ($5 clip)", pax: 300, barSales: 10000, ticketClip: 1500, estWages: 4060, notes: "Confirmed — Full house; 3 security guards required" },
    { id: "EV-04", date: "2026-12-04", title: "BUSH 2nd Event", promoter: "Bush (Corah & Laura)", model: "Promoter Hosted ($5 clip)", pax: 250, barSales: 7000, ticketClip: 1250, estWages: 3450, notes: "Trial Agreement — $550 deposit secured; Clover report <48h" },
    { id: "EV-05", date: "2026-12-12", title: "THROBB", promoter: "brute.club", model: "Promoter Hosted ($5 clip)", pax: 280, barSales: 8000, ticketClip: 1400, estWages: 3980, notes: "Confirmed — Festive peak trading; full darkroom activation" },
    { id: "EV-06", date: "2026-12-19", title: "Trough Noir: Summer Edition", promoter: "Trough X (In-House)", model: "Owned Party (100% Rev)", pax: 240, barSales: 6500, ticketClip: 7200, estWages: 3650, notes: "In-House Hero Night — 100% ticket retention; WhatsApp push" },
    { id: "EV-07", date: "2026-12-31", title: "Trough New Year's Eve Lock-In", promoter: "Trough X (In-House)", model: "Owned Party (100% Rev)", pax: 300, barSales: 12500, ticketClip: 12000, estWages: 4800, notes: "Premium Presale NYE — Strict 1-in-1-out after midnight" },
    { id: "EV-08", date: "2027-01-16", title: "Bareback Cabaret Launch", promoter: "Trough X (Daytime)", model: "Daytime Concept (Mode B)", pax: 160, barSales: 4800, ticketClip: 3200, estWages: 2450, notes: "Saturday afternoon activation; high beverage margin dwell-time" },
    { id: "EV-09", date: "2027-01-30", title: "Late Night Queer Dance (LNQD)", promoter: "Kelly Dezart-Smith", model: "Promoter Hosted ($5 clip)", pax: 250, barSales: 7000, ticketClip: 1250, estWages: 3450, notes: "Recurring Partnership — Steady community turnout" },
    { id: "EV-10", date: "2027-02-13", title: "Mardi Gras Warmup: Club Cruise", promoter: "Trough X / Sniffies", model: "Co-Branded Hero Night", pax: 300, barSales: 11000, ticketClip: 9000, estWages: 4200, notes: "Sniffies Presented — Geo-targeted in-app marketing support" },
    { id: "EV-11", date: "2027-02-27", title: "TROUGH MARDI GRAS MAIN EVENT", promoter: "Trough X (In-House)", model: "Owned Festival Takeover", pax: 300, barSales: 15000, ticketClip: 15000, estWages: 5200, notes: "Peak Cultural Window — Maximum yield; queue pacing protocol" },
    { id: "EV-12", date: "2027-03-06", title: "FK CLUB Recovery", promoter: "Trough X (In-House)", model: "Sunday Recovery Mode", pax: 180, barSales: 5500, ticketClip: 4500, estWages: 2800, notes: "Closing Mardi Gras weekend recovery; intimate brand affinity" }
  ]
};

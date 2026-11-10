import React from 'react';

export default function Toast({ status }) {
  if (!status) return null;

  const bgStyles = status.type === 'error'
    ? 'bg-rose-950/90 border-rose-700 text-rose-200'
    : status.type === 'info'
    ? 'bg-blue-950/90 border-blue-700 text-blue-200'
    : 'bg-emerald-950/90 border-emerald-700 text-emerald-200';

  return (
    <div className={`py-2 px-6 text-xs font-semibold flex items-center justify-between border-b ${bgStyles}`}>
      <span>{status.message}</span>
      <span className="text-[10px] opacity-75">Saved to LocalStorage & Ready for Export</span>
    </div>
  );
}

export default function StatusBadge({ status }) {
  const map = {
    'Available':        'bg-emerald-100 text-emerald-700',
    'Fully Booked':     'bg-red-100 text-red-600',
    'On Leave':         'bg-slate-100 text-slate-500',
    'Pending':          'bg-amber-100 text-amber-700',
    'Confirmed':        'bg-blue-100 text-blue-700',
    'Completed':        'bg-emerald-100 text-emerald-700',
    'Cancelled':        'bg-red-100 text-red-500',
    'Free User':        'bg-slate-100 text-slate-600',
    'Active Subscriber':'bg-[#F4B942]/20 text-[#b8860b]',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? 'bg-slate-100 text-slate-500'}`}>
      {status}
    </span>
  )
}

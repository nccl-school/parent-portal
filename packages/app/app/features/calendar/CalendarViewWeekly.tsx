// import { format, startOfWeek, addDays, addHours } from "date-fns";

// const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23

// export function WeekView({ events }: { events: GoogleCalendarEvent[] }) {
//   const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
//   const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

//   return (
//     <div className="calendar-grid">
//       {/* Header */}
//       <div className="calendar-header">
//         <div className="calendar-hour-label" />
//         {days.map((day) => (
//           <div key={day.toISOString()} className="calendar-day-header">
//             {format(day, "EEE dd")}
//           </div>
//         ))}
//       </div>

//       {/* Rows */}
//       <div className="calendar-body">
//         {hours.map((hour) => (
//           <div key={hour} className="calendar-row">
//             <div className="calendar-hour-label">{hour}:00</div>
//             {days.map((day) => (
//               <div key={day.toISOString()} className="calendar-cell" />
//             ))}
//           </div>
//         ))}

//         {/* Events */}
//         {events.map((event) => (
//           <CalendarEvent key={event.id} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// }
export {};

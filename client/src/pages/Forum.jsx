// // App.jsx
// import React from "react";

// const posts = [
//   {
//     user: "Brachi45",
//     time: "9:50 היום",
//     date: "20.4.25",
//     text: "למישהו יש מידע על מצב השוק בברייטון?",
//     type: "התייעצות",
//     color: "bg-yellow-400",
//   },
//   {
//     user: "miri118",
//     time: "00:01",
//     date: "20.4.25",
//     text: "תראו את הקוד הגאוני הזה:",
//     type: "שיתוף",
//     color: "bg-green-500",
//   },
//   {
//     user: "מישהו חשוב",
//     time: "20:43 אתמול",
//     date: "",
//     text: "למי יש את השיר שהיא עמדה של פריד",
//     type: "בקשה",
//     color: "bg-orange-400",
//   },
// ];

// const Sidebar = () => (
//   <div className="w-48 bg-gray-100 p-4">
//     <div className="flex items-center gap-2 mb-6">
//       <div className="w-8 h-8 rounded-full bg-yellow-400 text-center font-bold text-white">B</div>
//       <span>Brachi45</span>
//     </div>
//     <ul className="space-y-2">
//       <li><button className="w-full text-left">פרופיל</button></li>
//       <li><button className="w-full text-left">הודעות שלי</button></li>
//       <li><button className="w-full text-left">התנתקות</button></li>
//     </ul>
//   </div>
// );

// const Post = ({ user, time, date, text, type, color }) => (
//   <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
//     <div>
//       <div className="flex items-center gap-2 mb-1">
//         <div className={`w-6 h-6 rounded-full text-white text-center text-sm font-bold ${color}`}>
//           {user[0]}
//         </div>
//         <span className="font-semibold">{user}</span>
//         <span className="text-sm text-gray-500">{time} {date}</span>
//       </div>
//       <p className="text-right">{text}</p>
//     </div>
//     <div className="flex items-center gap-2">
//       <span className="text-sm text-orange-500">🔥</span>
//       <span className="border border-dashed border-gray-400 px-2 py-1 rounded">{type}</span>
//     </div>
//   </div>
// );

// const Forum = () => (
//   <div dir="rtl" className="flex min-h-screen bg-gray-50">
//     <Sidebar />
//     <main className="flex-1 p-6">
//       <h1 className="text-4xl mb-6 font-serif text-center">Music forum</h1>
//       <div className="space-y-4 max-w-3xl mx-auto">
//         {posts.map((post, index) => (
//           <Post key={index} {...post} />
//         ))}
//       </div>
//     </main>
//   </div>
// );

// export default Forum;

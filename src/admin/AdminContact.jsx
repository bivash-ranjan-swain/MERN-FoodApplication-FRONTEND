// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminContact = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ===============================
//   // Get All Contacts
//   // ===============================
//   // const getAllContacts = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       "http://localhost:8800/api/contact/all",
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     );

//   //     setContacts(response.data.contacts);
//   //   } catch (error) {
//   //     console.log(error.response?.data || error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   // getAllContacts();
//   // }, []);

//   // ===============================
//   // Delete Contact
//   // ===============================
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this message?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const response = await axios.delete(
//         // http://localhost:8800/api/contact/delete/${id},
//         {
//           withCredentials: true,
//         }
//       );

//       alert(response.data.message);

//       setContacts((prev) => prev.filter((item) => item._id !== id));
//     } catch (error) {
//       alert(error.response?.data?.message || error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-2xl font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg">

//         {/* Header */}
//         <div className="flex justify-between items-center border-b p-6">
//           <h1 className="text-2xl md:text-3xl font-bold">
//             Contact Messages
//           </h1>

//           <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//             Total : {contacts.length}
//           </span>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-[1100px] w-full">
//             <thead className="bg-gray-800 text-white">
//               <tr>
//                 <th className="px-4 py-4 text-left">#</th>
//                 <th className="px-4 py-4 text-left">Name</th>
//                 <th className="px-4 py-4 text-left">Email</th>
//                 <th className="px-4 py-4 text-left">Subject</th>
//                 <th className="px-4 py-4 text-left">Message</th>
//                 <th className="px-4 py-4 text-center">Date</th>
//                 <th className="px-4 py-4 text-center">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {contacts.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="text-center py-10 text-lg font-semibold"
//                   >
//                     No Contact Messages Found
//                   </td>
//                 </tr>
//               ) : (
//                 contacts.map((contact, index) => (
//                   <tr
//                     key={contact._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="px-4 py-4">
//                       {index + 1}
//                     </td>

//                     <td className="px-4 py-4 font-semibold">
//                       {contact.name}
//                     </td>

//                     <td className="px-4 py-4">
//                       {contact.email}
//                     </td>

//                     <td className="px-4 py-4">
//                       {contact.subject}
//                     </td>

//                     <td className="px-4 py-4 max-w-sm">
//                       <p className="line-clamp-2">
//                         {contact.message}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       {new Date(contact.createdAt).toLocaleDateString()}
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       <button
//                         onClick={() => handleDelete(contact._id)}
//                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminContact;
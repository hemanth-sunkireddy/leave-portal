"use client";
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useSearchParams } from 'next/navigation';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: "leave-portal-loyola",
    storageBucket: "leave-portal-loyola.appspot.com",
    messagingSenderId: "625337491200",
    appId: "1:625337491200:web:9d50c8103122e9799fdde5",
    measurementId: "G-VD1JVK0RN9"
};

const MentorPage = () => {
    const [pin, setPin] = useState('');
    const app = initializeApp(firebaseConfig);
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [leaveData, setLeaveData] = useState([]);
    const db = getFirestore(app);

    const searchParams = useSearchParams();
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        setId(searchParams.get('userid'));
    }, [searchParams]);

    useEffect(() => {
        const fetchPinFromDatabase = async () => {
            try {
                if (!id) return;

                // Query the 'authentication' collection where 'UniqueID' field equals 'id'
                const authQuery = query(collection(db, 'authentication'), where('UniqueID', '==', id));
                const querySnapshot = await getDocs(authQuery);

                if (!querySnapshot.empty) {
                    // Assuming there's only one document that matches the query
                    const pinDoc = querySnapshot.docs[0];
                    const userPin = pinDoc.data().Pin; // Adjust 'Pin' to match the field name in Firestore
                    setPin(userPin);
                } else {
                    setIsLoading(false);
                    setErrorText("Error in Fetching Data. Please sign in again.");
                }
            } catch (error) {
                console.error("Error fetching PIN document:", error);
                setErrorText("Error fetching PIN document.");
            }
        };

        fetchPinFromDatabase();
    }, [id, db]);

    useEffect(() => {
        const fetchData = async () => {
            if (!pin) return;

            try {
                const leavesRef = collection(db, "leaves");
                const q = query(leavesRef, where("Mentor", "==", pin));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setErrorText("No Student Applied For leave.");
                    setIsLoading(false);
                } else {
                    setErrorText("Students leave requests are below.")
                    let leaves = [];
                    querySnapshot.forEach((doc) => {
                        leaves.push({ id: doc.id, ...doc.data() });
                    });
                    setLeaveData(leaves);
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setErrorText(error.message.toString());
            }
        };

        fetchData();
    }, [pin, db]);


    const handleStatusChange = async (index, newStatus) => {
        try {
            // Update the status in the local state first
            const updatedLeaveData = [...leaveData];
            updatedLeaveData[index].Status = newStatus;
            setLeaveData(updatedLeaveData);

            // Update the status in Firestore
            const leaveDocRef = doc(db, 'leaves', leaveData[index].id);
            await updateDoc(leaveDocRef, { Status: newStatus });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };


    useEffect(() => {
        if (leaveData) setIsLoading(false);
    }, [leaveData]);

    return (
        <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                            {errorText && (
                                <p className="mt-2 text-sm text-red-600 font-bold text-center">
                                    {errorText}
                                </p>
                            )}
                            {isLoading ? (
                                <p className="mt-2 text-sm text-lime-600 font-bold text-center">
                                    Loading...
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white dark:bg-dark border  border-lime-600 dark:border-gray-600">
                                        <tbody>
                                            {leaveData.map((leave, index) => (
                                                <React.Fragment key={index}>
                                                    <tr className=''>
                                                        <th className="pt-12 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Pin:</th>
                                                        <td className="pt-12 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Pin}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Reason:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Reason}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Parent Mobile:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.ParentMobile}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Mentor:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Mentor}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Application Time:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.ApplicationTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Residence Type:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Residence}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Total Days:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.TotalDays}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Application With:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.ApplicationWith}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Status:</th>
                                                        <td className="py-2 px-4 border-b border-lime-600 dark:border-gray-600">
                                                            {leave.ApplicationWith === "Warden" ? (
                                                                // Display only if ApplicationWith is Principal
                                                                <select
                                                                    value={leave.Status}
                                                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                                                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                                                                >
                                                                    <option value="Applied">Applied</option>
                                                                    <option value="Accepted">Accepted</option>
                                                                    <option value="Rejected">Rejected</option>
                                                                </select>
                                                            ) : (
                                                                // Display different options if ApplicationWith is not Principal
                                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Status}</td>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute left-0 top-0 z-[-1]">
                <svg
                    width="1440"
                    height="969"
                    viewBox="0 0 1440 969"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask
                        id="mask0_95:1005"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="1440"
                        height="969"
                    >
                        <rect width="1440" height="969" fill="#090E34" />
                    </mask>
                    <g mask="url(#mask0_95:1005)">
                        <path
                            opacity="0.1"
                            d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                            fill="url(#paint0_linear_95:1005)"
                        />
                        <path
                            opacity="0.1"
                            d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                            fill="url(#paint1_linear_95:1005)"
                        />
                    </g>
                    <defs>
                        <linearGradient
                            id="paint0_linear_95:1005"
                            x1="1178.4"
                            y1="151.853"
                            x2="780.959"
                            y2="453.581"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_95:1005"
                            x1="160.5"
                            y1="220"
                            x2="1099.45"
                            y2="1192.04"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
};
export default MentorPage;
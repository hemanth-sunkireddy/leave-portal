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

const WardenStudentPendingPage = () => {
    const [pin, setPin] = useState('');
    const app = initializeApp(firebaseConfig);
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [leaveData, setLeaveData] = useState([]);
    const [gender, setGender] = useState("");
    const [isMobileView, setIsMobileView] = useState(true);
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
            if (pin == "SowrinathaSwamyHostel") setGender("boy");
            else setGender("girl");
        };

        const getLeave = async () => {
            try {
                const leavesRef = collection(db, "leaves");
                const q = query(leavesRef,
                    where("Gender", "==", gender),
                    where("Residence", "==", "hostel"),
                    where("Status", "==", "Applied")
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setErrorText("No Pending Student Leave Requests.");
                    setIsLoading(false);
                } else {
                    setErrorText("Student's Leave requests are below.")
                    let leaves = [];
                    querySnapshot.forEach((doc) => {
                        leaves.push({ id: doc.id, ...doc.data() });
                    });
                    setLeaveData(leaves);
                    setLeaveData(leaves);
                }

            } catch (error) {
                setIsLoading(false);
                setErrorText(error.message.toString());
            }
        }

        fetchData();
        if (gender != '') getLeave();
    }, [pin, db, gender]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 900); // Update isMobileView based on window width
        };

        // Initial check on component mount
        setIsMobileView(window.innerWidth < 900);

        // Event listener to update on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



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

    const mobileView = (
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
                                                    <tr className=''>
                                                        <th className="pt-12 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Name:</th>
                                                        <td className="pt-12 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Name}</td>
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
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Total Days:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.TotalDays}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Application Time:</th>
                                                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.ApplicationTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Status:</th>
                                                        <td className="py-2 px-4 border-b border-lime-600 dark:border-gray-600">
                                                            <select
                                                                value={leave.Status}
                                                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                                                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                                                            >
                                                                <option value="Applied">Applied</option>
                                                                <option value="Accepted">Accepted</option>
                                                                <option value="Rejected">Rejected</option>
                                                            </select>
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
        </section>
    );

    const desktopView = (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-fit mx-auto">
                <div className="shadow-three bg-white rounded-lg px-6 py-10 dark:bg-dark sm:p-8">
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
                            <table className="min-w-full bg-white dark:bg-dark border border-lime-600 dark:border-gray-600">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Pin</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Name</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Reason</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Parent Mobile</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Mentor</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Leave Start Date</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Total Days</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Application Time</th>
                                        <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveData.map((leave, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.Pin}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.Name}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.Reason}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.ParentMobile}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.Mentor}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.FromDate}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.TotalDays}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">{leave.ApplicationTime}</td>
                                            <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-600">
                                                <select
                                                    value={leave.Status}
                                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                                                >
                                                    <option value="Applied">Applied</option>
                                                    <option value="Accepted">Accepted</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    )}

                </div>
            </div>
        </div>
    );
    return isMobileView ? mobileView : desktopView;
};
export default WardenStudentPendingPage;
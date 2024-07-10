"use client";
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
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

const MyLeaves = () => {
    const [pin, setPin] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [myLeaves, setMyLeaves] = useState(true);
    const [leaveData, setLeaveData] = useState(null);

    const app = initializeApp(firebaseConfig);
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
                    setMyLeaves(false);
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
            if (!pin) return; // If pin is null, return early

            try {
                const leaveDocRef = doc(db, "leaves", pin);
                const leaveDocSnap = await getDoc(leaveDocRef);

                if (leaveDocSnap.exists()) {
                    setErrorText("Leave Request Found.");
                    setMyLeaves(true);
                    setLeaveData(leaveDocSnap.data());
                } else {
                    setErrorText("No Leave Request Applied. Apply Now.");
                    setMyLeaves(false);
                }
            } catch (error) {
                console.error("Error fetching leave data:", error);
                setErrorText("Failed to fetch leave data.");
            } finally {
                setIsLoading(false); // Set loading state to false regardless of success or failure
            }
        };

        fetchData();
    }, [pin, db]);

    if (!myLeaves) {
        return (
            <p className="mt-2 text-sm text-red-600 font-bold text-center">
                No Leave Request Applied. Apply Now.
            </p>
        );
    }

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
                                    <table className="min-w-full bg-white dark:bg-dark border-gray-200 dark:border-gray-600">
                                        <tbody>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Pin:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.Pin}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Reason:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.Reason}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Parent Mobile:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.ParentMobile}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Mentor:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.Mentor}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Application Time:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.ApplicationTime}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Status:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.Status}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Application With:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.ApplicationWith}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Gender:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.Gender}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Total Number of Days:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.TotalDays}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Residence type:</th>
                                                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leaveData.Residence}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* SVG or other decorative elements */}
        </section>
    );
};

export default MyLeaves;

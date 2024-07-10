"use client";
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

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
    const [isLoading, setIsLoading] = useState(false);
    const [myleaves, setMyLeaves] = useState(false);
    const [leaveData, setLeaveData] = useState([]);

    const db = getFirestore(app);
    const handleSubmit = async (event) => {
        setErrorText('');
        setIsLoading(true);
        event.preventDefault();

        if (pin === '') {
            setErrorText("Please enter the pin");
            setIsLoading(false);
        }
        else {
            try {
                const leavesRef = collection(db, "leaves");
                const q = query(leavesRef, where("Mentor", "==", pin));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setErrorText("No Student Applied For leave under you.");
                    setIsLoading(false);
                } else {
                    setErrorText("Students' leave requests are below under you.")
                    let leaves = [];
                    querySnapshot.forEach((doc) => {
                        leaves.push(doc.data());
                    });
                    setLeaveData(leaves);
                    setMyLeaves(true);
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setErrorText(error.message.toString());
            }
        }
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
                            {!myleaves ? (<form onSubmit={handleSubmit}>
                                <div className="mb-8">
                                    <label
                                        htmlFor="pin"
                                        className="mb-3 block text-sm text-dark dark:text-white"
                                    >
                                        {" "}
                                        Your Pin{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="pin"
                                        placeholder="Enter Your Pin"
                                        onChange={(e) => setPin(e.target.value)}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    />
                                </div>


                                <div className="mb-6">
                                    <button type="submit" className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                                        {isLoading ? (
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014.478 4.478L2.586 6.586M20 12c0-4.418-3.582-8-8-8v4c2.237 0 4.287.913 5.758 2.394L15.172 11M12 20a8 8 0 008-8h-4c-2.237 0-4.287-.913-5.758-2.394L8.828 13"></path>
                                            </svg>
                                        ) : (
                                            'Get My Student Leaves'
                                        )}
                                    </button>
                                </div>
                            </form>) :
                                (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white dark:bg-dark border  border-lime-600 dark:border-gray-600">
                                            <tbody>
                                                {leaveData.map((leave, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Pin:</th>
                                                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Pin}</td>
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
                                                            <th className="py-2 px-4 border-b border-lime-500 dark:border-lime-600 font-semibold">Status:</th>
                                                            <td className="py-2 px-4 border-b border-lime-500 dark:border-lime-600">{leave.Status}</td>
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
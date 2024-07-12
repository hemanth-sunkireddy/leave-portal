"use client";
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
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
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [myLeaves, setMyLeaves] = useState(true);
  const [isMobileView, setIsMobileView] = useState(true);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(searchParams.get('userid'));
  }, [searchParams]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        if (!userId) return;

        // Query the 'authentication' collection where 'UniqueID' field equals 'userId'
        const authQuery = query(collection(db, 'authentication'), where('UniqueID', '==', userId));
        const authQuerySnapshot = await getDocs(authQuery);

        if (authQuerySnapshot.empty) {
          setMyLeaves(false);
          return;
        }

        // Assuming there's only one document that matches the query
        const userDoc = authQuerySnapshot.docs[0];

        // Get the user's pin
        const userPin = userDoc.data().Pin;

        // Query the 'leaves' collection where 'Pin' field equals 'userPin'
        const leavesQuery = query(collection(db, 'leaves'), where('Pin', '==', userPin));
        const leavesQuerySnapshot = await getDocs(leavesQuery);

        if (leavesQuerySnapshot.empty) {
          setMyLeaves(false);
          setErrorText("No Leave Requests Found.");
          return;
        }

        const leaveDataList = [];
        leavesQuerySnapshot.forEach(doc => {
          leaveDataList.push(doc.data());
        });

        setLeaveRequests(leaveDataList);
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setErrorText("Failed to fetch leave data.");
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchLeaveRequests();
  }, [userId, db]);

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

  if (!myLeaves) {
    return (
      <p className="mt-2 text-sm text-red-600 font-bold text-center">
        No Leave Requests Found.
      </p>
    );
  }

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
                      {leaveRequests.map((leave, index) => (
                        <React.Fragment key={index}>
                          <tr>
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
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Total Days:</th>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.TotalDays}</td>
                          </tr>
                          <tr>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Status:</th>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.Status}</td>
                          </tr>
                          <tr>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Leave Start Date:</th>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.FromDate}</td>
                          </tr>
                          <tr>
                            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 font-semibold">Application With:</th>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{leave.ApplicationWith}</td>
                          </tr>
                          <tr>
                            <th className="py-2 px-4 border-b border-lime-600 dark:border-gray-600 font-semibold">Application Time:</th>
                            <td className="py-2 px-4 border-b border-lime-600 dark:border-gray-600">{leave.ApplicationTime}</td>
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
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Pin</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Reason</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Parent Mobile</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Mentor</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Leave Start Date</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Total Days</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Status</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Application With</th>
                    <th className="px-4 py-2 border-b border-lime-600 dark:border-gray-600 font-semibold">Application Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((leave, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.Pin}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.Reason}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.ParentMobile}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.Mentor}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.FromDate}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.TotalDays}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.Status}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.ApplicationWith}</td>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{leave.ApplicationTime}</td>
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

export default MyLeaves;

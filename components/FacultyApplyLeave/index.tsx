"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
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

const FacultyApplyLeaveForm = () => {
  const [pin, setPin] = useState('');
  const [mentor, setMentor] = useState('');
  const [period, setPeriod] = useState('');
  const [myclass, setMyClass] = useState('');
  const [reason, setReason] = useState('');
  const [Mobile, setMobile] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mentors, setMentors] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState('');
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(event.target.value);
  };

  const handleMentorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMentor(event.target.value);
  };

  useEffect(() => {
    setId(searchParams.get('userid'));
  }, [searchParams]);

  const fetchMentors = async () => {
    const mentorsCollectionRef = collection(db, 'authentication');
    const q = query(mentorsCollectionRef, where("UserType", "==", "Faculty"));

    try {
      const querySnapshot = await getDocs(q);
      const mentorsList = querySnapshot.docs.map(doc => doc.data().Name);
      setMentors(mentorsList);
    } catch (error) {
      console.error("Error fetching mentors: ", error);
    }
  };

  useEffect(() => {
    fetchMentors();
  })



  useEffect(() => {
    const fetchData = async () => {
      const userRef = collection(db, "authentication");
      const q = query(userRef, where("UniqueID", "==", id));

      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
        } else {
          querySnapshot.forEach(doc => {
            const userpin = doc.data().Pin;
            const MyMobile = doc.data().Phone;
            setMobile(MyMobile);
            setPin(userpin);
          });
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setErrorText("Error fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);



  const handleSubmit = async (event) => {

    setErrorText(null);
    event.preventDefault();

    setIsLoading(true);
    if (reason === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Choose Reason For Leave.");
      }, 10);
    }
    else if (totalDays === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Enter Total number of Days for Leave.");
      }, 10);
    }
    else if (mentor === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Enter Substitute Faculty.");
      }, 10);
    }
    else if (myclass === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Enter Class.");
      }, 10);
    }
    else if (period === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Enter Period.");
      }, 10);
    }
    else if (fromDate === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Enter Leave Start Date.");
      }, 10);
    }
    else {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 330);
      const isoString = date.toISOString();
      const isoDate = isoString.split('T')[0];
      const isoTime = isoString.split('T')[1].split('.')[0];
      const documentName = `${pin}_${isoDate} ${isoTime}`;
      const formData = {
        Pin: pin,
        Reason: reason,
        Phone: Mobile,
        ApplicationTime: `${isoDate} ${isoTime}`,
        Status: "Applied",
        TotalDays: totalDays,
        SubstituteFaculty: mentor,
        FromDate: fromDate,
        Class: myclass,
        Period: period,
        UserType: "Faculty"
      };
      try {
        const leaveRef = doc(db, "leaves", documentName);
        await setDoc(leaveRef, formData, { merge: true });
        setErrorText('Application Success. Redirecting to My Leaves...');
        setTimeout(() => {
          location.href = `/faculty-my-leaves/?userid=${id}`;
          setIsLoading(false);
        }, 10);
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false);
          setErrorText(error.message.toString());
        }, 10);
      }
    }
  };


  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Leave Application Form
              </h3>
              {/* <p className="mb-11 text-center text-base font-medium text-body-color">
                  Welcome
                </p> */}

              <div className="mb-8 flex items-center justify-center">
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                <p className="w-full px-5 text-center text-base font-medium text-body-color">
                  Fill the below details
                </p>
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label htmlFor="reason" className="block text-sm text-dark dark:text-white mb-3">
                    Category of Leave
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    onChange={handleReasonChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option value="">Select...</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sickness">Sickness</option>
                    <option value="Special Casual">Special Casual</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="fromDate"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Leave Start Date{" "}
                  </label>
                  <input
                    type="text"
                    name="fromDate"
                    placeholder="Enter in DD-MM-YYYY"
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="days"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Total Number of Days{" "}
                  </label>
                  <input
                    type="number"
                    name="days"
                    placeholder="Enter number of days you want to apply"
                    onChange={(e) => setTotalDays(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Class Work to be adjusted
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>

                <div className="mb-8">
                  <label htmlFor="mentor" className="block text-sm text-dark dark:text-white mb-3">
                    Select Substitute Faculty
                  </label>
                  <select
                    id="mentor"
                    name="mentor"
                    onChange={handleMentorChange}
                    value={mentor}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option value="">Select...</option>
                    {mentors.map((mentorName, index) => (
                      <option key={index} value={mentorName}>{mentorName}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="period"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Period{" "}
                  </label>
                  <input
                    type="number"
                    name="period"
                    placeholder="Enter the Period number"
                    onChange={(e) => setPeriod(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="class"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Class{" "}
                  </label>
                  <input
                    type="text"
                    name="class"
                    placeholder="Enter Class"
                    onChange={(e) => setMyClass(e.target.value)}
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
                      'Submit Leave'
                    )}
                  </button>
                </div>
              </form>
              {errorText && (
                <p className="mt-2 text-sm text-red-600 font-bold text-center">
                  {errorText}
                </p>
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
export default FacultyApplyLeaveForm;
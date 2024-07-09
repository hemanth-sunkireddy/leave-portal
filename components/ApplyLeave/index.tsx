"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "leave-portal-loyola",
  storageBucket: "leave-portal-loyola.appspot.com",
  messagingSenderId: "625337491200",
  appId: "1:625337491200:web:9d50c8103122e9799fdde5",
  measurementId: "G-VD1JVK0RN9"
};

const ApplyLeaveForm = () => {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState("");
  const [mentor, setMentor] = useState('');
  const [reason, setReason] = useState('');
  const [parentMobile, setParentMobile] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);


  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMentor(event.target.value);
  };

  const handleSubmit = async (event) => {

    setErrorText(null);
    event.preventDefault();

    setIsLoading(true);
    if (parentMobile === '') {
      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Fill your Parent Mobile Number.");
      }, 1000);
    }
    else if (pin === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Enter your pin.");
      }, 1000);
    }
    else if (reason === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Fill Reason For Leave.");
      }, 1000);
    }
    else if (password === '') {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Fill  Password.");
      }, 1000);
    }
    else if (mentor === '' || mentor === "Select...") {

      setTimeout(() => {
        setIsLoading(false);
        setErrorText("Please Select Your Mentor.");
      }, 1000);
    }
    else {
      const date = new Date();
      console.log("TODAY TIME: ", date);
      date.setMinutes(date.getMinutes() + 330);
      let isoString = date.toISOString();
      const formData = {
        Pin: pin,
        Password: password,
        Reason: reason,
        ParentMobile: parentMobile,
        Mentor: mentor,
        ApplicationTime: isoString,
        Status: "Applied"
      };
      try {

        const docRef = doc(db, "authentication", pin);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const storedPassword = docSnap.data().Password;
          if (storedPassword === password) {
            const leaveRef = doc(db, "leaves", pin);
            await setDoc(leaveRef, formData, { merge: true });
            setErrorText('Application Success. Redirecting to My Leaves...');
            setTimeout(() => {
              location.href = '/my-leaves';
              setIsLoading(false);
            }, 1000);
          } else {
            setErrorText('Incorrect Password. Please check password.');
            setIsLoading(false);
          }
        } else {
          setErrorText("User Not Found. Please Check the entered pin.");
          setIsLoading(false);
        }
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false);
          setErrorText(error.message.toString());
        }, 1000);
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
                  <label
                    htmlFor="reason"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Reason For Leave{" "}
                  </label>
                  <input
                    type="text"
                    name="reason"
                    placeholder="Enter reason for leave"
                    onChange={(e) => setReason(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="mobile"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Parent Mobile{" "}
                  </label>
                  <input
                    type="mobile"
                    name="mobile"
                    placeholder="Enter your Parent Mobile Number"
                    onChange={(e) => setParentMobile(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="mentor" className="block text-sm text-dark dark:text-white mb-3">
                    Select Mentor
                  </label>
                  <select
                    id="mentor"
                    name="mentor"
                    onChange={handleUserTypeChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option value="">Select...</option>
                    <option value="mentor1">Girls Mentor 1</option>
                    <option value="mentor2">Girls Mentor 2</option>
                    <option value="mentor2">Girls Mentor 3</option>
                    <option value="mentor3">Boys Mentor 1</option>
                    <option value="mentor4">Boys Mentor 2</option>
                    <option value="mentor4">Boys Mentor 3</option>
                  </select>
                  {mentor && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      You selected: {mentor}
                    </p>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="userpin"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Your Pin{" "}
                  </label>
                  <input
                    type="text"
                    name="userpin"
                    placeholder="Enter your Pin Number"
                    onChange={(e) => setPin(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                {/* <div className="mb-8">
                  <label htmlFor="userType" className="block text-sm text-dark dark:text-white mb-3">
                    Select User Type
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={mentor}
                    onChange={handleUserTypeChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option value="">Select...</option>
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                    <option value="warden">Warden</option>
                    <option value="principal">Principal</option>
                  </select>
                  {mentor && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      You selected: {mentor}
                    </p>
                  )}
                </div> */}

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
              <p className="text-center text-base font-medium text-body-color">
                Already Applied?{" "}
                <Link href="/my-leaves" className="text-primary hover:underline">
                  My Leave Requests
                </Link>
              </p>
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
export default ApplyLeaveForm;
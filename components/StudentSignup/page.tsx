"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, collection, query, where, getDocs, } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: "leave-portal-loyola",
    storageBucket: "leave-portal-loyola.appspot.com",
    messagingSenderId: "625337491200",
    appId: "1:625337491200:web:9d50c8103122e9799fdde5",
    measurementId: "G-VD1JVK0RN9"
};



const StudentSignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState('');
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState('');
    const [mentor, setMentor] = useState('');
    const [residence, setResidence] = useState('');
    const [mentors, setMentors] = useState<string[]>([]);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    const handleResidenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setResidence(event.target.value);
    };

    const handleMentorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMentor(event.target.value);
    };

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBranch(event.target.value);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(event.target.value);
    };

    const fetchMentors = async () => {
        const mentorsCollectionRef = collection(db, 'authentication');
        const q = query(mentorsCollectionRef, where("UserType", "==", "faculty"));

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

    const generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };


    const handleSubmit = async (event) => {
        setErrorText(null);
        event.preventDefault();
        setIsLoading(true);
        if (firstName === '') {
            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Fill your First Name");
            }, 10);

        }
        else if (pin === '') {

            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Fill your Pin");
            }, 10);
        }
        else if (password === '') {

            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Fill your Password");
            }, 10);
        }
        else if (branch === '' || branch === "Select...") {

            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Select your Branch");
            }, 10);
        }
        else if (gender === '') {

            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Select your Gender");
            }, 10);
        }
        else if (residence === '') {

            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Select your Residence Type");
            }, 10);
        }
        else if (mentor === '' || mentor === "Select...") {

            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Fill Phone Number");
            }, 10);
        }
        else if (phone === '') {

            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Fill Phone Number");
            }, 10);
        }
        else if (lastName === '') {
            setTimeout(() => {
                setIsLoading(false);
                setErrorText("Please Fill your Last Name");
            }, 10);

        }
        else {
            const date = new Date();
            console.log("TODAY TIME: ", date);
            date.setMinutes(date.getMinutes() + 330);
            let isoString = date.toISOString();
            const randomString = generateRandomString(200);
            console.log("RANDOM STRING: ", randomString);
            const formData = {
                FirstName: firstName,
                LastName: lastName,
                Pin: pin,
                Password: password,
                SignUpTime: isoString,
                UsageCount: 1,
                UniqueID: randomString,
                Phone: phone,
                Mentor: mentor,
                Gender: gender,
                UserType: "Student",
                Residence: residence,
                Branch: branch
            };

            try {
                const docRef = doc(db, "authentication", pin);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setErrorText('User Already Exist. Please sign in.');
                    setIsLoading(false);
                } else {
                    await setDoc(docRef, formData);
                    console.log("Document Written: ", docRef);
                    setErrorText("Registration Success. Redirecting to Sign In page...");
                    setTimeout(() => {
                        setIsLoading(false);
                        location.href = `/signin`;
                    }, 10);
                    setIsLoading(false);
                }
            } catch (e) {
                console.error("Error adding document: ", e);
                setTimeout(() => {
                    setIsLoading(false);
                    setErrorText(e.message.toString());
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
                                Create your account
                            </h3>
                            <p className="mb-11 text-center text-base font-medium text-body-color">
                                Welcome
                            </p>

                            <div className="mb-8 flex items-center justify-center">
                                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                                <p className="w-full px-5 text-center text-base font-medium text-body-color">
                                    Register with your Pin
                                </p>
                                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-8">
                                    <label
                                        htmlFor="firstname"
                                        className="mb-3 block text-sm text-dark dark:text-white"
                                    >
                                        {" "}
                                        First Name{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="Enter your First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    />
                                </div>
                                <div className="mb-8">
                                    <label
                                        htmlFor="lastName"
                                        className="mb-3 block text-sm text-dark dark:text-white"
                                    >
                                        {" "}
                                        Last Name{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter your Full Surname"
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    />
                                </div>
                                <div className="mb-8">
                                    <label
                                        htmlFor="pin"
                                        className="mb-3 block text-sm text-dark dark:text-white"
                                    >
                                        {" "}
                                        Pin Number{" "}
                                    </label>
                                    <input
                                        type="pin"
                                        name="pin"
                                        placeholder="Enter your Pin Number"
                                        onChange={(e) => setPin(e.target.value)}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    />
                                </div>
                                <div className="mb-8">
                                    <label
                                        htmlFor="phone"
                                        className="mb-3 block text-sm text-dark dark:text-white"
                                    >
                                        {" "}
                                        Phone Number{" "}
                                    </label>
                                    <input
                                        type="number"
                                        name="phone"
                                        placeholder="Enter your Parent Mobile Number"
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    />
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="gender" className="block text-sm text-dark dark:text-white mb-3">
                                        Select Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={gender}
                                        onChange={handleGenderChange}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    >
                                        <option value="">Select...</option>
                                        <option value="boy">Boy</option>
                                        <option value="girl">Girl</option>
                                    </select>
                                </div>
                                <div className="mb-8">
                                    <label
                                        htmlFor="password"
                                        className="mb-3 block text-sm text-dark dark:text-white"
                                    >
                                        {" "}
                                        Create Password{" "}
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    />
                                </div>
                                <div className="mb-8 flex items-center justify-center">
                                    <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                                    <p className="w-full px-5 text-center text-base font-medium text-body-color">
                                        Your Academic Details
                                    </p>
                                    <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="userType" className="block text-sm text-dark dark:text-white mb-3">
                                        Select Branch
                                    </label>
                                    <select
                                        id="branch"
                                        name="branch"
                                        value={branch}
                                        onChange={handleBranchChange}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    >
                                        <option value="">Select...</option>
                                        <option value="cme">C.M.E.</option>
                                        <option value="ece">E.C.E.</option>
                                        <option value="ce">C.E.</option>
                                        <option value="me">M.E.</option>
                                        <option value="mng">M.N.G.</option>
                                        <option value="ee">E.E.</option>
                                    </select>
                                </div>

                                <div className="mb-8">
                                    <label htmlFor="mentor" className="block text-sm text-dark dark:text-white mb-3">
                                        Select Mentor
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
                                    <label htmlFor="gender" className="block text-sm text-dark dark:text-white mb-3">
                                        Residence Type
                                    </label>
                                    <select
                                        id="residence"
                                        name="residence"
                                        value={residence}
                                        onChange={handleResidenceChange}
                                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                    >
                                        <option value="">Select...</option>
                                        <option value="hostel">Hosteler</option>
                                        <option value="dayscholar">Day Scholar</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <button type="submit" className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                                        {isLoading ? (
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014.478 4.478L2.586 6.586M20 12c0-4.418-3.582-8-8-8v4c2.237 0 4.287.913 5.758 2.394L15.172 11M12 20a8 8 0 008-8h-4c-2.237 0-4.287-.913-5.758-2.394L8.828 13"></path>
                                            </svg>
                                        ) : (
                                            'Sign up'
                                        )}
                                    </button>
                                </div>
                            </form>
                            <p className="text-center text-base font-medium text-body-color">
                                Already Registered?{" "}
                                <Link href="/signin" className="text-primary hover:underline">
                                    Sign in
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
export default StudentSignupForm;
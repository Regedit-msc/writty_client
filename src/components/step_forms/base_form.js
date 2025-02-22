/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useState } from "react";
import "../../css/setup.css";
import React from "react";
import LogoPlaceholder from "../../images/logo.png";
// import backgroundAccountCreation from "../../images/background-account-creation.png";
import { Link } from "react-router-dom";
import PlaceholderProfileImage from "../../images/placeholder-profile-image.png"
import addMore from "../../images/add-black.png";
import doneImage from "../../images/image-done.png"
import { useRef } from "react";

import { useSnackbar } from "notistack";
// import Fade from "../transitions/fade";
import { LANGUAGES } from "../../utils/programmingLanguages";
import { generateRandomColorHex } from "../../utils/randomColor";
import { API_ENDPOINT } from "../../pages/url";
import { useTitle } from "../../utils/title";
// import { useEffect } from "react";
// import { useEffect } from "react";

const StepBar = ({ currentStep, totalSteps, setStep, showNext }) => {

    function goBack() {
        setStep(currentStep - 1);
        // if (!fade) {
        //     setFade(fade);
        // } else {
        //     setFade(false);
        //     setTimeout(() => {
        //         setFade(true);
        //     }, 300)
        // }

    }
    function goForward() {
        setStep(currentStep + 1);
        // if (!fade) {
        //     setFade(fade);
        // } else {
        //     setFade(false);
        //     setTimeout(() => {
        //         setFade(true);
        //     }, 300)
        // }
    }

    return <>
        <header>
            <div>
                {currentStep > 1 ? <h5 style={{ cursor: "pointer" }} className="lnk-prev_next" onClick={goBack} >PREVIOUS</h5> : ''}
                <h5 id="setup-step">STEP {currentStep} OF {totalSteps - 1}</h5>
                {currentStep < totalSteps - 1 && showNext ? <h5 style={{ cursor: "pointer" }} className="lnk-prev_next" onClick={goForward}>NEXT</h5> : ''}
            </div>
            <hr />
        </header>
    </>
}


const BaseForm = () => {
    const { enqueueSnackbar: snack } = useSnackbar();
    const [step, setStep] = useState(1);
    const totalSteps = 6;
    const [fade, setFade] = useState(true);
    const [stepsState, setStepsState] = useState();
    const [showNext, setShowNext] = useState(false);
    const stepsList = [
        <Step1
            currentStep={step}
            snack={snack}
            setStep={setStep}
            stepsState={stepsState}
            setShowNext={setShowNext}
            lastStep={totalSteps}
            setStepsState={setStepsState}
        />,
        <Step2
            currentStep={step}
            setShowNext={setShowNext}
            setStep={setStep}
            stepsState={stepsState}
            lastStep={totalSteps}
            setStepsState={setStepsState}
            snack={snack}
        />,
        <Step3
            currentStep={step}
            setShowNext={setShowNext}
            snack={snack}
            setStep={setStep}
            stepsState={stepsState}
            lastStep={totalSteps}
            setStepsState={setStepsState}
        />,
        <Step4
            setShowNext={setShowNext}
            currentStep={step}
            snack={snack}
            setStep={setStep}
            stepsState={stepsState}
            lastStep={totalSteps}
            setStepsState={setStepsState}
        />,
        <Step5
            snack={snack}
            currentStep={step}
            setShowNext={setShowNext}
            setStep={setStep}
            stepsState={stepsState}
            lastStep={totalSteps}
            setStepsState={setStepsState}
        />,
        <Step6
            snack={snack}
            currentStep={step}
            setShowNext={setShowNext}
            setStep={setStep}
            stepsState={stepsState}
            lastStep={totalSteps}
            setStepsState={setStepsState}
        />,

    ]


    const changeStep = (step) => {
        setStep(step);
    }

    return <>
        <div className="setup-main">
            <div>
                <Link to="/home"><img src={LogoPlaceholder} className="logo" alt="Logo Placeholder" /></Link>
            </div>

            <div className="grid-col-2">
                <div className={step === totalSteps ? "" : "setup_box"} >
                    {
                        step === totalSteps ? '' : <StepBar
                            currentStep={step}
                            fade={fade}
                            totalSteps={totalSteps}
                            setStep={changeStep}
                            setFade={setFade}
                            setShowNext={setShowNext}
                            showNext={showNext}
                        />
                    }
                    <Steps
                        fade={fade}
                        currentStep={step}
                        stepsList={stepsList}
                        lastStep={totalSteps}

                    />
                </div>

                {/* <div className="grid-col-3">
                    <img src={backgroundAccountCreation} alt="background_account_creation" />
                </div> */}
            </div>


        </div>


    </>
}



const Steps = ({ currentStep, lastStep, stepsList }) => {

    if (currentStep === lastStep) {
        console.log("equal", currentStep)

        return <>

                {stepsList[lastStep - 1]}


        </>

    } else {
        return <>
            {stepsList[currentStep - 1]}
        </>



    }

}

const Step1 = ({ currentStep, setStep, setStepsState, stepsState, snack }) => {
    useTitle("Upload a profile picture.")
    const [image, setImage] = useState();
    const fileInput = useRef();
    const openFilePicker = () => {
        fileInput.current.click();
    }

    const fileChangeHandler = (e) => {
      // for (let i = 0; i < event.target.files.length; i++) {
      //   images.push(URL.createObjectURL(event.target.files[i]));
      // }
      if (e.target.files[0]) {
        if (e.target.files[0].size > 3000000) {
          snack("Image is larger than 3MB.");
          return;
        }
        setImage(URL.createObjectURL(e.target.files[0]));
        var file = e.target.files[0];
        var reader = new FileReader();
        const imageV = {
          b64: "",
          type: e?.target?.files[0].type.split("/")[1],
          image: URL.createObjectURL(e?.target?.files[0]),
        };
        reader.onloadend = function () {
          imageV.b64 = reader.result.split(",")[1];
          setStepsState({ ...stepsState, image: imageV });
        };
        reader.readAsDataURL(file);
      }
    };

    function handleClick() {
      console.log(stepsState?.image);
      if (!stepsState?.image) return snack("You must provide a profile image.");
      setStep(currentStep + 1);
    }
    return (
      <>
        <div className="setup_body">
          <div className="setup_message">
            <h5>Upload Photo</h5>
            Get your face easily regognized by your network
          </div>
          <img
            src={image ?? stepsState?.image?.image ?? PlaceholderProfileImage}
            className="placeholder-profile-image"
            alt="background_account_creation"
          />
          <div id="image-upload_form">
            <div className="upload_photo" onClick={openFilePicker}>
              Upload Photo
            </div>
            <input type="submit" value="Continue" onClick={handleClick} />
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={fileInput}
              onChange={fileChangeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </>
    );
}
const Step2 = ({ currentStep, setStep, setStepsState, stepsState, snack, setShowNext }) => {
    const [formState, setFormState] = useState('');
    useTitle("Tell us about you.")
    function handleChange(e) {
        setFormState(e.target.value);
        setStepsState({ ...stepsState, about: formState });
    }
    function handleClick() {
        if (stepsState?.about === null || stepsState?.about === '' || stepsState?.about?.length < 10) return snack("About too short");
        setShowNext(true);
        setStep(currentStep + 1);
    }
    return <>

        <div className="setup_body">
            <div className="setup_message">
                <h5>Introduce Yourself</h5>
                Let us know a little about you.
            </div>
            <div className="setup_crux">
                <div>About</div>
                <textarea onChange={handleChange} value={formState === '' && (stepsState?.about !== null || stepsState?.about !== '') ? stepsState?.about : formState} ></textarea>
            </div>
            <input type="submit" value="Done" onClick={handleClick} onSubmit={(e) => e.preventDefault()} />
        </div>


    </>
}
const Step3 = ({ currentStep, setStep, setStepsState, stepsState, snack, setShowNext }) => {
    useTitle("Work experience.")
    const [experienceAndWorks, setExperienceAndWork] = useState([{
        company: '',
        role: "",
        task: ""
    }]);

    function addNewField() {
        if (experienceAndWorks.length < 6) {
            setExperienceAndWork([...experienceAndWorks, {
                company: '',
                role: "",
                task: ""
            }])
        } else {
            snack("You can add at most five work experiences.")
        }

    }
    function handleChange(e, index) {
        const { name, value } = e.target;
        const newEList = [...experienceAndWorks];
        newEList[index][name] = value;
        setExperienceAndWork(newEList);
        setStepsState({ ...stepsState, experienceAndWorks: [...newEList] });
    }
    function handleDone() {
        if (stepsState?.experienceAndWorks === null || stepsState?.about === '') {
            snack("You didn't provide any experience, there will be none on your profile.");
        }
        console.log(stepsState);
        setShowNext(false);
        setStep(currentStep + 1);
    }

    return <>
        <div className="setup_body">
            <div className="setup_message">
                <h5>Experience</h5>
                You can add your work experience here.
            </div>
            <div style={{ maxHeight: "1000px", overflow: "scroll" }}>
                {
                    stepsState?.experienceAndWorks ? stepsState?.experienceAndWorks.map((experienceAndWork, index) => {
                        return <div className="experience-body" style={{ marginBottom: "20px", marginTop: "20px" }} key={index}>
                            <label>Where you&apos;ve worked
                                    <input type="text" className="workplace" name="company" value={experienceAndWork?.company} onChange={(e) => handleChange(e, index)} />
                                </label>

                                <label>Role
                                    <input type="text" className="role" name="role" value={experienceAndWork?.role} onChange={(e) => handleChange(e, index)} />
                                </label>
                                <label>Task
                                    <input type="text" className="role" name="task" value={experienceAndWork?.task} onChange={(e) => handleChange(e, index)} />
                                </label>

                                <div className="add-more">
                                    <img src={addMore} alt="background_account_creation" onClick={addNewField} /> Add more
                                </div>
                            </div>



                    }) :
                        experienceAndWorks.map((experienceAndWork, index) => {
                            return <div className="experience-body" style={{ marginBottom: "20px", marginTop: "20px" }} key={index}>
                                <label>Where you&apos;ve worked
                                        <input type="text" className="workplace" name="company" value={experienceAndWork?.company} onChange={(e) => handleChange(e, index)} />
                                    </label>

                                    <label>Role
                                        <input type="text" className="role" name="role" value={experienceAndWork?.role} onChange={(e) => handleChange(e, index)} />
                                    </label>
                                    <label>Task
                                        <input type="text" className="role" name="task" value={experienceAndWork?.task} onChange={(e) => handleChange(e, index)} />
                                    </label>

                                    <div className="add-more">
                                        <img src={addMore} alt="background_account_creation" onClick={addNewField} /> Add more
                                    </div>
                                </div>



                        })
                }

            </div>
            <input type="submit" value="Done" onClick={handleDone} />
        </div>




    </>
}

const Step4 = ({ currentStep, setStep, setStepsState, stepsState, snack }) => {
    useTitle("Skills, Hobbies.")
    const [value, setValue] = useState('');
    const [userSkills, setUserSkills] = useState([]);
    const [searchSuggestions, setSearchSuggestions] = useState();
    const skillsList = ["UI/UX", "ML Expert", "Flutter Developer", "Blogger", "React developer", "Site Admin", "Django dev", "Python Lord", "Node Guy"];

    function handleChange(e) {
        if (e.target.value === '') return;
        setValue(e.target.value);
        document.querySelector(".search_suggestions").style.display = "flex";
        search(value);
    }
    function search(value) {
        let filteredSearchResults = skillsList.filter(str => str.toLowerCase().match(value.trim().toLowerCase()));
        setSearchSuggestions(filteredSearchResults);
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            document.querySelector(".search_suggestions").style.display = "none";
            if (userSkills.length > 7) return snack("You are too skillful.");
            if (userSkills.includes(value)) return snack(`You have added ${value} already.`)
            setUserSkills([...userSkills, value]);
            setStepsState({ ...stepsState, userSkills: [...userSkills, value] });
            // setStepsState({ ...stepsState, userSkills: [...stepsState.userSkills, value] });
        }
    }

    function handleSubmit() {
        if (stepsState?.userSkills?.length < 2) return snack("You need to provision at least 2 skills.");
        setStep(currentStep + 1);
    }


    return <>
        <div className="setup_body">
            <div className="setup_message">
                <h5>Skills</h5>
                Let others know your abilities and areas of expertise.
            </div>
            <div className="setup_crux">
                <div className="skill-instruction">Add a skill. To add multiple, click enter.</div>
                <input type="text" placeholder="e.g. user interface..." className="skill-input" onChange={handleChange} onKeyDown={handleKeyDown} />


                <div className="search_suggestions" onMouseLeave={() => {
                    document.querySelector(".search_suggestions").style.display = "none";
                }}>
                    {
                        searchSuggestions ? searchSuggestions.map((suggestion, index) => {
                            return <div key={index}>
                                <div className="search_suggestion" onClick={() => {


                                    document.querySelector(".search_suggestions").style.display = "none";
                                    if (userSkills.length > 7) return snack("You are too skillful.")
                                    if (userSkills.includes(suggestion)) return snack(`You have added ${suggestion} already.`)

                                    setUserSkills([...userSkills, suggestion]);
                                    setStepsState({ ...stepsState, userSkills: [...userSkills, suggestion] });

                                }}>
                                    <span>
                                        {suggestion}
                                    </span>
                                </div>
                            </div>
                        }) : ''
                    }

                </div>

                <div className="skills-list">
                    {
                        stepsState?.userSkills?.length > 0 ? stepsState.userSkills.map((val, index) => <span key={index}>{val}</span>) : userSkills.map((val, index) => <span key={index}>{val}</span>)
                    }
                </div>
            </div>
            <input type="submit" value="Proceed" onClick={handleSubmit} />
        </div>


    </>
}
const Step5 = ({ currentStep, setStep, setStepsState, stepsState, snack }) => {
    useTitle("Languages.")
    const [value, setValue] = useState('');
    const [userLanguages, setUserLanguages] = useState([]);
    const [searchSuggestions, setSearchSuggestions] = useState();
    const languagesList = LANGUAGES;

    function handleChange(e) {
        if (e.target.value === '') return;
        setValue(e.target.value);
        document.querySelector(".search_suggestions").style.display = "flex";
        search(value);
    }
    function search(value) {
        let filteredSearchResults = languagesList.filter(str => str.toLowerCase().match(value.trim().toLowerCase()));
        setSearchSuggestions(filteredSearchResults);
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            document.querySelector(".search_suggestions").style.display = "none";
            if (userLanguages.length > 7) return snack("You too sabiii!!!.");
            if (userLanguages.includes(value)) return snack(`You have added ${value} already.`)
            setUserLanguages([...userLanguages, value]);
            setStepsState({ ...stepsState, userLanguages: [...userLanguages, value] });
        }
    }

    function handleSubmit() {
        if (stepsState?.userLanguages?.length < 2) return snack("You need to choose at least two languages.");
        console.log(stepsState, "Final step state");
        snack("Processing profile...");
        fetch(`${API_ENDPOINT}/onboard/user`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            },
            method: "POST",
            body: JSON.stringify({ details: stepsState })
        }).then(res => res.json()
        ).then(jsonRes => {
            console.log(jsonRes)
            if (jsonRes.success) {
                snack("Successfully created account.");
                localStorage.setItem("new_user", "reg")
                localStorage.removeItem("profile_user_pic")
                setStep(currentStep + 1)
            } else {
                snack(jsonRes.message, {
                    variant: "error"
                });
            }
        })
    }
    return <>
        <div className="setup_body">
            <div className="setup_message">
                <h5>Languages</h5>
                Your cooking utensils !!!<br />
                Let&apos;s have your favourites here.
            </div>
            <div className="setup_crux">
                <div className="skill-instruction">Add a language. To add current, click enter or select a suggestion.</div>
                <input type="text" placeholder="e.g. Java..." className="skill-input" onChange={handleChange} onKeyDown={handleKeyDown} />


                <div className="search_suggestions" onMouseLeave={() => {
                    document.querySelector(".search_suggestions").style.display = "none";
                }}>
                    {
                        searchSuggestions ? searchSuggestions.map((suggestion, index) => {
                            return <div key={index}>
                                <div className="search_suggestion" onClick={() => {
                                    document.querySelector(".search_suggestions").style.display = "none";
                                    if (userLanguages.length > 7) return snack("You too sabiii!!!.");
                                    if (userLanguages.includes(suggestion)) return snack(`You have added ${suggestion} already.`)
                                    setUserLanguages([...userLanguages, suggestion]);
                                    setStepsState({ ...stepsState, userLanguages: [...userLanguages, suggestion] });
                                }}>
                                    <span  >
                                        {suggestion}
                                    </span>
                                </div>
                            </div>
                        }) : ''
                    }

                </div>

                <div className="skills-list">
                    {
                        stepsState?.userLanguages?.length > 0 ? stepsState?.userLanguages.map((val, index) => <span style={{ cursor: "pointer", color: generateRandomColorHex() }} key={index}>{val}</span>) : userLanguages.map((val, index) => <span style={{ color: generateRandomColorHex(), cursor: "pointer" }} key={index}>{val}</span>)
                    }
                </div>
            </div>
            <input type="submit" value="Finish" onClick={handleSubmit} />
        </div>


    </>
}

const Step6 = () => {
    return (
        <>
            <div className="grid-col-2">
                <div id="done_box">
                    <div className="done_body">
                        <div id="done_message">
                            You&apos;re all set up! You can proceed to your dashboard.
                        </div>
                        <div id="done_img">
                            <img src={doneImage} alt="done" />
                        </div>
                        <Link to="/dash" id="done_login">Continue</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BaseForm;
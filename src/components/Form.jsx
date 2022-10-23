import React, { useState, useRef } from "react";
import logo from "./images/logo.png";
import Popup from "./Popup";
import SignatureCanvas from "react-signature-canvas";
import { Slider } from "@mui/material";

export default function Form({ addFormData }) {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  //Step and validation
  const [step, setStep] = useState(0);
  let validated = false;
  const validate = () => {
    let radioError = "Välj ett av sletsalternativen för att gå vidare.";
    let sliderError = "Välj ett av sletsalternativen mellan ett och tio.";
    let firstNameError = "Fyll i förnamn";
    let lastNameError = "Fyll i förnamn";

    if (step === 0) {
      validated = true;
    }
    if (
      step === 1 ||
      step === 3 ||
      step === 4 ||
      step === 5 ||
      step === 6 ||
      step === 7 ||
      step === 8
    ) {
      if (
        (step === 1 && formData["fraga1"] !== null) ||
        (step === 3 && formData["fraga3"] !== null) ||
        (step === 4 && formData["fraga4"] !== null) ||
        (step === 5 && formData["fraga5"] !== null) ||
        (step === 6 && formData["fraga6"] !== null) ||
        (step === 7 && formData["fraga7"] !== null) ||
        (step === 8 && formData["potMember"] !== null)
      ) {
        validated = true;
      } else alert(radioError);
    }

    if (step === 2)
      if (formData["fraga2"] > 0) validated = true;
      else if (step === 2) alert(sliderError);

    if (step === 10) {
      if (formData["firstName"] !== null) validated = true;
      else alert(firstNameError);
      if (formData["lastName"] !== null) validated = true;
      else alert(lastNameError);
      if (formData["email"] !== null) validated = true;
      else alert(lastNameError);
      if (formData["lastName"] !== null) validated = true;
      else alert(lastNameError);
    }
  };
  const handleStep = (setstep) => {
    if (setstep > step) validate();
    if (validated === true && setstep > step) setStep(setstep);
    else if (setstep < step) setStep(setstep);
  };

  //Slider

  let imageURL = null;
  const sigCanvas = useRef({});
  const clear = () => {
    imageURL = null;
    sigCanvas.current.clear();
    sigCanvas.current.on();
    console.log(imageURL);
  };

  const save = () => {
    imageURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    console.log(imageURL);
  };
  let url_string = window.location;

  let url = new URL(url_string);
  let referral = String(url).split("/")[3];
  const [potMember, setPotMember] = useState(true);
  const handleMemberChange = (event) => {
    setPotMember(event.target.value);
  };

  // initiating default state for form data
  const [formData, setFormData] = useState({
    date: Date.now(),
    referral: referral,
    fraga1: null,
    fraga2: null,
    fraga3: null,
    fraga4: null,
    fraga5: null,
    fraga6: null,
    fraga7: null,
    fraga8: null,
    fraga9: null,
    potMember: null,
    firstName: null,
    lastName: null,
    email: null,
    gender: null,
    birthday: null,
    phone: null,
    medlemsvillkor: null,
    personuppgifter: null,
    signature: imageURL,
  });

  // Updating state on form change
  const handleChange = (event) => {
    if (event.target.name) {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  // Collecting all form data for submission
  const handleSubmit = (event) => {
    step === 9 ? setStep(step + 1) : setStep(step + 2);
    setFormData({ ...formData, [event.target.name]: event.target.value });

    event.preventDefault();
    addFormData(formData);
    console.log(formData);
  };

  // SIGNATURE

  return (
    <div className="form-container">
      <a
        href="https://ungadrogforebyggare.se/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="logo"
          src={logo}
          alt='Unga Drogförebyggares logotyp med texten "Unga Drogförebyggare 2008"'
        ></img>
      </a>
      <form onSubmit={handleChange}>
        {/* First page */}
        {step === 0 && (
          <>
            <div>
              <h1>Delta i Unga Drogförebyggares enskätundersökning</h1>
              <p>
                För att delta i enkäten behöver du leta mellan 13 och 25 år
                gammal.
              </p>
            </div>
          </>
        )}
        {/* Second page */}
        {step === 1 && (
          <>
            <label htmlFor="fraga1" className="required">
              Hur ofta befinner du dig i en miljö där illegala droger såsom
              ecstasy, cannabis, LSD, kokain, opiater eller amfetamin används?
            </label>
            <div className="radio-input">
              <label>
                <input
                  name="fraga1"
                  type="radio"
                  value="1"
                  onChange={handleChange}
                />
                Varje dag
              </label>
              <label>
                <input
                  name="fraga1"
                  type="radio"
                  value="2"
                  onChange={handleChange}
                />
                Varje vecka
              </label>
              <label>
                <input
                  name="fraga1"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                />
                Varje månad
              </label>
              <label>
                <input
                  name="fraga1"
                  type="radio"
                  value="4"
                  onChange={handleChange}
                />
                En gång i halvåret
              </label>
              <label>
                <input
                  name="fraga1"
                  type="radio"
                  value="5"
                  onChange={handleChange}
                />
                Aldrig
              </label>
            </div>
          </>
        )}
        {/* Third page */}
        {step === 2 && (
          <>
            <div>
              <label htmlFor="fraga2" className="required">
                Hur upplever du att din skolas undervisning om droger och tobak
                är?
                <br />
                <br />
                Du kan sleta på en skala mellan ett och tio. Ett är väldigt
                dålig och tio är väldigt bra.
              </label>
              <div className="slider-div">
                <Slider
                  defaultValue={0}
                  marks={true}
                  min={0}
                  max={10}
                  name="fraga2"
                  valueLabelDisplay="on"
                  aria-label="Always visible"
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}
        {/* Fourth page */}
        {step === 3 && (
          <>
            <label htmlFor="fraga3" className="required">
              Upplever du att det finns något grupptryck kring att prova på
              droger? (både legala och illegala droger){" "}
            </label>
            <div className="radio-input">
              <label>
                <input
                  name="fraga3"
                  type="radio"
                  value="1"
                  onChange={handleChange}
                />
                Ja, det finns ett stort grupptryck.
              </label>
              <label>
                <input
                  name="fraga3"
                  type="radio"
                  value="2"
                  onChange={handleChange}
                />
                Ja, vissa gånger.
              </label>
              <label>
                <input
                  name="fraga3"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                />
                Ja, men mycket sällan.
              </label>
              <label>
                <input
                  name="fraga3"
                  type="radio"
                  value="4"
                  onChange={handleChange}
                />
                Nej, aldrig.
              </label>
              <label>
                <input
                  name="fraga3"
                  type="radio"
                  value="4"
                  onChange={handleChange}
                />
                Jag vet inte.
              </label>
            </div>
          </>
        )}
        {/* Fifth page */}
        {step === 4 && (
          <>
            <label htmlFor="fraga4" className="required">
              Hur skulle du sleta om du blev erbjuden droger? (illegala droger){" "}
            </label>
            <div className="radio-input">
              <label>
                <input
                  name="fraga4"
                  type="radio"
                  value="1"
                  onChange={handleChange}
                />
                Jag skulle tacka ja.
              </label>
              <label>
                <input
                  name="fraga4"
                  type="radio"
                  value="2"
                  onChange={handleChange}
                />
                Jag skulle tacka nej.
              </label>

              <label>
                <input
                  name="fraga4"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                />
                Jag skulle tacka ja beroende på vilken drog det handlar om.
              </label>

              <label>
                <input
                  name="fraga4"
                  type="radio"
                  value="4"
                  onChange={handleChange}
                />
                Jag skulle tacka ja, men bara om mina kompisar också gör det.
              </label>

              <label>
                <input
                  name="fraga4"
                  type="radio"
                  value="4"
                  onChange={handleChange}
                />
                Jag vet inte.
              </label>
            </div>
          </>
        )}
        {/* Sixth page */}
        {step === 5 && (
          <>
            <label htmlFor="fraga5" className="required">
              Hur skulle du sleta om du blev erbjuden droger? (legala droger som
              tobak, snus och alkohol){" "}
            </label>
            <div className="radio-input">
              <label>
                <input
                  name="fraga5"
                  type="radio"
                  value="1"
                  onChange={handleChange}
                />
                Jag skulle tacka ja.
              </label>
              <label>
                <input
                  name="fraga5"
                  type="radio"
                  value="2"
                  onChange={handleChange}
                />
                Jag skulle tacka nej.
              </label>
              <label>
                <input
                  name="fraga5"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                />
                Jag skulle tacka ja beroende på vilken drog det handlar om.
              </label>
              <label>
                <input
                  name="fraga5"
                  type="radio"
                  value="4"
                  onChange={handleChange}
                />
                Jag skulle tacka ja, men bara om mina kompisar också gör det.
              </label>
              <label>
                <input
                  name="fraga5"
                  type="radio"
                  value="4"
                  onChange={handleChange}
                />
                Jag vet inte.
              </label>
            </div>
          </>
        )}
        {/* Seventh page */}
        {step === 6 && (
          <>
            <label htmlFor="fraga6" className="required">
              Finns det någon i din närhet som du upplever har ett alkohol-
              tobaks- eller drogmissbruk?
            </label>
            <div className="radio-input">
              <label>
                <input
                  name="fraga6"
                  type="radio"
                  value="1"
                  onChange={handleChange}
                />
                Ja.
              </label>
              <label>
                <input
                  name="fraga6"
                  type="radio"
                  value="2"
                  onChange={handleChange}
                />
                Nej.
              </label>
              <label>
                <input
                  name="fraga6"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                />
                Jag vet inte.
              </label>
            </div>
          </>
        )}
        {/* Eighth page */}
        {step === 7 && (
          <>
            <label htmlFor="fraga7" className="required">
              Hur många i din umgängeskrets använder illegala eller legala
              droger regelbundet?{" "}
            </label>
            <div className="radio-input">
              <label>
                <input
                  name="fraga7"
                  type="radio"
                  value="1"
                  onChange={handleChange}
                  className="radio-box"
                />
                Ingen.{" "}
              </label>

              <label>
                <input
                  name="fraga7"
                  type="radio"
                  value="2"
                  onChange={handleChange}
                  className="radio-box"
                />
                Nästan ingen.
              </label>
              <label>
                <input
                  name="fraga7"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                  className="radio-box"
                />
                Ganska många.
              </label>
              <label>
                <input
                  name="fraga7"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                  className="radio-box"
                />
                Nästan alla.
              </label>
              <label>
                <input
                  name="fraga7"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                  className="radio-box"
                />
                Alla.
              </label>
              <label>
                <input
                  name="fraga7"
                  type="radio"
                  value="3"
                  onChange={handleChange}
                  className="radio-box"
                />
                Jag vet inte.
              </label>
            </div>
          </>
        )}
        {/* Ninth page */}
        {step === 8 && (
          <>
            <label htmlFor="fraga8" className="required">
              Vill du ta ställning mot droger och bli medlem i Unga
              Drogförebyggare? Du har även chansen att vinna en helt ny iPhone!{" "}
            </label>
            <div className="radio-input">
              <label>
                <input
                  name="potMember"
                  type="radio"
                  value="1"
                  onChange={handleMemberChange && handleChange}
                />
                JA!
              </label>
              <label>
                <input
                  name="potMember"
                  type="radio"
                  value="2"
                  onChange={handleMemberChange && handleChange}
                />
                Nej tack.
              </label>
            </div>
          </>
        )}
        {/* Tenth page */}
        {step === 9 && (
          <>
            <div>
              <div className="formpage">
                <label className="required" htmlFor="firstName">
                  Förnamn
                </label>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    className="text-input"
                    onChange={handleChange}
                  />
                </div>
                <label className="required" htmlFor="lastName">
                  Efternamn
                </label>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    className="text-input"
                    onChange={handleChange}
                  />
                </div>
                <label className="required" htmlFor="email">
                  Epostadress
                </label>
                <div>
                  <input
                    type="text"
                    name="email"
                    className="text-input"
                    onChange={handleChange}
                  />
                </div>
                <label className="required" htmlFor="phone">
                  Mobilnummer
                </label>
                <div>
                  <input
                    type="text"
                    name="phone"
                    className="text-input"
                    onChange={handleChange}
                  />
                </div>

                <label className="required" htmlFor="gender">
                  Kön
                </label>
                <div>
                  <select
                    name="gender"
                    className="text-input"
                    onChange={handleChange}
                  >
                    <option value="kvinna">Kvinna</option>
                    <option value="man">Man</option>
                    <option value="Ickebinar">Ickebinär</option>
                  </select>
                </div>
                <label className="required" htmlFor="birthday">
                  Födelsedag
                </label>
                <div>
                  <input
                    type="date"
                    name="birthday"
                    className="text-input"
                    onChange={handleChange}
                  />
                </div>
                <label className="required" htmlFor="phone">
                  letför tycker du att man ska leva drogfritt?
                </label>
                <div>
                  <input
                    type="textarea"
                    name="phone"
                    className="text-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label className="required" htmlFor="">
                Signera här
              </label>
              <div className="sigDiv">
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    className: "sigCanvas",
                    height: 300,
                  }}
                />
                <button type="button" className="sigButton save" onClick={save}>
                  Spara
                </button>
                <button
                  type="button"
                  className="sigButton clear"
                  onClick={clear}
                >
                  Radera
                </button>
              </div>
            </div>
            <div>
              <button
                className="submit-button"
                onClick={handleSubmit}
                type="button"
              >
                Skicka
              </button>
              <button
                type="button"
                className="prev-button"
                onClick={() => handleStep(step - 1)}
              >
                Tilbaka
              </button>
              <p className="information-popup-link" onClick={togglePopup}>
                Klicka här för mer information.
              </p>
            </div>
          </>
        )}
        {/* // Last Page */}
        {step > 9 && <div>hello</div>}
        {/* Fourth page */}
        {/* Buttons */}
        {/* Buttons for first step (only next) */}
        {step === 0 && (
          <>
            <button
              className="next-button"
              type="button"
              onClick={() => handleStep(step + 1)}
            >
              Starta enkäten
            </button>

            <p className="information-popup-link" onClick={togglePopup}>
              Klicka här för mer information.
            </p>
          </>
        )}
        {/* Buttons for steps between first and last step */}
        {step > 0 && step < 9 && potMember !== "2" && (
          <>
            <button
              className="next-button"
              type="button"
              onClick={() => handleStep(step + 1)}
            >
              Nästa
            </button>
            <button
              className="prev-button"
              type="button"
              onClick={() => handleStep(step - 1)}
            >
              Tilbaka
            </button>
          </>
        )}
        {step > 0 && step < 9 && potMember === "2" && (
          <>
            <button
              className="next-button"
              type="button"
              onClick={handleSubmit}
            >
              Skicka
            </button>
          </>
        )}
      </form>

      {isOpen && (
        <Popup
          content={
            <>
              <p>
                <h2>Delta i Unga Drogförebyggares enkätundersökning!</h2>
                <p>
                  Unga Drogförebyggare arbetar med att kartlägga ungas relation
                  till droger, och vill få en sann bild av vad unga tycker. Vi
                  har därför tagit fram en enkät som delas ut till ungdomar i
                  hela Sverige. Syftet med kartläggningen är att få en ärlig
                  bild av hur ungas attityder gentemot droger ser ut. Unga
                  Drogförebyggare vill ta reda på vilka inställningar,
                  erfarenheter och kunskaper kring droger som finns, för att
                  lättare få en överblick och kunna gå in med drogförebyggande
                  insatser i tid. För att göra det behöver vi ungas hjälp,
                  därför samarbetar vi med olika skolklasser och
                  idrottsföreningar för att nå ut till så många som möjligt.
                </p>
                <h2>Vilka är Unga Drogförebyggare?</h2>
                <p>
                  Unga Drogförebyggare är en ungdomsorganisation som bildades år
                  2008. Organisationens övergripande syfte är att engagera unga
                  i det drogförebyggande arbetet genom att sprida kunskap och
                  skapa engagemang via lokalföreningar. Vi vill skapa
                  förutsättningar för en god hälsa hos ungdomar och inspirera
                  dem till ett hälsosamt liv. Vidare arbetar vi även för att få
                  unga delaktiga i civilsamhället och i det drogförebyggande
                  arbetet. Läs mer om oss på{" "}
                  <a
                    href="http://ungadrogforebyggare.se"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ungadrogforebyggare.se
                  </a>
                </p>
                <h2>Vad förbinder jag mig till?</h2>
                Genom att delta i denna kartläggning kan du medlem i Unga
                Drogförebyggare. Om du blir medlem och tar ställning mot droger
                får du möjlighet att delta i Unga Drogförebyggares lokala och
                nationella aktiviteter, träffa vänner för livet och mycket mer!
                Dessutom kommer slumpmässigt utvald enkätdeltagare vinna en
                iPhone! Du förbinder dig egentligen inte till någonting. Vi har
                inga bindningstider eller liknande som gör att du på något sätt
                blir fast. Unga Drogförebyggare handlar om egen fri vilja,
                intresse och engagemang! Som medlem i Unga Drogförebyggare
                kommer du att själv kunna styra hur pass engagerad du vill leta.
                Det betyder alltså att du kan leta en helt passiv medlem om du
                vill det. Vi spammar inte våra medlemmar med mejl och
                information, du väljer helt själv vad du vill ta del av och
                inte. Om du/ni vill engagera er har du/ni möjligheten att starta
                en egen UDF-förening på er skola, där ni bedriver egen valfri
                verksamhet. Vårt enda krav är att den är drogförebyggande. I er
                förening får ni lära er massor om föreningslivet och hur man
                driver en egen verksamhet. Ni hittar på egna aktiviteter som ni
                dessutom kan få pengar till att genomföra! Medlemskapet hos Unga
                Drogförebyggare behöver förnyas letje årsskifte, det betyder att
                ditt medlemskap försvinner automatiskt vid årets slut. Om du
                vill bli medlem igen efter årsskiftet kan du kontakta oss!
              </p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

import { perf } from "../firebaseConfig";

const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const newRec = new recognition();
newRec.lang = "de-DE";

export const MicrophoneOn = (setTranscript, setMicActive) => {
  const microphoneActivationTrace = perf.trace("activate_microphone");
  microphoneActivationTrace.start();

  setMicActive(true);
  newRec.start();

  microphoneActivationTrace.stop();

  newRec.onresult = (event) => {
    const microphoneRecognitionTrace = perf.trace(
      "check_microphone_recognition"
    );
    microphoneRecognitionTrace.start();

    console.log(event.results[0][0].transcript)

    setTranscript(event.results[0][0].transcript);
    setMicActive(false);
    newRec.stop();

    microphoneRecognitionTrace.stop();
  };
};

export const MicrophoneOff = (setTranscript, setMicActive) => {
  newRec.stop();
  setMicActive(false);
  setTranscript("");
};
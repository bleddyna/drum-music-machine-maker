import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone'
export default function useSounds() {
    const mySampler = useRef(null);

    const [isC4Played, isC4PlayedChange] = useState(false);
    const [isD4Played, isD4PlayedChange] = useState(false);
    const [isF4Played, isF4PlayedChange] = useState(false);
    const [isA4Played, isA4PlayedChange] = useState(false);

    useEffect(() => {
        const sampler = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();
        Tone.loaded().then(() => {
            mySampler.current = sampler;
        })

    }, []);



    function soundPlay(note) {
        mySampler.current.triggerAttackRelease([note], 4);
    }

    function handleKeyDown({ key }) {
        switch (key) {
            case "a":
                isC4PlayedChange(true);
                window.setTimeout(() => isC4PlayedChange(false), 300);
                soundPlay("C4");
                break;
            case "z":
                isD4PlayedChange(true);
                window.setTimeout(() => isD4PlayedChange(false), 300);
                soundPlay("D#4");
                break;
            case "e":
                isF4PlayedChange(true);
                window.setTimeout(() => isF4PlayedChange(false), 300);
                soundPlay("F#4");
                break;
            case "r":
                isA4PlayedChange(true);
                window.setTimeout(() => isA4PlayedChange(false), 300);
                soundPlay("A4");
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {

            window.removeEventListener("keydown", handleKeyDown);

        };
    }, []);

    function handleSampleChange(note, file) {
        let fileURL = URL.createObjectURL(file);
        let buffer = new Tone.Buffer(fileURL);
        mySampler.current.add(note, buffer, () => alert("Sample successfully changed!!"));
    }

    const buttonsList = [
        {
            soundPlay: () => soundPlay("C4"),
            isPlayed: isC4Played,
            id: "C4",
            handleSampleChange: (e) => handleSampleChange("C4", e.target.files[0]),
        },
        {
            soundPlay: () => soundPlay("D#4"),
            isPlayed: isD4Played,
            id: "D4",
            handleSampleChange: (e) => handleSampleChange("D#4", e.target.files[0]),
        },
        {
            soundPlay: () => soundPlay("F#4"),
            isPlayed: isF4Played,
            id: "F4",
            handleSampleChange: (e) => handleSampleChange("F#4", e.target.files[0]),
        },
        {
            soundPlay: () => soundPlay("A4"),
            isPlayed: isA4Played,
            id: "A4",
            handleSampleChange: (e) => handleSampleChange("A4", e.target.files[0]),
        }];

    return { buttonsList };
}
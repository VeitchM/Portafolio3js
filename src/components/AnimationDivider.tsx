import * as React from "react";

const cardinal = ["", "first", "second", "third"];

export default function AnimationDivider(props: { number: number }) {
    return (

        <div
        className={
            "section-margin " +
            cardinal[props.number] +
            "-move" +
            (props.number ? " h-screen " : "")
        }
        />
        )
    }

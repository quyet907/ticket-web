import { SpawnOptions } from "child_process";
import React from "react";


export const getHighlightedText = (text?: string, highlight?: string) => {
  if (
    highlight == null ||
    highlight.length === 0 ||
    text == null ||
    text.length === 0
  ){
    return text || "";
  }

  const parts: string[] = text.split(new RegExp(`(${highlight})`, "gi"));
  // const parts = text.split(highlight);

  return (
      <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { backgroundColor: "#ffed59" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  )
};


export const upperCaseFirstChar = (string: string) => {
  let upperCaseFirstChar = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return upperCaseFirstChar;
};

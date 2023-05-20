"use client"
import { createSignal } from "@react-rxjs/utils";
import { map } from "rxjs/operators";
import { bind, Subscribe } from "@react-rxjs/core";

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  return (
    <div>
      <Subscribe>
        <TextInput />
        <CharacterCount />
      </Subscribe>
    </div>
  );
}

// A signal is an entry point to react-rxjs. It's equivalent to using a subject
const [textChange$, setText] = createSignal<any>();

const [useText, text$] = bind<any>(textChange$, "");

function TextInput() {
  const text = useText();

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      Echo: {text}
    </div>
  );
}

const [useCharCount, charCount$] = bind(text$.pipe(map((text) => text.length)));

function CharacterCount() {
  const count = useCharCount();

  return <>Character Count: {count}</>;
}

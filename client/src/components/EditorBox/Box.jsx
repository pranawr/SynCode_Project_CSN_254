import React from 'react';
import Editor from "@monaco-editor/react"

const Box = (props) => {

    return (
        <>
            <div className= {(props.theme==="vs-dark")? "text-center bg-light" : "text-center bg-dark text-light"}>
                <strong>{props.feature}</strong>
            </div>
            <section>
            <Editor
                defaultLanguage="plaintext"
                height="21vh"
                theme={props.theme}
                defaultValue=""
                value={props.value}
                options={{ fontSize: props.fontSize}}
            />
            </section>
        </>
    )
}

export default Box

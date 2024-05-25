"use client";
import JsonNav from "./components/JsonNav";
import JsonFooter from "./components/JsonFooter";
import CardForm from "./components/CardForm";
import Heroish from "./components/Heroish";
export function JsonGeneratorMain(){
    return (
        <main>
            <JsonNav />
            <Heroish />
            <CardForm />
        </main>
)}

export default JsonGeneratorMain;
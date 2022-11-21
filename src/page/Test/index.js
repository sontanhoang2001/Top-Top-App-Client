import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";


function Test() {
    const [value, setValue] = useState("");

    const users = [
        {
            id: "isaac",
            display: "Trả lời Isaac Newton :",
        },
        {
            id: "sam",
            display: "Trả lời Sam Victor :",
        },
        {
            id: "emma",
            display: "Trả lời emmanuel@nobody.com :",
        },
    ];

    return (
        <div>
            <h2>Let's get started</h2>
            <MentionsInput
                value={value}
                onChange={(e) => setValue(e.target.value)}>

                <Mention
                    data={users} />
            </MentionsInput>
        </div>
    );
}
export default Test;
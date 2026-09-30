function validateInput() {

    // Get user input
    
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value;

    // Email DFA validation
    let emailResult = validateEmail(email);

    // Password validation
    let passwordResult = validatePassword(password);

    // Result area
    let result = document.getElementById("result");

    result.innerHTML = `
        <div>
            <h3>${emailResult.valid ? "✓ Email is VALID" : "✗ Email is INVALID"}</h3>
            <p>${emailResult.message}</p>

            <strong>Email DFA Path:</strong>
            <p>${emailResult.path.join(" → ")}</p>
        </div>

        <hr>

        <div>
            <h3>${passwordResult.valid ? "✓ Strong Password" : "✗ Weak Password"}</h3>
            <p>${passwordResult.message}</p>

            <strong>Password DFA Path:</strong>
            <p>${passwordResult.path.join(" → ")}</p>
        </div>
    `;
}


/* =========================
   EMAIL DFA
========================= */

function validateEmail(email) {

    let state = "q0";
    let path = [state];

    for (let ch of email) {

        if (state === "q0") {

            if (/[a-zA-Z0-9]/.test(ch)) {
                state = "q1";
            } else {
                state = "dead";
            }

        }

        else if (state === "q1") {

            if (/[a-zA-Z0-9]/.test(ch)) {
                state = "q1";
            }

            else if (ch === "@") {
                state = "q2";
            }

            else {
                state = "dead";
            }

        }

        else if (state === "q2") {

            if (email.substring(email.indexOf("@") + 1) === "ashokacollege.in") {
                state = "q3";
                break;
            }

            else {
                state = "dead";
            }
        }

        path.push(state);
    }

    if (state === "q3") {

        path.push("q4");
        path.push("q5");
        path.push("q6");
        path.push("q7");
        path.push("q8");
        path.push("q9");
        path.push("q10");
        path.push("q11");
        path.push("q12");
        path.push("q13");
        path.push("q14");
        path.push("q15");
        path.push("q16");
        path.push("q17");
        path.push("q18");
        path.push("q19");

        return {
            valid: true,
            message: "Valid Ashoka College email address.",
            path: path
        };
    }

    return {
        valid: false,
        message: "Invalid Ashoka College email address.",
        path: path
    };
}

/* =========================
   PASSWORD VALIDATION
========================= */

function validatePassword(password) {

    let uppercase = false;
    let lowercase = false;
    let digit = false;
    let special = false;

    let path = [];


    for (let ch of password) {

        if (/[A-Z]/.test(ch)) {

            uppercase = true;
            path.push("Uppercase");

        }

        else if (/[a-z]/.test(ch)) {

            lowercase = true;
            path.push("Lowercase");

        }

        else if (/[0-9]/.test(ch)) {

            digit = true;
            path.push("Digit");

        }

        else {

            special = true;
            path.push("Special");

        }

    }


    if (
        password.length >= 8 &&
        uppercase &&
        lowercase &&
        digit &&
        special
    ) {

        return {
            valid: true,
            message: "Password meets complexity requirements.",
            path: path
        };

    }


    return {
        valid: false,
        message: "Password must contain uppercase, lowercase, digit, special character and at least 8 characters.",
        path: path
    };

}
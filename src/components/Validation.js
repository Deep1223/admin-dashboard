import Config from "@/config/config";

const validateField = (name, value, rules) => {
    try {
        const { required, type, minLength, maxLength, pattern } = rules;
        let error = "";

        // Required Field Validation
        if (required && !value) {
            return `${name} ${Config.requirederror}`;
        }

        // Email Validation
        if (type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                return Config.invalidEmailerror;
            }
        }

        // File Validation
        if (type === "file" && value) {
            const allowedFormats = [".csv", ".xlsx"];
            const fileExtension = value.name.split(".").pop();
            if (!allowedFormats.includes(`.${fileExtension}`)) {
                return Config.invalidFileFormaterror;
            }
        }

        // Number Validation (Only Digits)
        if (type === "number" && value) {
            const numberRegex = /^\d+$/;
            if (!numberRegex.test(value)) {
                return `${name} ${Config.onlyNumberserror}`;
            }
        }

        // Alphabet Validation (Only Letters)
        if (type === "text" && value) {
            const alphabetRegex = /^[A-Za-z\s]+$/;
            if (!alphabetRegex.test(value)) {
                return `${name} ${Config.onlyAlphabetserror}`;
            }
        }

        // Password Strength Validation (Min 6 chars, at least 1 uppercase, 1 number, 1 special character)
        if (type === "password" && value) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            if (!passwordRegex.test(value)) {
                return Config.weakPassworderror;
            }
        }

        return error;
    }
    catch (e) {
        console.log(e);
        return <></>;
    };
};

export default validateField;

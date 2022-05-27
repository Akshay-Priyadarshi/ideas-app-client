import { useRef, useState } from "react";
import styles from "./PasswordField.module.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import classNames from "classnames";

interface Props extends React.ComponentProps<"div"> {
    inputFieldProps: React.ComponentProps<"input">;
}

const PasswordField: React.FC<Props> = ({
    inputFieldProps,
    className,
    ...fieldRest
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { className: inputClassname, ...inputRest } = inputFieldProps;

    return (
        <div
            className={classNames(className, styles.passwordField)}
            {...fieldRest}
        >
            <input
                ref={inputRef}
                className={classNames(
                    inputClassname,
                    styles.passwordFieldInput
                )}
                {...inputRest}
            />
            {showPassword ? (
                <button className={styles.eyeButton} type="button">
                    <BsEyeSlashFill
                        className={styles.eyeIcon}
                        onClick={() => {
                            if (inputRef && inputRef.current)
                                inputRef.current.type = "password";
                            setShowPassword(false);
                        }}
                    />
                </button>
            ) : (
                <button className={styles.eyeButton} type="button">
                    <BsEyeFill
                        className={styles.eyeIcon}
                        onClick={() => {
                            if (inputRef && inputRef.current)
                                inputRef.current.type = "text";
                            setShowPassword(true);
                        }}
                    />
                </button>
            )}
        </div>
    );
};

export default PasswordField;

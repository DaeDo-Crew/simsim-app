import * as React from "react";

export function usePasswordConfirm(passwordValue: string) {
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passwordConfirmTouched, setPasswordConfirmTouched] = React.useState(
    false
  );
  const [passwordConfirmError, setPasswordConfirmError] = React.useState("");

  React.useEffect(() => {
    if (!passwordConfirm) {
      setPasswordConfirmError("비밀번호를 한 번 더 입력해주세요.");
    } else if (passwordValue !== passwordConfirm) {
      setPasswordConfirmError("입력하신 비밀번호와 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
    console.log(passwordConfirmError);
  }, [passwordValue, passwordConfirm]);

  const handlePasswordConfirmChange = (password: string) => {
    setPasswordConfirm(password);
  };
  const handlePasswordConfirmBlur = (e: React.SyntheticEvent<any>) => {
    if (e.target) {
      setPasswordConfirmTouched(true);
    }
  };

  const validatePasswordConfirm = () => {
    setPasswordConfirmTouched(true);
    return !passwordConfirmError;
  };

  return {
    passwordConfirm,
    passwordConfirmTouched,
    passwordConfirmError,
    validatePasswordConfirm,
    handlePasswordConfirmChange,
    handlePasswordConfirmBlur,
  };
}

export const checkvalidData = (email, password) => {

    const isEmailValid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);

    const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/.test(password);

    if(!isEmailValid) return "Email is not Vaild"
    if(!isPasswordValid) return "Password is incorrect"

};


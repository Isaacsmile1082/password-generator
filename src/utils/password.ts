import { Inputs } from "../App";

export const getPassword = async (options: Inputs) => {
    const queryString = new URLSearchParams(options);
    try {
        const res = await fetch(`http://localhost:8000/password?${queryString}`);
        const newPassword = await res.json();
        return newPassword
    } catch (error) {
        console.log(error);
    }
}
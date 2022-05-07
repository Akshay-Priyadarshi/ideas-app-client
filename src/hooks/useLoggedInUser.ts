import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../customs/user";

const useLoggedInUser = (userId: String) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const fetchLoggedInUser = async () => {
        try {
            const res = await axios.get(`/users/${userId}`);
            const user = new User(res.data);
            setLoggedInUser(user);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchLoggedInUser();
    }, [userId]);

    return { loggedInUser };
};

export default useLoggedInUser;

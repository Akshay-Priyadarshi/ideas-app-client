import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../customs/user";

const useLoggedInUser = (userId: String | undefined) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const fetchLoggedInUser = async () => {
        try {
            if (userId) {
                const res = await axios.get(`/users/${userId}`);
                const user = new User(res.data);
                setLoggedInUser(user);
            }
            setLoggedInUser(null);
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

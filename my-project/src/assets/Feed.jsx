import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedslice";
import { useEffect } from "react";
import Feedcard from "./feedcard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getfeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get("http://localhost:3000/user/feed", {
                withCredentials: true
            });
            console.log(res)
            dispatch(addFeed(res?.data?.users));
        }
        catch (error) {
            console.log(error)

        }

    }

    useEffect(() => {
        //as the page load we have to call it
        getfeed()
    }, [])


    if (!Array.isArray(feed) || feed.length === 0) return (<div className="text-2xl flex-row justify-items-center my-9">No User Found</div>)
    return (
        feed && (
            <div className="flex justify-center my-10">

                <Feedcard user={feed[1]} />
            </div>
        )

    );
}
export default Feed;

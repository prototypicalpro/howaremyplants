import * as React from "react";

/**
 * Simple hook to create an effect that fetches data from my API.
 * Source code for my API can be found here: https://github.com/prototypicalpro/LambdaWorkspace/tree/master/getplant
 */

/** interface specifying the returned object by the plant API */
interface IPlantRet {
    img_id: string;
    date_taken: string;
    if_you_can_see_this_i_love_you_so_much: boolean;
}

const API_URL = "https://plants.prototypical.pro/";

/**
 * Collect data on some plants, courtesy of AWS lambda
 * @returns Some data about plants!
 */
export default function usePlant(visible = true, refreshInterval?: number): IPlantRet | null {
    const [plantData, setPlantData] = React.useState<IPlantRet | null>(null);
    const [now, setNow] = React.useState(Date.now());
    const timeoutID = React.useRef<number | null>(null);

    // get my plant data!
    React.useEffect(() => {
        setPlantData(null);
        fetch(API_URL, { mode: "cors" })
        .then((res) => {
            if (res.status === 200) return res.json();
            else throw Error(`Bad status code from API: ${res.status}`);
        })
        .then(setPlantData)
        .catch((err) => {
            console.error("Error during API fetch!");
            console.error(err);
            setPlantData(null);
        });
    }, [setPlantData, now]);

    // tell my plant data to keep updating every refreshInterval times
    React.useEffect(() => {
        if (refreshInterval && plantData && visible) {
            // tell the window to update refresh_interval amount after the plant data
            // says the photo was taken
            const callback = () => setNow(Date.now());
            // if we've covered the interval since we last ran this effect, run immediatly
            if (Date.now() - now > refreshInterval) callback();
            else {
                const time_until_next = refreshInterval - (Date.now() - new Date(plantData.date_taken).getTime());
                 // if time < 0, then wait the full refresh interval so we don't refetch continously
                timeoutID.current = window.setTimeout(callback, time_until_next < 0 ? refreshInterval : time_until_next);
                return () => { if (timeoutID.current) window.clearTimeout(timeoutID.current); };
            }
        }
    }, [refreshInterval, setNow, plantData, timeoutID, visible, now]);

    return plantData;
}
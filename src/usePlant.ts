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
 * Collect data on my git commit history, courtesy of AWS lambda.
 * @returns Some data about plants!
 */
const usePlant: () => IPlantRet | null = () => {
    const [plantData, setPlantData] = React.useState(null);

    React.useEffect(() => {
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
    }, [setPlantData]);

    return plantData;
};

export default usePlant;
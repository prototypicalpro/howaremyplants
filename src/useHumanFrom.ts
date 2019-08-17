import * as React from "react";

/** simple utility to create a human readable time, from https://stackoverflow.com/questions/7641791/javascript-library-for-human-friendly-relative-date-formatting */

export default function useHumanFrom(visible = true, was?: Date): string {
    // Make a fuzzy time
    const [now, setNow] = React.useState<number>(Date.now());
    const timeoutID = React.useRef<number | null>(null);
    // update every second
    React.useEffect(() => {
        // start!
        if (was && visible) {
            const update = () => {
                timeoutID.current = null;
                setNow(Date.now());
            };
            // get the delta time
            const delta = Math.round((now - was.getTime()) / 1000) ;
            // based on the delta time, set the next callback time
            // 1 second
            if (delta < 60) timeoutID.current = window.setTimeout(update, 1000);
            // 1 minute
            else if (delta < 3600) timeoutID.current = window.setTimeout(update, 60000);
            // 1 hour
            else timeoutID.current = window.setTimeout(update, 3600000);
            // cleanup
            return () => { if (timeoutID.current) window.clearTimeout(timeoutID.current); };
        }
    }, [was, now, visible]);
    // return our "estimate"
    const delta = was ? Math.round((now - was.getTime()) / 1000) : null;
    // < 30 seconds
    if (delta === null) return "";
    if (delta < 30) return "just now.";
    // < 1 minute
    if (delta < 60) return delta + " seconds ago.";
    // < 2 minutes
    if (delta < 120) return "a minute ago.";
    // < 1 hour
    if (delta < 3600) return Math.floor(delta / 60) + " minutes ago.";
    // 1 hour <= x < 2 hours
    if (Math.floor(delta / 3600) === 1) return "an hour ago.";
    // < 12 hours
    if (delta < 43200) return Math.floor(delta / 3600) + " hours ago.";
    return "awhile ago.";
}
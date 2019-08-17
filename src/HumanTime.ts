/** simple utility to create a human readable time, from https://stackoverflow.com/questions/7641791/javascript-library-for-human-friendly-relative-date-formatting */

export default function HumanTime(was: Date): string {
    // Make a fuzzy time
    const delta = Math.round((new Date().getTime() - was.getTime()) / 1000);
    // return our "estimate"
    // < 30 seconds
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
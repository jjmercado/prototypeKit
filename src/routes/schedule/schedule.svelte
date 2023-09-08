<script>
    import { getToken, getResponse } from "../../stores";
    import { DateTime } from "luxon";

    // let body;
    let calendarTime = {
        startTime: "2023-09-01T00:00:04.424Z",
        endTime: "2023-09-30T23:59:04.424Z",
    };

    let call = async () => {
        let accessToken = await getToken();
        let body = await getResponse(accessToken, calendarTime.startTime, calendarTime.endTime);

        let sortedGraph = body.value.sort((a,b) => a.start.dateTime.localeCompare(b.start.dateTime));

        return sortedGraph;
    }

    let body = call();
</script>

{#await body}
    <p>Loading...</p>
{:then body}
    {#each body as item}
        <div>
            <p>{item.subject}</p>
            <p>{DateTime.fromISO(item.start.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff")} - {DateTime.fromISO(item.end.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff")}</p>
            <p>{item.organizer.emailAddress.name}</p>
        </div>
    {/each}
{/await}
    

<style>
    div
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid red;
        height: 10rem;
        width: 10rem;
    }
</style>
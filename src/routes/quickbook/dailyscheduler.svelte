<script>
    import { getToken, getResponse } from "../../stores";
    import { DateTime } from "luxon";

    // let body;
    let calendarTime = {
        startTime: "2023-09-08T00:00:04.424Z",
        endTime: "2023-09-08T23:59:04.424Z",
    };

    let call = async () => {
        let accessToken = await getToken();
        let body = await getResponse(accessToken, calendarTime.startTime, calendarTime.endTime);

        let sortedGraph = body.value.sort((a,b) => a.start.dateTime.localeCompare(b.start.dateTime));

        return sortedGraph;
    }

    let body = call();
</script>

<div class="schedule">
    <p>Belegte Zeiten</p>
    {#await body}
        <p>Loading...</p>
    {:then body}
        {#if body.length <= 0}
            <p>Keine Termine vorhanden</p>
        {:else}
            {#each body as item}
                <div>
                    <p>{DateTime.fromISO(item.start.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("t")} - {DateTime.fromISO(item.end.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("t")}</p>
                </div>
            {/each}
        {/if}
    {/await}
</div>

<style>
    .schedule
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }
</style>
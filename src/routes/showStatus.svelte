<script>
    import { onMount } from "svelte";
    import { getToken, getResponse, getCurrentElement, time } from "../stores";
    import { DateTime } from "luxon";
    import Clock from "./clock.svelte";

    let graphData = [];
    $: startTime = "";
    $: endTime = "";
    $: currentTime = $time.toFormat("ff");

    onMount(async () => {
        let getAccount = sessionStorage.getItem("msalAccount"); 
        
        if (getAccount) 
        {  
            let accessToken = await getToken();
            graphData = await getResponse(accessToken);
        }
        else
        {
            console.error("No Account available!");
        }

        graphData.value = getCurrentElement(graphData);

        startTime = DateTime.fromISO(graphData.value[0].start.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");
        endTime = DateTime.fromISO(graphData.value[0].end.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");
        
    })
</script>

<div class:status-container-free={!(currentTime >= startTime && currentTime <= endTime)} class:status-container-occupied={currentTime >= startTime && currentTime <= endTime}>
    <h1>Besprechung 1.OG RG</h1>
    <Clock/>
    {#if !(currentTime >= startTime && currentTime <= endTime)}
        <p>Raum frei bis zum {startTime}</p>
    {:else}
        <p>Raum besetzt bis zum {endTime}</p>
    {/if}
</div>

<style>
    .status-container-free
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        background-color: green;
    }

    .status-container-occupied
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        background-color: red;
    }
</style>
<script>
    import { onMount } from "svelte";
    import { getToken, getResponse, getCurrentElement, time } from "../stores";
    import { DateTime } from "luxon";
    import Clock from "./clock.svelte";

    let graphData = [];
    $: calcStartTime = "";
    $: calcEndTime = "";
    $: currentTime = $time;
    let showStartTime;
    let showEndTime;

    onMount(async () => {
        
        updateData();
        
        setInterval(updateData, 30000); 
    })
    
    let updateData = async () => 
    {
        let getAccount = sessionStorage.getItem("msalAccount");
        if (getAccount) 
        {
            let accessToken = await getToken();
            graphData = await getResponse(accessToken);
            graphData.value = getCurrentElement(graphData);  
            calcStartTime = DateTime.fromISO(graphData.value[0].start.dateTime);
            calcEndTime = DateTime.fromISO(graphData.value[0].end.dateTime);
            if (graphData.value[0].isAllDay) 
            {
                showStartTime = DateTime.fromISO(graphData.value[0].start.dateTime).setLocale("de").toFormat("ff");
                showEndTime = DateTime.fromISO(graphData.value[0].end.dateTime).setLocale("de").toFormat("ff");
            } 
            else 
            {
                showStartTime = DateTime.fromISO(graphData.value[0].start.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");
                showEndTime = DateTime.fromISO(graphData.value[0].end.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");    
            }
        } else 
        {
            console.log("not called");    
        }
    }
</script>

<div class:status-container-free={!(currentTime >= calcStartTime && currentTime <= calcEndTime)} class:status-container-occupied={currentTime >= calcStartTime && currentTime <= calcEndTime}>
    <h1>Besprechung 1.OG RG</h1>
    <Clock/>
    {#if !(currentTime >= calcStartTime && currentTime <= calcEndTime)}
       <p>Raum frei bis zum {showStartTime}</p> 
    {:else}
        <p>Raum besetzt bis zum {showEndTime}</p> <!-- Dient nur der Ausgabe der korrekten Zeit -->
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
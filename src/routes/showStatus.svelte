<script>
    import { onMount } from "svelte";
    import { getToken, getResponse } from "../stores";
    import { DateTime } from "luxon";

    let isOccupied = false;
    let graphData = [];
    let startTime;
    let endTime;
    let currentTime = DateTime.now().toFormat("ff");

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
        startTime = DateTime.fromISO(graphData.value[0].start.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");
        endTime = DateTime.fromISO(graphData.value[0].end.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");
        
        if (currentTime >= startTime && currentTime <= endTime) {
            isOccupied = true;
        } else {
            isOccupied = false;
        }
    })
    
</script>

<div class:status-container-free={!isOccupied} class:status-container-occupied={isOccupied}>
    <h1>Besprechung 1.OG RG</h1>
    <img src="clock.png" alt="Eine Uhr"/>
    {#if !isOccupied}
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

    img
    {
        width: 200px;
    }
</style>
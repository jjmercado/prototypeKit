<script>
    import { onMount} from "svelte";
    import { getToken, getResponse, getCurrentElement, time } from "../stores";
    import { DateTime } from "luxon";
    import Clock from "./clock.svelte";

    let calendarTime = {
        startTime: "2023-09-01T00:00:04.424Z",
        endTime: "2023-09-30T23:59:04.424Z",
    }
    let graphData = [];
    $: calcStartTime = "";
    $: calcEndTime = "";
    $: currentTime = $time;
    let showStartTime;
    let showEndTime;
    
    onMount(async () => {
        let intervalID;
        updateData();
        
        intervalID = setInterval(updateData, 30000); 

        return () => {
            clearInterval(intervalID);
        }
    })
    
    let updateData = async () => 
    {
        let getAccount = sessionStorage.getItem("msalAccount");
        if (getAccount) 
        {
            let accessToken = await getToken();
            graphData = await getResponse(accessToken, calendarTime.startTime, calendarTime.endTime);
            graphData.value = getCurrentElement(graphData);  
            calcStartTime = DateTime.fromISO(graphData.value[0].start.dateTime).plus({ hours: 2 });
            calcEndTime = DateTime.fromISO(graphData.value[0].end.dateTime).plus({ hours: 2 });
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

    // NOTE: Alles was aus Microsoft Graph geladen wird, was die Zeiten betrifft, ist trotz zetlicher Umwandlung, zwei Stunden zurück. Daher muss nochmals zwei Stunden drauf gerechnet werden
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
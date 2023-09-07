<script>
    import { onMount } from "svelte";
    import { getToken, getResponse, getCurrentElement, time } from "../stores"; 
    import { DateTime } from "luxon";
    
    $: graphData = [];
    $: organizerName = "";
    $: eventSubject = "";
    $: startTime = "";
    $: endTime = "";
    $: currentTime = $time;
    let showStartTime;
    let showEndTime;
    
    onMount(async () => 
    {
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
            organizerName = graphData.value[0].organizer.emailAddress.name;
            eventSubject = graphData.value[0].subject;
            startTime = DateTime.fromISO(graphData.value[0].start.dateTime);
            endTime = DateTime.fromISO(graphData.value[0].end.dateTime);
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
        } 
        else 
        {
            console.log("not called");    
        }
    }
    </script>


    <div class="nextMeeting-container">
        {#if !(currentTime >= startTime && currentTime <= endTime)}
            <p>Nächste Besprechung</p>
        {:else}
            <p>Aktuelle Besprechung</p>
        {/if}
        <p>{organizerName}</p>
        <p>{eventSubject}</p>
        <p>{showStartTime} - {showEndTime}</p>
    </div>
    
    <style>
        .nextMeeting-container
        {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;
            border: 1px solid black;
        }
    </style>
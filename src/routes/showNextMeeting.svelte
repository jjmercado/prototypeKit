<script>

    import { onMount } from "svelte";
    import { getToken, getResponse, getCurrentElement } from "../stores"; 
    import { DateTime } from "luxon";
    
    $: graphData = [];
    let organizerName;
    let eventSubject;
    let startTime;
    let endTime;
    
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

        organizerName = graphData.value[0].organizer.emailAddress.name;
        eventSubject = graphData.value[0].subject;
        startTime = DateTime.fromISO(graphData.value[0].start.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");
        endTime = DateTime.fromISO(graphData.value[0].end.dateTime).plus({ hours: 2 }).setLocale("de").toFormat("ff");
    })
    </script>
    
    <div class="nextMeeting-container">
        <p>
            Nächste Besprechung
        </p>
        <p>{organizerName}</p>
        <p>{eventSubject}</p>
        <p>{startTime} - {endTime}</p>
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
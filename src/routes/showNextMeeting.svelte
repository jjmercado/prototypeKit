<script>

    import { onMount } from "svelte";
    import { getToken, getResponse } from "../stores"; 
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
    
        // console.log(graphData);
        // console.log(graphData.value[0]);
        graphData.value = getCurrentElement(graphData);
        // console.log(graphData.value);
        // for (let index = 0; index < graphData.value.length; index++) {
            
        //     console.log(graphData.value[index].start.dateTime);
        // }
        organizerName = graphData.value[0].organizer.emailAddress.name;
        eventSubject = graphData.value[0].subject;
        startTime = getTime(graphData.value[0].start.dateTime);
        endTime = getTime(graphData.value[0].end.dateTime);
    })

    let getCurrentElement = (graphData) => {
        let currentTime = DateTime.now()//.toFormat("ff");
        let startTime;
        let endTime;

        let sortedGraph = graphData.value.sort((a,b) => a.start.dateTime.localeCompare(b.start.dateTime));

        for (let index = 0; index < graphData.value.length; index++) 
        {
            startTime = DateTime.fromISO(sortedGraph[index].start.dateTime).plus({ hours: 2 });
            endTime = DateTime.fromISO(sortedGraph[index].end.dateTime).plus({ hours: 2 });

            if(startTime < currentTime)
            {
                sortedGraph.splice(index, 1);
                index--;
            }
        }
        return sortedGraph;
    }
    
    const getTime = (time) => {
        let newTime = new Date(time);
        const options = 
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: 'Europe/Berlin',
            hour: "2-digit",
            minute: "2-digit"
        };
    
        newTime.setHours(newTime.getHours() + 2); // eventuell problematisch mit Sommer/Winterzeit
        return newTime.toLocaleString("de-DE", options);
    }
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
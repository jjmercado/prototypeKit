<script>
    import ShowStatus from "./showStatus.svelte";
    import Navigation from "./navigation.svelte";
    import ShowNextMeeting from "./showNextMeeting.svelte";
    import { signIn } from "../stores";
    import { onMount } from "svelte";
    import { Client } from "@microsoft/microsoft-graph-client";

    // export let data;

    onMount(async () => 
    {
        let getAccount = sessionStorage.getItem("msalAccount");
        
        if (!getAccount) 
        {  
            await signIn();
            location.reload();
        }
    });
        
</script>

<main>
    <div class="status-container">
        <ShowStatus></ShowStatus>
        <ShowNextMeeting></ShowNextMeeting>
    </div>
    <div class="navigation-container">
        <Navigation></Navigation>
    </div>
</main>

<style>
    main
    {
        display: flex;
        height: 100vh;
    }

    .status-container
    {
        display: flex;
        flex-direction: column;
        flex: 1 0 80%;
    }

    .navigation-container
    {
        display: flex;
        flex: 1 0 20%;
    }
</style>
<script>
    import Message from "./message.svelte";
    import Schedule from "./schedule.svelte";
    import Header from "./header.svelte";
</script>

<main>
    <div class="message-container">
        <Message/>
    </div>
    <div class="container">
        <div class="header-container">
            <Header/>
        </div>
        <div class="schedule-container">
            <Schedule/> 
        </div>
    </div>
</main>

<style>
    main
    {
        display: flex;
        height: 100vh;
    }

    .message-container
    {
        display: flex;
        align-items: center;
        text-align: center;
        background-color: lightgray;
        flex: 1 0 20%;
    }
    
    .schedule-container
    {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex: 1;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .header-container
    {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    
    .container
    {
        display: flex;
        flex-direction: column;
        flex: 1 0 80%;
    }
</style>
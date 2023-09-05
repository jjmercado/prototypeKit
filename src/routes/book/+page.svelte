<script>
    import Dailyscheduler from "./dailyscheduler.svelte";
    import Header from "./header.svelte";
    import Buttons from "./buttons.svelte";
</script>

<main>
    <div class="container">
        <Header/>
        <Buttons/>
    </div>
    <div class="schedule-container">
        <Dailyscheduler/>
    </div>
</main>

<style>
    main
    {
        display: flex;
        height: 100vh;
    }

    .container
    {
        display: flex;
        flex-direction: column;
        flex: 1 0 80%;
    }

    .schedule-container
    {
        display: flex;
        flex: 1 0 20%;
    }
</style>
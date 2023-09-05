<script>
    let isOccupied = false;
</script>

<div class:status-container-free={!isOccupied} class:status-container-occupied={isOccupied}>
    <h1>Besprechung 1.OG RG</h1>
    <img src="clock.png" alt="Eine Uhr"/>
    <p>zeit und datum</p>
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
        background-color: green;
    }

    img
    {
        width: 200px;
    }
</style>
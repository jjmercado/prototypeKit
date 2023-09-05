<script>
    export let quickBookPath = "/quickbook";
    export let schedulePath = "/schedule";

    let currentDay = new Date();
    const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    
    const date = new Date();
    let currentDayIndex = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
</script>

<div class="navigation-container">
    <img src="RG_Logo_Illustration.png" alt="Logo der Rietzler-Gruppe"/>

    <div>
        <p>{days[currentDay.getDay()]}</p>
        <p>
            {#if currentDayIndex < 10}
                0{currentDayIndex}.
            {:else}
                {currentDayIndex}.
            {/if}

            {#if currentMonth < 10}
                0{currentMonth}.
            {:else}
                {currentMonth}.
            {/if}

            {currentYear}</p>
    </div>

    <div class="button-container">
        <a href={quickBookPath}><button>Schnell Buchung</button></a>
        <a href={schedulePath}><button>Zeitplan</button></a>
    </div>
</div>

<style>
    .navigation-container
    {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        flex: 1;
    }

    .button-container
    {
        display: flex;
        flex-direction: column;
        gap: 1rem;   
    }
</style>
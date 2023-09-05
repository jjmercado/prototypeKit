<script>
    import { DateTime } from "luxon";
    export let quickBookPath = "/quickbook";
    export let schedulePath = "/schedule";

    let currentDay = new Date();
    const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    
</script>

<div class="navigation-container">
    <img src="RG_Logo_Illustration.png" alt="Logo der Rietzler-Gruppe"/>

    <div>
        <p>{days[currentDay.getDay()]}</p>
        <p>
            {DateTime.now().toFormat("dd.MM.yyyy")}
        </p>
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
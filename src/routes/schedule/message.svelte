<script>
    import BackButton from "../../lib/backButton.svelte";
    import { DateTime } from "luxon";
    import { time } from "../../stores";

    const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    let currentHour = $time.hour < 10 ? "0" + $time.hour : $time.hour;
    let currentMinute = $time.minute < 10 ? "0" + $time.minute : $time.minute;
</script>

<div class="message-container">
    <BackButton/>
    <h1>Schönen <br>Tag <br> wünschen <br> wir!</h1>
    <p>{currentHour}:{currentMinute}</p>
    <p>{weekdays[DateTime.now().weekday]}</p>
    <p>{DateTime.now().toFormat("dd.MM.yyyy")}</p>
</div>

<style>
    .message-container
    {
        flex: 1;
    }
</style>
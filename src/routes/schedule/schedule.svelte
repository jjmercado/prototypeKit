<script>
    import { onMount } from "svelte";
    import { getToken, getResponse } from "../../stores";

    let fullName;

    onMount(async () => {
        let accessToken = await getToken();
        let body = await getResponse(accessToken);
        console.log(body);
        fullName = body.displayName;
    })
</script>

{#each Array(24) as _}
    <div>
        <p>Betreff</p>
        <p>11:00-13:00</p>
        <p>{fullName}</p>
    </div>
{/each}
    

<style>
    div
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid red;
        height: 10rem;
        width: 10rem;
    }
</style>
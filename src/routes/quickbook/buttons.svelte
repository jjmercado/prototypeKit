<script>
    import Modal from "./modal.svelte";

    const buttonValues = [30, 60, 90, 120, "+"];
    
    let showModal = false;
</script>

<div class="button-container">
    {#each buttonValues as value}
        {#if value === "+"}
            <button>{value}</button>
        {:else}
            <button on:click={() => showModal = true}>{value} min</button>
        {/if}
    {/each}
</div>

<Modal bind:showModal />

<style>
    .button-container
    {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        border: 1px solid black;
        flex: 1;
    }

    button
    {
        width: 10rem;
        height: 10rem;
        font-size: 2rem;
    }
</style>


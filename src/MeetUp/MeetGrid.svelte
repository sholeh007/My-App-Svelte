<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import MeetItem from "./MeetItem.svelte";
  import MeetupFilter from "../MeetUp/MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";

  export let meets;
  let favOnly = false;
  const dispatch = createEventDispatcher();

  $: filterSet = favOnly ? meets.filter((item) => item.isFavorite) : meets;

  const setFilter = (event) => {
    favOnly = event.detail === 1;
  };
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .posisi-error {
    text-align: center;
    font-size: 24px;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>

{#if filterSet.length === 0}
  <div class="posisi-error">
    <p>Data not found!</p>
  </div>
{/if}
<section id="meetups">
  {#each filterSet as meet (meet.id)}
    <div transition:scale|local animate:flip={{ duration: 300 }}>
      <MeetItem
        id={meet.id}
        title={meet.title}
        imageUrl={meet.imageUrl}
        address={meet.address}
        description={meet.description}
        isFavorite={meet.isFavorite}
        on:showDetail
        on:editMeet />
    </div>
  {/each}
</section>

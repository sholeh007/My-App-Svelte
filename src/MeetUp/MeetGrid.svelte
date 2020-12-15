<script>
  import { createEventDispatcher } from "svelte";
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

<section id="meetups">
  {#each filterSet as meet}
    <MeetItem
      id={meet.id}
      title={meet.title}
      imageUrl={meet.imageUrl}
      address={meet.address}
      description={meet.description}
      isFavorite={meet.isFavorite}
      on:showDetail
      on:editMeet />
  {/each}
</section>

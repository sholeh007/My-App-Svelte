<script>
  import MeetItem from "./MeetItem.svelte";

  export let meets;
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section>
  {#each meets as meet}
    <MeetItem
      id={meet.id}
      title={meet.title}
      imageUrl={meet.imageUrl}
      address={meet.address}
      contactEmail={meet.email}
      description={meet.description}
      isFavorite={meet.isFavorite}
      on:showDetail
      on:editMeet />
  {/each}
</section>

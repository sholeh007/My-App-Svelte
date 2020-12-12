<script>
  import { createEventDispatcher } from "svelte";
  import meetup from "../data/store.js";
  import Badge from "../UI/Badge.svelte";
  import Button from "../UI/Button.svelte";

  export let id;
  export let title;
  export let imageUrl;
  export let description;
  export let address;
  export let isFavorite;

  const dispatch = createEventDispatcher();

  const detail = () => {
    dispatch("showDetail", id);
  };

  const handleFavorite = () => {
    meetup.toggleFavorite(id);
  };

  const edit = () => {
    dispatch("editMeet", id);
  };

  const deleteMeet = () => {
    if (confirm("Are you sure?")) {
      return meetup.removeMeetup(id);
    }
    return;
  };
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab";
  }

  .content {
    height: 4rem;
  }

  .posisi-btn-remove {
    text-align: right;
    margin-right: 20px;
  }

  .btn-remove {
    position: absolute;
    cursor: pointer;
    border: none;
    outline-style: none;
    background: none;
    font-size: 30px;
    opacity: 0.4;
    padding: 0;
    margin-top: -5px;
  }
</style>

<article>
  <header>
    <div class="posisi-btn-remove">
      <button
        class="btn-remove"
        type="button"
        on:click={deleteMeet}>&times;</button>
    </div>
    <h1>
      {title}
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <address>{address}</address>
  </header>
  <div class="image"><img src={imageUrl} loading="lazy" alt={title} /></div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button type="button" mode="outline" on:click={edit}>Edit</Button>
    <Button type="button" on:click={detail}>Detail</Button>
    <Button
      type="button"
      mode="outline"
      color={isFavorite ? '' : 'success'}
      on:click={handleFavorite}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </Button>
  </footer>
</article>

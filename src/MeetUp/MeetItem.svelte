<script>
  import { createEventDispatcher } from "svelte";
  import Badge from "../UI/Badge.svelte";
  export let id;
  export let title;
  export let imageUrl;
  export let description;
  export let contactEmail;
  export let address;
  export let isFavorite;
  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  const handleFavorite = () => {
    dispatch("toggleFavorite", id);
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
</style>

<article>
  <header>
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
    <Button typeElement="href" {contactEmail}>Contact Us</Button>
    <Button type="button">Detail</Button>
    <Button
      type="button"
      mode="outline"
      color={isFavorite ? '' : 'success'}
      on:click={handleFavorite}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </Button>
  </footer>
</article>

<script>
  import { slide } from "svelte/transition";
</script>

<style>
  span {
    display: inline-block;
    margin: 0 0.25rem;
    border-radius: 3px;
    border: 1px solid #cf0056;
    background: #cf0056;
    color: white;
    padding: 0 0.5rem;
    font-family: "Lanto", sans-serif;
    font-size: small;
  }
</style>

<span transition:slide={{ duration: 200 }}>
  <slot />
</span>

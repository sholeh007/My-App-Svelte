<script>
  export let controlType = "";
  export let id;
  export let type = "text";
  export let label;
  export let value;
  export let rows = "";
  export let valid = true;
  export let errorMessage = "";

  let touched = false;
</script>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem;
    width: 100%;
    margin: 0.25rem 0;
  }

  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <!-- bisa gunakan forward bind:value kalau type input tidak ada atau dinamic -->
    <textarea
      class:invalid={!valid && touched}
      {rows}
      {id}
      bind:value
      on:blur={() => (touched = !touched)} />
  {:else}
    <input
      class:invalid={!valid && touched}
      {type}
      {id}
      {value}
      on:input
      on:blur={() => (touched = !touched)} />
  {/if}
  {#if errorMessage && !valid && touched}
    <small class="error-message">{errorMessage}</small>
  {/if}
</div>

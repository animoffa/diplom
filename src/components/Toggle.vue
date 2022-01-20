<template>
    <div>
    <label class='Toggle' for='toggle'>
      <input type='checkbox' name='toggle' id='toggle' class="Toggle__input" checked v-model="toggleValue"/>
      <span class="Toggle__display" hidden>
        
      </span>
      <p class="Toggle__text">{{text}}</p>
    </label>
    </div>
</template>
<script>
// Array.from(document.querySelectorAll("button.Toggle")).forEach((button) => {
//   button.addEventListener("click", () => {
//     if (button.getAttribute("aria-pressed") === "true") {
//       button.removeAttribute("aria-pressed");
//       console.log('false');
//       this.$emit('toggle', false);
//     } else {
//       button.setAttribute("aria-pressed", "true");
//       console.log('true');
//       this.$emit('toggle', true);
//     }
//   });
// });

export default {
    data() {
        return {
            toggleValue: 'false'
        }
    },
    props: {
        text: {
            type: String,
            default: 'Выберите'
        }
    },
    watch: {
        toggleValue() {
            this.$emit('toggle', this.toggleValue);
        }
    }
}

</script>

<style scoped>
.Toggle {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  margin-bottom: 1em;
  cursor: pointer;
  gap: 1ch;
}

.Toggle__text {
    margin: 1rem;
    text-align: left;
    font-size: 1.7rem;
}

button.Toggle {
  border: 0;
  padding: 0;
  background-color: transparent;
  font: inherit;
}

.Toggle__input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
}

.Toggle__display {
  --offset: 0.2rem;
  --diameter: 2.5rem;

  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: content-box;
  width: calc(var(--diameter) * 2 + var(--offset) * 2);
  height: calc(var(--diameter) + var(--offset) * 2);
  border: 0.1em solid rgb(0 0 0 / 0.2);
  position: relative;
  border-radius: 100vw;
  background-color: #4772513b;
  transition: 250ms;
}

.Toggle__display::before {
  content: "";
  z-index: 2;
  position: absolute;
  top: 50%;
  left: var(--offset);
  box-sizing: border-box;
  width: var(--diameter);
  height: var(--diameter);
  border: 0.1em solid rgb(0 0 0 / 0.2);
  border-radius: 50%;
  background-color: white;
  transform: translate(0, -50%);
  will-change: transform;
  transition: inherit;
}


.Toggle:focus .Toggle__display,
.Toggle__input:focus + .Toggle__display {
  outline: 1px dotted #212121;
  outline: 1px auto -webkit-focus-ring-color;
  outline-offset: 2px;
}

.Toggle:focus,
.Toggle:focus:not(:focus-visible) .Toggle__display,
.Toggle__input:focus:not(:focus-visible) + .Toggle__display {
  outline: 0;
}

.Toggle[aria-pressed="true"] .Toggle__display,
.Toggle__input:checked + .Toggle__display {
  background-color: #ffffff;
}

.Toggle[aria-pressed="true"] .Toggle__display::before,
.Toggle__input:checked + .Toggle__display::before {
  transform: translate(100%, -50%);
}

.Toggle[disabled] .Toggle__display,
.Toggle__input:disabled + .Toggle__display {
  opacity: 0.6;
  filter: grayscale(40%);
  cursor: not-allowed;
}

[dir="rtl"] .Toggle__display::before {
  left: auto;
  right: var(--offset);
}

[dir="rtl"] .Toggle[aria-pressed="true"] + .Toggle__display::before,
[dir="rtl"] .Toggle__input:checked + .Toggle__display::before {
  transform: translate(-100%, -50%);
}

.Toggle__icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  fill: currentcolor;
  vertical-align: middle;
  overflow: hidden;
}

.Toggle__icon--cross {
  color: #e74c3c;
  font-size: 85%;
}

.Toggle__icon--checkmark {
  color: #1fb978;
}

*,
::before,
::after {
  box-sizing: border-box;
}

html {
  display: flex;
  flex-direction: column;
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
}

.container {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.content {
  max-width: 450px;
  padding: 2em;
  margin: auto;
  border: 1px solid rgb(0 0 0 / 0.2);
  border-radius: 0.25em;
}

.footer {
  padding: 2em;
  background-color: #eee;
}

.footer > p {
  margin: 0;
}

</style>